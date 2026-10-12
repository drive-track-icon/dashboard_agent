const assert = require('assert');

// Mock browser environment
const localStorageMock = {};
global.localStorage = {
  getItem: (k) => localStorageMock[k] || null,
  setItem: (k, v) => { localStorageMock[k] = String(v); },
  removeItem: (k) => { delete localStorageMock[k]; }
};

global.window = {
  localStorage: global.localStorage,
  DRIVE_FIREBASE_CONFIG: {
    apiKey: "test-api-key",
    projectId: "test-project-id"
  }
};

global.document = {
  addEventListener: () => {},
  getElementById: () => null
};

// Load firebase-sync.js
require('../js/firebase-sync.js');
const fs = global.window.FirebaseSync;

// Track notifications
const notified = {};
fs.notifyDataChanged = (key, data) => {
  notified[key] = data;
};
fs.isConnected = true;

// Mock state manager
const mockState = {
  currentUser: { id: 'usr_admin_1', username: 'admin', role: 'admin' },
  currentPage: 'overview',
  saveUsers(d) { localStorage.setItem('vortex_users', JSON.stringify(d)); },
  saveItems(d) { localStorage.setItem('vortex_items', JSON.stringify(d)); },
  saveLogs(d) { localStorage.setItem('vortex_logs', JSON.stringify(d)); },
  saveTimers(d) { localStorage.setItem('vortex_timers', JSON.stringify(d)); },
  saveStopwatches(d) { localStorage.setItem('vortex_stopwatches', JSON.stringify(d)); },
  savePaLogs(d) { localStorage.setItem('vortex_pa_logs', JSON.stringify(d)); },
  saveCaLogs(d) { localStorage.setItem('vortex_ca_logs', JSON.stringify(d)); },
  saveTikets(d) { localStorage.setItem('vortex_tikets', JSON.stringify(d)); },
  saveAhtLogs(d) { localStorage.setItem('vortex_aht_logs', JSON.stringify(d)); },
  saveArtLogs(d) { localStorage.setItem('vortex_art_logs', JSON.stringify(d)); },
  saveFindings(d) { localStorage.setItem('vortex_findings', JSON.stringify(d)); },
  saveQuizQuestions(d) { localStorage.setItem('vortex_quiz_questions', JSON.stringify(d)); },
  saveQuizHistory(d) { localStorage.setItem('vortex_quiz_history', JSON.stringify(d)); },
  saveCaGSheetConfig(d) { localStorage.setItem('vortex_ca_gsheet_config', JSON.stringify(d)); },
  saveTiketGSheetConfig(d) { localStorage.setItem('vortex_tiket_gsheet_config', JSON.stringify(d)); },
  saveAhtGSheetConfig(d) { localStorage.setItem('vortex_aht_gsheet_config', JSON.stringify(d)); },
  saveArtGSheetConfig(d) { localStorage.setItem('vortex_art_gsheet_config', JSON.stringify(d)); },
  saveFindingGSheetConfig(d) { localStorage.setItem('vortex_finding_gsheet_config', JSON.stringify(d)); },
  resetAllData() {
    localStorage.setItem('vortex_users', '[]');
  }
};

global.window.state = mockState;
fs.attachSaveHooks(mockState);

// Test 1: Test all CRUD operations trigger notifyDataChanged
console.log('Testing all CRUD save methods...');
mockState.saveUsers([{ id: 'u1', username: 'budi' }]);
assert.deepStrictEqual(notified['vortex_users'], [{ id: 'u1', username: 'budi' }]);

mockState.saveItems([{ id: 'item1', name: 'Server' }]);
assert.deepStrictEqual(notified['vortex_items'], [{ id: 'item1', name: 'Server' }]);

mockState.savePaLogs([{ id: 'pa1', hours: 8 }]);
assert.deepStrictEqual(notified['vortex_pa_logs'], [{ id: 'pa1', hours: 8 }]);

mockState.saveCaLogs([{ id: 'ca1', score: 95.5 }]);
assert.deepStrictEqual(notified['vortex_ca_logs'], [{ id: 'ca1', score: 95.5 }]);

mockState.saveTikets([{ id: 't1', ticketCount: 60 }]);
assert.deepStrictEqual(notified['vortex_tikets'], [{ id: 't1', ticketCount: 60 }]);

mockState.saveAhtLogs([{ id: 'aht1', ahtSec: 180 }]);
assert.deepStrictEqual(notified['vortex_aht_logs'], [{ id: 'aht1', ahtSec: 180 }]);

mockState.saveArtLogs([{ id: 'art1', artSec: 45 }]);
assert.deepStrictEqual(notified['vortex_art_logs'], [{ id: 'art1', artSec: 45 }]);

mockState.saveFindings([{ id: 'f1', title: 'Finding' }]);
assert.deepStrictEqual(notified['vortex_findings'], [{ id: 'f1', title: 'Finding' }]);

mockState.saveTimers([{ id: 'tm1', remaining: 300 }]);
assert.deepStrictEqual(notified['vortex_timers'], [{ id: 'tm1', remaining: 300 }]);

mockState.saveStopwatches([{ id: 'sw1', elapsed: 50 }]);
assert.deepStrictEqual(notified['vortex_stopwatches'], [{ id: 'sw1', elapsed: 50 }]);

mockState.saveQuizQuestions([{ id: 'q1', prompt: 'Question?' }]);
assert.deepStrictEqual(notified['vortex_quiz_questions'], [{ id: 'q1', prompt: 'Question?' }]);

mockState.saveQuizHistory([{ id: 'qh1', score: 100 }]);
assert.deepStrictEqual(notified['vortex_quiz_history'], [{ id: 'qh1', score: 100 }]);

// Test 2: Test direct localStorage.setItem interception for typing results
console.log('Testing direct localStorage interception (Typing test)...');
localStorage.setItem('drive_typing_team_results', JSON.stringify([{ user: 'Dewi', wpm: 85 }]));
assert.deepStrictEqual(notified['drive_typing_team_results'], [{ user: 'Dewi', wpm: 85 }]);

// Test 3: Test deletion handling (e.g., removing item from array and saving)
console.log('Testing deletion sync...');
mockState.saveItems([]);
assert.deepStrictEqual(notified['vortex_items'], []);

// Test 4: Test reRenderCurrentView
console.log('Testing reRenderCurrentView without DOM errors...');
let navigatedPage = null;
global.window.navigateToPage = (p) => { navigatedPage = p; };
fs.reRenderCurrentView('vortex_items');
assert.strictEqual(navigatedPage, 'overview');

console.log('✅ ALL ADVANCED FIREBASE INTEGRATION TESTS PASSED SUCCESSFULLY!');
