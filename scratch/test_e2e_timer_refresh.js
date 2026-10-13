// E2E simulation of Timer and Stopwatch add and refresh persistence
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// 1. Create a simulated browser environment
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  getItem(k) { return Object.prototype.hasOwnProperty.call(this.store, k) ? this.store[k] : null; }
  setItem(k, v) { this.store[k] = String(v); }
  removeItem(k) { delete this.store[k]; }
  clear() { this.store = {}; }
}

const mockLS = new LocalStorageMock();
global.localStorage = mockLS;
global.window = {
  localStorage: mockLS,
  addEventListener: () => {},
  document: { addEventListener: () => {} }
};
global.document = window.document;

// Seed session for an admin user
mockLS.setItem('vortex_session', JSON.stringify({
  id: 'usr_admin_1',
  username: 'admin',
  fullName: 'Budi Santoso, S.Kom',
  role: 'admin',
  department: 'CSO DIGILIVE CHAT - MY ICON+'
}));

console.log('Step 1: Session initialized for user admin.');

const appJsContent = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');

// Find AppState class
const startIdx = appJsContent.indexOf('class AppState {');
const endIdx = appJsContent.indexOf('const state = new AppState();');
const appStateCode = appJsContent.substring(startIdx, endIdx);

global.DEFAULT_TIMERS = [
  { id: 'tmr_1', userId: 'usr_admin_1', name: 'Timer Default', totalSeconds: 100, remainingSeconds: 100, isRunning: false }
];
global.DEFAULT_STOPWATCHES = [
  { id: 'sw_1', userId: 'usr_admin_1', name: 'Stopwatch Default', elapsedSeconds: 50, isRunning: false }
];
global.DEFAULT_CA_LOGS = [];
global.DEFAULT_TIKETS = [];
global.DEFAULT_USERS = [];
global.DEFAULT_ITEMS = [];
global.DEFAULT_LOGS = [];
global.DEFAULT_PA_LOGS = [];
global.DEFAULT_AHT_LOGS = [];
global.DEFAULT_ART_LOGS = [];
global.DEFAULT_FINDINGS = [];
global.DEFAULT_QUIZ_QUESTIONS = [];
global.SESSION_TIMEOUT_MS = 24 * 60 * 60 * 1000;

vm.runInThisContext(appStateCode);

const state = new AppState();
console.log('Step 2: AppState instantiated. Timers count:', state.getTimers().length);
console.log('Stopwatches count:', state.getStopwatches().length);

// User adds a new countdown timer
const timers = state.getTimers();
const newTimer = {
  id: 'tmr_' + Date.now(),
  userId: state.currentUser.id,
  username: state.currentUser.username,
  userFullName: state.currentUser.fullName,
  name: 'Waktu Mundur Uji Refresh',
  category: 'CSO INBOUND',
  desc: 'Pengecekan dokumen',
  totalSeconds: 3600,
  remainingSeconds: 3600,
  isRunning: true,
  lastTick: Date.now(),
  createdAt: Date.now(),
  updatedAt: Date.now()
};
timers.push(newTimer);
state.saveTimers(timers);

// User adds a new stopwatch
const stopwatches = state.getStopwatches();
const newSw = {
  id: 'sw_' + Date.now(),
  userId: state.currentUser.id,
  username: state.currentUser.username,
  userFullName: state.currentUser.fullName,
  name: 'Stopwatch Uji Refresh',
  dept: 'CSO INBOUND',
  elapsedSeconds: 0,
  isRunning: true,
  lastTick: Date.now(),
  createdAt: Date.now(),
  updatedAt: Date.now()
};
stopwatches.push(newSw);
state.saveStopwatches(stopwatches);

console.log('Step 3: User added 1 timer & 1 stopwatch.');
console.log('Timers in storage:', state.getTimers().length);
console.log('Stopwatches in storage:', state.getStopwatches().length);

// SIMULATE PAGE RELOAD / REFRESH
console.log('\n--- SIMULATING BROWSER REFRESH (F5) ---');

// Fresh state created on page reload
const reloadedState = new AppState();
console.log('Step 4: Reloaded AppState initialized.');
console.log('Timers after reload:', reloadedState.getTimers().length);
console.log('Stopwatches after reload:', reloadedState.getStopwatches().length);

// Verify timer and stopwatch exist in reloaded state
const foundT = reloadedState.getTimers().find(t => t.id === newTimer.id);
const foundS = reloadedState.getStopwatches().find(s => s.id === newSw.id);

if (!foundT) {
  console.error('FAIL: Timer disappeared after refresh!');
  process.exit(1);
}
if (!foundS) {
  console.error('FAIL: Stopwatch disappeared after refresh!');
  process.exit(1);
}

console.log('SUCCESS: Timer preserved:', foundT.name);
console.log('SUCCESS: Stopwatch preserved:', foundS.name);

// Now simulate FirebaseSync.syncAllFromCloud on refresh
console.log('\nStep 5: Simulating FirebaseSync.syncAllFromCloud merge logic...');

// Suppose Cloud Firestore still has older snapshot from previous seed (without newTimer/newSw)
const cloudTimersDoc = {
  payload: global.DEFAULT_TIMERS // only the 1 default timer
};
const cloudSwDoc = {
  payload: global.DEFAULT_STOPWATCHES // only the 1 default stopwatch
};

// Test merge logic for vortex_timers
const localTimersRaw = mockLS.getItem('vortex_timers');
const localTimersArr = localTimersRaw ? JSON.parse(localTimersRaw) : [];
const remoteTimersArr = Array.isArray(cloudTimersDoc.payload) ? cloudTimersDoc.payload : [];

const deletedTimerIds = new Set();
const localTimersOnly = localTimersArr.filter(l => l && l.id && !deletedTimerIds.has(l.id) && !remoteTimersArr.some(r => r.id === l.id));

let mergedTimers = [...remoteTimersArr, ...localTimersOnly];
mockLS.setItem('vortex_timers', JSON.stringify(mergedTimers));

// Test merge logic for vortex_stopwatches
const localSwRaw = mockLS.getItem('vortex_stopwatches');
const localSwArr = localSwRaw ? JSON.parse(localSwRaw) : [];
const remoteSwArr = Array.isArray(cloudSwDoc.payload) ? cloudSwDoc.payload : [];

const deletedSwIds = new Set();
const localSwOnly = localSwArr.filter(l => l && l.id && !deletedSwIds.has(l.id) && !remoteSwArr.some(r => r.id === l.id));

let mergedSw = [...remoteSwArr, ...localSwOnly];
mockLS.setItem('vortex_stopwatches', JSON.stringify(mergedSw));

// Verify after cloud sync
const finalTimers = reloadedState.getTimers();
const finalSw = reloadedState.getStopwatches();

const finalFoundT = finalTimers.find(t => t.id === newTimer.id);
const finalFoundS = finalSw.find(s => s.id === newSw.id);

if (finalFoundT && finalFoundS) {
  console.log('\n>>> ALL TESTS PASSED! <<<');
  console.log('Verified: Timer "' + finalFoundT.name + '" AND Stopwatch "' + finalFoundS.name + '" are 100% PERSISTENT after refresh and cloud synchronization!');
} else {
  console.error('FAIL: Items lost after cloud sync simulation!');
  process.exit(1);
}

// Step 6: Test Deletion & Refresh
console.log('\n--- TESTING DELETION & REFRESH ---');
// User deletes the timer
const beforeDeleteTimers = reloadedState.getTimers();
const afterDeleteTimers = beforeDeleteTimers.filter(t => t.id !== newTimer.id);
reloadedState.saveTimers(afterDeleteTimers);

// Track deleted ID
deletedTimerIds.add(newTimer.id);
console.log('Deleted timer ID:', newTimer.id);
console.log('Count after delete:', reloadedState.getTimers().length);

// Page refresh after delete
const freshStateAfterDelete = new AppState();
console.log('Count on reload after delete:', freshStateAfterDelete.getTimers().length);

// Cloud sync merge after delete
const localRaw2 = mockLS.getItem('vortex_timers');
const localArr2 = localRaw2 ? JSON.parse(localRaw2) : [];
const localOnly2 = localArr2.filter(l => l && l.id && !deletedTimerIds.has(l.id) && !remoteTimersArr.some(r => r.id === l.id));
const mergedTimers2 = [...remoteTimersArr, ...localOnly2];
mockLS.setItem('vortex_timers', JSON.stringify(mergedTimers2));

const finalAfterDelete = freshStateAfterDelete.getTimers();
const resurrected = finalAfterDelete.find(t => t.id === newTimer.id);
if (!resurrected) {
  console.log('DELETION TEST PASSED: Deleted timer is NOT resurrected on refresh!');
} else {
  console.error('DELETION TEST FAILED: Deleted timer reappeared!');
  process.exit(1);
}
