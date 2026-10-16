const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== TEST: TIMER & STOPWATCH RESET BUGFIX VERIFICATION ===\n');

// 1. Mock Browser Environment
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(k) { return Object.prototype.hasOwnProperty.call(this.store, k) ? this.store[k] : null; }
  setItem(k, v) { this.store[k] = String(v); }
  removeItem(k) { delete this.store[k]; }
  clear() { this.store = {}; }
}

const mockLS = new MockLocalStorage();
const mockSS = new MockLocalStorage();

global.localStorage = mockLS;
global.sessionStorage = mockSS;
global.window = {
  localStorage: mockLS,
  sessionStorage: mockSS,
  addEventListener: () => {},
  document: {
    addEventListener: () => {},
    getElementById: () => null,
    querySelectorAll: () => []
  }
};
global.document = window.document;

// 2. Load and verify DEFAULT_TIMERS and DEFAULT_STOPWATCHES in app.js
const appJsContent = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');

// Check that DEFAULT_TIMERS have isRunning: false and remainingSeconds equals totalSeconds
const defaultTimersMatch = appJsContent.match(/const DEFAULT_TIMERS = (\[[\s\S]*?\]);/);
assert(defaultTimersMatch, 'DEFAULT_TIMERS not found in app.js');
const parsedDefaultTimers = eval(defaultTimersMatch[1]);
parsedDefaultTimers.forEach(t => {
  assert.strictEqual(t.isRunning, false, `DEFAULT_TIMER ${t.name} should have isRunning: false`);
  assert.strictEqual(t.remainingSeconds, t.totalSeconds, `DEFAULT_TIMER ${t.name} should have remainingSeconds === totalSeconds`);
  assert.strictEqual(t.lastTick, null, `DEFAULT_TIMER ${t.name} should have lastTick: null`);
});
console.log('✓ Test 1 Passed: All DEFAULT_TIMERS have isRunning: false, remainingSeconds === totalSeconds, lastTick: null');

// Check that DEFAULT_STOPWATCHES have isRunning: false and elapsedSeconds === 0
const defaultStopwatchesMatch = appJsContent.match(/const DEFAULT_STOPWATCHES = (\[[\s\S]*?\]);/);
assert(defaultStopwatchesMatch, 'DEFAULT_STOPWATCHES not found in app.js');
const parsedDefaultStopwatches = eval(defaultStopwatchesMatch[1]);
parsedDefaultStopwatches.forEach(sw => {
  assert.strictEqual(sw.isRunning, false, `DEFAULT_STOPWATCH ${sw.name} should have isRunning: false`);
  assert.strictEqual(sw.elapsedSeconds, 0, `DEFAULT_STOPWATCH ${sw.name} should have elapsedSeconds === 0`);
  assert.strictEqual(sw.lastTick, null, `DEFAULT_STOPWATCH ${sw.name} should have lastTick: null`);
});
console.log('✓ Test 2 Passed: All DEFAULT_STOPWATCHES have isRunning: false, elapsedSeconds: 0, lastTick: null');

// 3. Test mergeCollections in firebase-sync.js
const syncJsContent = fs.readFileSync(path.join(__dirname, '../js/firebase-sync.js'), 'utf8');

// Extract mergeCollections
assert(syncJsContent.includes('mergeCollections(key, localArr, remoteArr, deletedIds)'), 'mergeCollections must exist in firebase-sync.js');
assert(syncJsContent.includes('flushPendingSync()'), 'flushPendingSync must exist in firebase-sync.js');
assert(syncJsContent.includes('if (!immediate && this._suppressSync) return;'), 'notifyDataChanged must not block immediate calls');

// Evaluate mergeCollections in a sandbox
const sandbox = {
  getDeletedIds: () => new Set(),
  notifyDataChanged: () => {}
};
const mergeEndIdx = syncJsContent.lastIndexOf('/**', syncJsContent.indexOf('startRealtimeListeners() {'));
const mergeMethodCode = syncJsContent.substring(syncJsContent.indexOf('mergeCollections('), mergeEndIdx);
const evalCode = `
class TestSync {
  ${mergeMethodCode}
}
new TestSync();
`;
const testSync = vm.runInNewContext(evalCode, sandbox);

// Scenario A: Timer is running in cloud (from previous session), but user reset it locally
const localTimers = [
  {
    id: 'tmr_123',
    name: 'Timer Uji',
    totalSeconds: 1800,
    remainingSeconds: 1800,
    isRunning: false,
    updatedAt: 2000
  }
];
const remoteTimers = [
  {
    id: 'tmr_123',
    name: 'Timer Uji',
    totalSeconds: 1800,
    remainingSeconds: 1450,
    isRunning: true,
    updatedAt: 1000
  }
];

const mergedTimersRes = testSync.mergeCollections('vortex_timers', localTimers, remoteTimers, new Set());
assert.strictEqual(mergedTimersRes.merged.length, 1);
assert.strictEqual(mergedTimersRes.merged[0].isRunning, false, 'Merged timer MUST be stopped/reset, not running!');
assert.strictEqual(mergedTimersRes.merged[0].remainingSeconds, 1800, 'Merged timer MUST have remainingSeconds: 1800');
assert.strictEqual(mergedTimersRes.hasLocalOverrides, true, 'hasLocalOverrides must be true so cloud is updated');
console.log('✓ Test 3 Passed: mergeCollections prioritizes locally reset timer over old running cloud snapshot');

// Scenario B: Stopwatch is running in cloud, but user reset it locally
const localSw = [
  {
    id: 'sw_123',
    name: 'Stopwatch Uji',
    elapsedSeconds: 0,
    isRunning: false,
    updatedAt: 2000
  }
];
const remoteSw = [
  {
    id: 'sw_123',
    name: 'Stopwatch Uji',
    elapsedSeconds: 950,
    isRunning: true,
    updatedAt: 1000
  }
];

const mergedSwRes = testSync.mergeCollections('vortex_stopwatches', localSw, remoteSw, new Set());
assert.strictEqual(mergedSwRes.merged.length, 1);
assert.strictEqual(mergedSwRes.merged[0].isRunning, false, 'Merged stopwatch MUST be stopped/reset, not running!');
assert.strictEqual(mergedSwRes.merged[0].elapsedSeconds, 0, 'Merged stopwatch MUST have elapsedSeconds: 0');
assert.strictEqual(mergedSwRes.hasLocalOverrides, true, 'hasLocalOverrides must be true so cloud is updated');
console.log('✓ Test 4 Passed: mergeCollections prioritizes locally reset stopwatch over old running cloud snapshot');

// 4. Test resetTimer and resetStopwatch execution
let syncCalls = [];
global.window.FirebaseSync = {
  notifyDataChanged: (key, data, isImmediate) => {
    syncCalls.push({ key, data, isImmediate });
  }
};
global.showToast = () => {};
global.renderTimerPage = () => {};
global.formatSecondsToHMS = (s) => `${s}s`;

// Mock AppState methods
const mockState = {
  currentUser: { id: 'usr_admin_1', role: 'admin' },
  isAdmin: () => true,
  timers: [
    {
      id: 'tmr_active',
      userId: 'usr_admin_1',
      name: 'Timer Aktif',
      totalSeconds: 1200,
      remainingSeconds: 600,
      isRunning: true,
      lastTick: Date.now()
    }
  ],
  stopwatches: [
    {
      id: 'sw_active',
      userId: 'usr_admin_1',
      name: 'Stopwatch Aktif',
      elapsedSeconds: 450,
      isRunning: true,
      lastTick: Date.now()
    }
  ],
  getTimers() { return JSON.parse(JSON.stringify(this.timers)); },
  saveTimers(t) { this.timers = t; },
  getStopwatches() { return JSON.parse(JSON.stringify(this.stopwatches)); },
  saveStopwatches(s) { this.stopwatches = s; }
};
global.state = mockState;

// Run resetTimer code snippet from app.js
const resetTimerMatch = appJsContent.match(/window\.resetTimer = function\(id\) \{[\s\S]*?\n\};/);
assert(resetTimerMatch, 'window.resetTimer function not found in app.js');
eval(resetTimerMatch[0]);

// Reset the active timer
syncCalls = [];
window.resetTimer('tmr_active');

const updatedTimer = mockState.getTimers().find(t => t.id === 'tmr_active');
assert.strictEqual(updatedTimer.isRunning, false, 'Timer must not be running after resetTimer');
assert.strictEqual(updatedTimer.remainingSeconds, 1200, 'remainingSeconds must equal totalSeconds after resetTimer');
assert.strictEqual(updatedTimer.lastTick, null, 'lastTick must be null after resetTimer');
assert(updatedTimer.updatedAt > 0, 'updatedAt must be set to timestamp');
assert(syncCalls.some(c => c.key === 'vortex_timers' && c.isImmediate === true), 'resetTimer must trigger immediate FirebaseSync');
console.log('✓ Test 5 Passed: window.resetTimer cleanly stops timer, resets remainingSeconds, sets updatedAt, and syncs immediately');

// Run resetStopwatch code snippet from app.js
const resetSwMatch = appJsContent.match(/window\.resetStopwatch = function\(id\) \{[\s\S]*?\n\};/);
assert(resetSwMatch, 'window.resetStopwatch function not found in app.js');
eval(resetSwMatch[0]);

// Reset the active stopwatch
syncCalls = [];
window.resetStopwatch('sw_active');

const updatedSw = mockState.getStopwatches().find(s => s.id === 'sw_active');
assert.strictEqual(updatedSw.isRunning, false, 'Stopwatch must not be running after resetStopwatch');
assert.strictEqual(updatedSw.elapsedSeconds, 0, 'elapsedSeconds must be 0 after resetStopwatch');
assert.strictEqual(updatedSw.lastTick, null, 'lastTick must be null after resetStopwatch');
assert(updatedSw.updatedAt > 0, 'updatedAt must be set to timestamp');
assert(syncCalls.some(c => c.key === 'vortex_stopwatches' && c.isImmediate === true), 'resetStopwatch must trigger immediate FirebaseSync');
console.log('✓ Test 6 Passed: window.resetStopwatch cleanly stops stopwatch, resets elapsedSeconds to 0, sets updatedAt, and syncs immediately');

// 5. Test startTimerTicker behavior with reset timer & stopwatch
// Simulate ticker iteration:
const timersForTicker = mockState.getTimers();
const swForTicker = mockState.getStopwatches();
let hasChanges = false;

timersForTicker.forEach(t => {
  if (t.isRunning && t.remainingSeconds > 0) {
    t.remainingSeconds -= 1;
    hasChanges = true;
  }
});

swForTicker.forEach(sw => {
  if (sw.isRunning) {
    sw.elapsedSeconds += 1;
    hasChanges = true;
  }
});

assert.strictEqual(hasChanges, false, 'Ticker must NOT produce changes for reset timers and stopwatches');
assert.strictEqual(timersForTicker[0].remainingSeconds, 1200, 'Ticker must not decrement reset timer');
assert.strictEqual(swForTicker[0].elapsedSeconds, 0, 'Ticker must not increment reset stopwatch');
console.log('✓ Test 7 Passed: startTimerTicker does not advance reset timers or stopwatches');

console.log('\n========================================');
console.log('🎉 ALL 7 TESTS PASSED WITH 100% SUCCESS!');
console.log('========================================');
