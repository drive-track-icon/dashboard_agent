const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== TEST SUITE: Cascading User Deletion Across All Menus ===');

// 1. Static check in js/app.js
const jsContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'app.js'), 'utf8');
assert(jsContent.includes("type === 'user'"), "executePendingDelete must handle type === 'user'");
assert(jsContent.includes('state.savePaLogs'), 'must clear PA logs for deleted user');
assert(jsContent.includes('state.saveCaLogs'), 'must clear CA logs for deleted user');
assert(jsContent.includes('state.saveTikets'), 'must clear Tiket logs for deleted user');
assert(jsContent.includes('state.saveAhtLogs'), 'must clear AHT logs for deleted user');
assert(jsContent.includes('state.saveArtLogs'), 'must clear ART logs for deleted user');
assert(jsContent.includes('state.saveFindings'), 'must clear Finding logs for deleted user');
assert(jsContent.includes('state.saveTimers'), 'must clear Timers for deleted user');
assert(jsContent.includes('state.saveStopwatches'), 'must clear Stopwatches for deleted user');
assert(jsContent.includes('state.saveQuizHistory'), 'must clear Quiz history for deleted user');
assert(jsContent.includes('drive_typing_team_results'), 'must clear Typing runs for deleted user');
console.log('✓ Code contains cascading deletion logic across all modules');

// 2. Setup mock environment
const storage = {};
global.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; }
};

const mockElements = {};
function createMockElement(id) {
  return {
    id,
    classList: {
      add: () => {},
      remove: () => {},
      contains: () => false
    },
    textContent: '',
    innerHTML: ''
  };
}

global.document = {
  getElementById(id) {
    if (!mockElements[id]) mockElements[id] = createMockElement(id);
    return mockElements[id];
  }
};
global.window = global;

let lastToast = null;
global.showToast = (title, msg, type) => {
  lastToast = { title, msg, type };
};

// Seed 2 users: target 'usr_victim' and preserved 'usr_keeper'
const users = [
  { id: 'usr_admin', username: 'admin', fullName: 'Budi Santoso', role: 'admin' },
  { id: 'usr_victim', username: 'victim_user', fullName: 'Victim User', role: 'user' },
  { id: 'usr_keeper', username: 'keeper_user', fullName: 'Keeper User', role: 'user' }
];

const paLogs = [
  { id: 'pa_1', userId: 'usr_victim', username: 'victim_user', userFullName: 'Victim User', date: '2026-09-01' },
  { id: 'pa_2', userId: 'usr_keeper', username: 'keeper_user', userFullName: 'Keeper User', date: '2026-09-01' }
];

const caLogs = [
  { id: 'ca_1', userId: 'usr_victim', username: 'victim_user', userFullName: 'Victim User', score: 90 },
  { id: 'ca_2', userId: 'usr_keeper', username: 'keeper_user', userFullName: 'Keeper User', score: 95 }
];

const tikets = [
  { id: 'tk_1', userId: 'usr_victim', username: 'victim_user', userFullName: 'Victim User', ticketCount: 100 },
  { id: 'tk_2', userId: 'usr_keeper', username: 'keeper_user', userFullName: 'Keeper User', ticketCount: 200 }
];

const ahtLogs = [
  { id: 'aht_1', userId: 'usr_victim', username: 'victim_user', userFullName: 'Victim User', ahtSeconds: 250 },
  { id: 'aht_2', userId: 'usr_keeper', username: 'keeper_user', userFullName: 'Keeper User', ahtSeconds: 220 }
];

const artLogs = [
  { id: 'art_1', userId: 'usr_victim', username: 'victim_user', userFullName: 'Victim User', avgResponseSeconds: 15 },
  { id: 'art_2', userId: 'usr_keeper', username: 'keeper_user', userFullName: 'Keeper User', avgResponseSeconds: 20 }
];

const findings = [
  { id: 'fnd_1', userId: 'usr_victim', userFullName: 'Victim User', desc: 'Case 1' },
  { id: 'fnd_2', userId: 'usr_keeper', userFullName: 'Keeper User', desc: 'Case 2' }
];

const timers = [
  { id: 'tm_1', userId: 'usr_victim', userFullName: 'Victim User', name: 'Timer 1' },
  { id: 'tm_2', userId: 'usr_keeper', userFullName: 'Keeper User', name: 'Timer 2' }
];

const stopwatches = [
  { id: 'sw_1', userId: 'usr_victim', userFullName: 'Victim User', name: 'SW 1' },
  { id: 'sw_2', userId: 'usr_keeper', userFullName: 'Keeper User', name: 'SW 2' }
];

const quizHistory = [
  { id: 'qz_1', userId: 'usr_victim', userFullName: 'Victim User', score: 80 },
  { id: 'qz_2', userId: 'usr_keeper', userFullName: 'Keeper User', score: 100 }
];

const typingRuns = [
  { id: 'typ_1', userId: 'usr_victim', username: 'victim_user', wpm: 55 },
  { id: 'typ_2', userId: 'usr_keeper', username: 'keeper_user', wpm: 75 }
];

storage['vortex_users'] = JSON.stringify(users);
storage['vortex_pa_logs'] = JSON.stringify(paLogs);
storage['vortex_ca_logs'] = JSON.stringify(caLogs);
storage['vortex_tikets'] = JSON.stringify(tikets);
storage['vortex_aht_logs'] = JSON.stringify(ahtLogs);
storage['vortex_art_logs'] = JSON.stringify(artLogs);
storage['vortex_findings'] = JSON.stringify(findings);
storage['vortex_timers'] = JSON.stringify(timers);
storage['vortex_stopwatches'] = JSON.stringify(stopwatches);
storage['vortex_quiz_history'] = JSON.stringify(quizHistory);
storage['drive_typing_team_results'] = JSON.stringify(typingRuns);
storage['drive_theme_color_victim_user'] = 'emerald';
storage['drive_display_mode_victim_user'] = 'light';
storage['drive_user_controls_victim_user'] = '{"some":"pref"}';

let auditLogs = [];
const state = {
  currentUser: users[0], // logged in as Admin
  isAdmin() { return this.currentUser && this.currentUser.role === 'admin'; },
  getUsers() { return JSON.parse(storage['vortex_users'] || '[]'); },
  saveUsers(l) { storage['vortex_users'] = JSON.stringify(l); },
  getPaLogs() { return JSON.parse(storage['vortex_pa_logs'] || '[]'); },
  savePaLogs(l) { storage['vortex_pa_logs'] = JSON.stringify(l); },
  getCaLogs() { return JSON.parse(storage['vortex_ca_logs'] || '[]'); },
  saveCaLogs(l) { storage['vortex_ca_logs'] = JSON.stringify(l); },
  getTikets() { return JSON.parse(storage['vortex_tikets'] || '[]'); },
  saveTikets(l) { storage['vortex_tikets'] = JSON.stringify(l); },
  getAhtLogs() { return JSON.parse(storage['vortex_aht_logs'] || '[]'); },
  saveAhtLogs(l) { storage['vortex_aht_logs'] = JSON.stringify(l); },
  getArtLogs() { return JSON.parse(storage['vortex_art_logs'] || '[]'); },
  saveArtLogs(l) { storage['vortex_art_logs'] = JSON.stringify(l); },
  getFindings() { return JSON.parse(storage['vortex_findings'] || '[]'); },
  saveFindings(l) { storage['vortex_findings'] = JSON.stringify(l); },
  getTimers() { return JSON.parse(storage['vortex_timers'] || '[]'); },
  saveTimers(l) { storage['vortex_timers'] = JSON.stringify(l); },
  getStopwatches() { return JSON.parse(storage['vortex_stopwatches'] || '[]'); },
  saveStopwatches(l) { storage['vortex_stopwatches'] = JSON.stringify(l); },
  getQuizHistory() { return JSON.parse(storage['vortex_quiz_history'] || '[]'); },
  saveQuizHistory(l) { storage['vortex_quiz_history'] = JSON.stringify(l); },
  addLog(action, title, details) {
    auditLogs.push({ action, title, details });
  },
  selectedCaIds: new Set(['ca_1', 'ca_2']),
  selectedTiketIds: new Set(['tk_1']),
  selectedAhtIds: new Set(),
  selectedArtIds: new Set(),
  selectedFindingIds: new Set(['fnd_1']),
  pendingDelete: null,
  currentPage: 'user-management'
};
global.state = state;

global.UI = {
  confirmDeleteTitle: document.getElementById('confirmDeleteTitle'),
  confirmDeleteMessage: document.getElementById('confirmDeleteMessage'),
  modalConfirmDelete: document.getElementById('modalConfirmDelete')
};

global.renderUserManagementPage = () => {};
global.updateDynamicMonthDropdowns = () => {};
global.renderOverviewPage = () => {};

// Load promptDeleteUser and executePendingDelete
eval(jsContent.slice(jsContent.indexOf('function executePendingDelete() {'), jsContent.indexOf('// ==========================================\n// 10. MANAJEMEN USER')));
eval(jsContent.slice(jsContent.indexOf('window.promptDeleteUser = function(id, name) {'), jsContent.indexOf('// ==========================================\n// CHANGE PASSWORD MODAL')));

// 3. Test self-deletion prevention
window.promptDeleteUser('usr_admin', 'Budi Santoso');
assert(lastToast && lastToast.title === 'Aksi Ditolak', 'Admin self deletion must be blocked');
assert(!state.pendingDelete, 'pendingDelete must remain null when trying to delete self');
console.log('✓ Admin self-deletion prevention verified');

// 4. Test promptDeleteUser for victim_user
window.promptDeleteUser('usr_victim', 'Victim User');
assert(state.pendingDelete && state.pendingDelete.type === 'user', 'pendingDelete type must be user');
assert.strictEqual(state.pendingDelete.id, 'usr_victim');
console.log('✓ promptDeleteUser prepares pendingDelete correctly');

// 5. Execute cascading deletion
executePendingDelete();

// 6. Assertions across all data stores
const resUsers = state.getUsers();
assert.strictEqual(resUsers.length, 2, 'Only 2 users should remain');
assert(!resUsers.find(u => u.id === 'usr_victim'), 'usr_victim must be removed from users');
assert(resUsers.find(u => u.id === 'usr_keeper'), 'usr_keeper must be retained');
console.log('✓ Users table: victim removed, keeper retained');

const resPa = state.getPaLogs();
assert.strictEqual(resPa.length, 1, 'Only 1 PA log should remain');
assert.strictEqual(resPa[0].userId, 'usr_keeper');
console.log('✓ PA logs: victim deleted, keeper retained');

const resCa = state.getCaLogs();
assert.strictEqual(resCa.length, 1, 'Only 1 CA log should remain');
assert.strictEqual(resCa[0].userId, 'usr_keeper');
assert(!state.selectedCaIds.has('ca_1'), 'ca_1 should be removed from selectedCaIds');
assert(state.selectedCaIds.has('ca_2'), 'ca_2 retained in selectedCaIds');
console.log('✓ CA logs & selection: victim deleted, keeper retained');

const resTikets = state.getTikets();
assert.strictEqual(resTikets.length, 1, 'Only 1 Tiket log should remain');
assert.strictEqual(resTikets[0].userId, 'usr_keeper');
assert(!state.selectedTiketIds.has('tk_1'), 'tk_1 removed from selectedTiketIds');
console.log('✓ Tiket logs: victim deleted, keeper retained');

const resAht = state.getAhtLogs();
assert.strictEqual(resAht.length, 1, 'Only 1 AHT log should remain');
assert.strictEqual(resAht[0].userId, 'usr_keeper');
console.log('✓ AHT logs: victim deleted, keeper retained');

const resArt = state.getArtLogs();
assert.strictEqual(resArt.length, 1, 'Only 1 ART log should remain');
assert.strictEqual(resArt[0].userId, 'usr_keeper');
console.log('✓ ART logs: victim deleted, keeper retained');

const resFindings = state.getFindings();
assert.strictEqual(resFindings.length, 1, 'Only 1 Finding log should remain');
assert.strictEqual(resFindings[0].userId, 'usr_keeper');
assert(!state.selectedFindingIds.has('fnd_1'), 'fnd_1 removed from selectedFindingIds');
console.log('✓ Finding logs: victim deleted, keeper retained');

const resTimers = state.getTimers();
assert.strictEqual(resTimers.length, 1, 'Only 1 Timer should remain');
assert.strictEqual(resTimers[0].userId, 'usr_keeper');
console.log('✓ Timers: victim deleted, keeper retained');

const resStopwatches = state.getStopwatches();
assert.strictEqual(resStopwatches.length, 1, 'Only 1 Stopwatch should remain');
assert.strictEqual(resStopwatches[0].userId, 'usr_keeper');
console.log('✓ Stopwatches: victim deleted, keeper retained');

const resQuiz = state.getQuizHistory();
assert.strictEqual(resQuiz.length, 1, 'Only 1 Quiz entry should remain');
assert.strictEqual(resQuiz[0].userId, 'usr_keeper');
console.log('✓ Quiz history: victim deleted, keeper retained');

const resTyping = JSON.parse(storage['drive_typing_team_results'] || '[]');
assert.strictEqual(resTyping.length, 1, 'Only 1 Typing entry should remain');
assert.strictEqual(resTyping[0].userId, 'usr_keeper');
console.log('✓ Typing test results: victim deleted, keeper retained');

// Preferences in storage
assert.strictEqual(storage['drive_theme_color_victim_user'], undefined, 'Theme pref removed');
assert.strictEqual(storage['drive_display_mode_victim_user'], undefined, 'Display mode pref removed');
assert.strictEqual(storage['drive_user_controls_victim_user'], undefined, 'User controls pref removed');
console.log('✓ Preferences: victim storage keys removed');

// Audit log
assert(auditLogs.some(l => l.action === 'DELETE_USER'), 'DELETE_USER audit log recorded');
assert(lastToast && lastToast.title === 'Pengguna & Data Dihapus', 'Success toast shown');
console.log('✓ Audit log & feedback toast verified');

console.log('=== ALL CASCADING USER DELETION TESTS PASSED 100%! ===');
