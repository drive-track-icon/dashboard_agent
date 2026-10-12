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
  getElementById: () => null,
  querySelectorAll: () => []
};

// Load firebase-sync.js
require('../js/firebase-sync.js');
const fs = global.window.FirebaseSync;

// Setup mock state
let navigateCallCount = 0;
let leaderboardUpdated = false;
let raceResetCount = 0;

global.window.state = {
  currentUser: { id: 'usr_admin_1', username: 'admin' },
  currentPage: 'typing-test'
};

global.window.navigateToPage = (page, save) => {
  navigateCallCount++;
};

global.window.renderAdminTypingLeaderboard = () => {
  leaderboardUpdated = true;
};

global.window.typingState = {
  status: 'running',
  words: ['mobil', 'balap', 'kecepatan'],
  currentWordIndex: 1
};

// Test 1: Background timer / tickets sync while user is on typing-test
console.log('Testing Typing Test immunity against unrelated cloud updates...');
fs.onRemoteDataUpdated('vortex_timers', [{ id: 'tm1' }]);
fs.onRemoteDataUpdated('vortex_tikets', [{ id: 'tk1' }]);
fs.onRemoteDataUpdated('vortex_ca_logs', [{ id: 'ca1' }]);
fs.onRemoteDataUpdated('vortex_items', [{ id: 'it1' }]);

assert.strictEqual(navigateCallCount, 0, 'navigateToPage MUST NOT be called when unrelated keys sync');
assert.strictEqual(global.window.typingState.status, 'running', 'Race status must remain running');
assert.strictEqual(global.window.typingState.currentWordIndex, 1, 'Current word index must not be reset');

// Test 2: When drive_typing_team_results syncs from another device
console.log('Testing drive_typing_team_results updates only leaderboard without race reset...');
leaderboardUpdated = false;
fs.onRemoteDataUpdated('drive_typing_team_results', [{ user: 'dewi', wpm: 90 }]);

assert.strictEqual(leaderboardUpdated, true, 'renderAdminTypingLeaderboard must be updated');
assert.strictEqual(navigateCallCount, 0, 'navigateToPage MUST NOT be called');
assert.strictEqual(global.window.typingState.status, 'running', 'Race must continue smoothly without interruption');

console.log('✅ ALL TYPING TEST STABILITY TESTS PASSED WITH 100% SUCCESS!');
