const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== TEST: CONTINUOUS RUNNING TIMER & STOPWATCH ACROSS REFRESH, LOGOUT, & BACKGROUNDING ===\n');

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
    visibilityState: 'visible',
    addEventListener: () => {},
    getElementById: () => null,
    querySelectorAll: () => []
  }
};
global.document = window.document;

// 2. Load and verify app.js and firebase-sync.js
const appJsContent = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
const syncJsContent = fs.readFileSync(path.join(__dirname, '../js/firebase-sync.js'), 'utf8');

// Ensure functions exist
assert(appJsContent.includes('window.catchUpTimersAndStopwatches'), 'window.catchUpTimersAndStopwatches must exist in app.js');
assert(syncJsContent.includes('catchUpTimerOrSw'), 'catchUpTimerOrSw must exist in firebase-sync.js');
console.log('✓ Test 1 Passed: Core catch-up functions verified in codebases.');

// 3. Test catchUpTimersAndStopwatches logic directly
// Setup mock state
let currentTime = 1770000000000;
const originalDateNow = Date.now;
Date.now = () => currentTime;

const testTimers = [
  {
    id: 'tmr_running_1',
    userId: 'usr_1',
    name: 'Timer Uji Berjalan',
    totalSeconds: 1800, // 30 Menit
    remainingSeconds: 1800,
    isRunning: true,
    lastTick: currentTime,
    updatedAt: currentTime
  },
  {
    id: 'tmr_paused_1',
    userId: 'usr_1',
    name: 'Timer Uji Jeda',
    totalSeconds: 1800,
    remainingSeconds: 1200,
    isRunning: false,
    lastTick: null,
    updatedAt: currentTime
  }
];

const testStopwatches = [
  {
    id: 'sw_running_1',
    userId: 'usr_1',
    name: 'Stopwatch Uji Berjalan',
    elapsedSeconds: 100,
    isRunning: true,
    lastTick: currentTime,
    updatedAt: currentTime
  },
  {
    id: 'sw_stopped_1',
    userId: 'usr_1',
    name: 'Stopwatch Uji Berhenti',
    elapsedSeconds: 50,
    isRunning: false,
    lastTick: null,
    updatedAt: currentTime
  }
];

mockLS.setItem('vortex_timers', JSON.stringify(testTimers));
mockLS.setItem('vortex_stopwatches', JSON.stringify(testStopwatches));

global.state = {
  getTimers: () => JSON.parse(mockLS.getItem('vortex_timers')),
  saveTimers: (t) => mockLS.setItem('vortex_timers', JSON.stringify(t)),
  getStopwatches: () => JSON.parse(mockLS.getItem('vortex_stopwatches')),
  saveStopwatches: (s) => mockLS.setItem('vortex_stopwatches', JSON.stringify(s))
};

// Evaluate getTimerRemainingSeconds, getStopwatchElapsedSeconds, and catchUpTimersAndStopwatches in context
const remMatch = appJsContent.match(/window\.getTimerRemainingSeconds = function[\s\S]*?\n\};/);
if (remMatch) eval(remMatch[0]);
const swMatch = appJsContent.match(/window\.getStopwatchElapsedSeconds = function[\s\S]*?\n\};/);
if (swMatch) eval(swMatch[0]);
const catchUpMatch = appJsContent.match(/window\.catchUpTimersAndStopwatches = function\(\) \{[\s\S]*?\n\};/);
assert(catchUpMatch, 'catchUpTimersAndStopwatches definition not matched');
eval(catchUpMatch[0]);

// Simulate 45 seconds passing while user leaves web or screen sleeps
currentTime += 45000; // 45 seconds
window.catchUpTimersAndStopwatches();

const caughtUpTimers = global.state.getTimers();
const caughtUpSw = global.state.getStopwatches();

// Check running timer decremented by 45 seconds and DID NOT reset to 1800
const runningTimer = caughtUpTimers.find(t => t.id === 'tmr_running_1');
assert.strictEqual(runningTimer.isRunning, true, 'Timer must still be running');
assert.strictEqual(runningTimer.remainingSeconds, 1800 - 45, 'Timer must have decremented exactly 45 seconds');
assert.strictEqual(runningTimer.lastTick, currentTime, 'lastTick must be updated to current time');

// Check paused timer did not change
const pausedTimer = caughtUpTimers.find(t => t.id === 'tmr_paused_1');
assert.strictEqual(pausedTimer.remainingSeconds, 1200, 'Paused timer must not change');

// Check running stopwatch incremented by 45 seconds
const runningSw = caughtUpSw.find(s => s.id === 'sw_running_1');
assert.strictEqual(runningSw.isRunning, true, 'Stopwatch must still be running');
assert.strictEqual(runningSw.elapsedSeconds, 100 + 45, 'Stopwatch must have incremented by 45 seconds');
assert.strictEqual(runningSw.lastTick, currentTime, 'Stopwatch lastTick must be updated to current time');

console.log('✓ Test 2 Passed: catchUpTimersAndStopwatches correctly advances running timer & stopwatch by elapsed wall-clock seconds.');

// 4. Test timer completing while away (does not reset, stops at 0)
// Advance time by 2000 seconds (more than 1755 seconds left)
currentTime += 2000000;
window.catchUpTimersAndStopwatches();

const finishedTimers = global.state.getTimers();
const finishedTimer = finishedTimers.find(t => t.id === 'tmr_running_1');
assert.strictEqual(finishedTimer.remainingSeconds, 0, 'Completed timer must reach 0');
assert.strictEqual(finishedTimer.isRunning, false, 'Completed timer must stop running');
assert.strictEqual(finishedTimer.lastTick, null, 'Completed timer must have lastTick null');
console.log('✓ Test 3 Passed: Timer completing while away cleanly finishes at 00:00:00 without resetting.');

// 5. Test mergeCollections in firebase-sync.js: Refresh with Cloud Firestore
// Extract mergeCollections from syncJsContent
const sandbox = {
  getDeletedIds: () => new Set(),
  notifyDataChanged: () => {},
  Date: { now: () => currentTime }
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

// Scenario: Timer was running locally at 1500s remaining.
// Cloud snapshot has initial state (total: 1800, remaining: 1800, isRunning: false)
const localTimersActive = [
  {
    id: 'tmr_refresh_active',
    name: 'Timer Uji Refresh',
    totalSeconds: 1800,
    remainingSeconds: 1500,
    isRunning: true,
    lastTick: currentTime - 10000, // 10 seconds before reload finished
    updatedAt: currentTime - 10000
  }
];

const remoteTimersStale = [
  {
    id: 'tmr_refresh_active',
    name: 'Timer Uji Refresh',
    totalSeconds: 1800,
    remainingSeconds: 1800,
    isRunning: false,
    lastTick: null,
    updatedAt: currentTime - 50000 // older snapshot in cloud
  }
];

const mergeRes = testSync.mergeCollections('vortex_timers', localTimersActive, remoteTimersStale, new Set());
assert.strictEqual(mergeRes.merged.length, 1);
const mergedTimer = mergeRes.merged[0];

assert.strictEqual(mergedTimer.isRunning, true, 'Merged timer MUST continue running!');
assert.strictEqual(mergedTimer.remainingSeconds, 1500 - 10, 'Merged timer MUST catch up 10s during refresh!');
assert.strictEqual(mergeRes.hasLocalOverrides, true, 'Must flag local override to push updated state to cloud');
console.log('✓ Test 4 Passed: mergeCollections preserves actively running local timer across refresh and rejects stale initial cloud snapshot.');

// Scenario: Stopwatch was running locally at 300s elapsed.
// Cloud snapshot has initial state (elapsed: 0, isRunning: false)
const localSwActive = [
  {
    id: 'sw_refresh_active',
    name: 'Stopwatch Uji Refresh',
    elapsedSeconds: 300,
    isRunning: true,
    lastTick: currentTime - 5000, // 5s before reload
    updatedAt: currentTime - 5000
  }
];

const remoteSwStale = [
  {
    id: 'sw_refresh_active',
    name: 'Stopwatch Uji Refresh',
    elapsedSeconds: 0,
    isRunning: false,
    lastTick: null,
    updatedAt: currentTime - 50000
  }
];

const mergeSwRes = testSync.mergeCollections('vortex_stopwatches', localSwActive, remoteSwStale, new Set());
assert.strictEqual(mergeSwRes.merged.length, 1);
const mergedSwItem = mergeSwRes.merged[0];

assert.strictEqual(mergedSwItem.isRunning, true, 'Merged stopwatch MUST continue running!');
assert.strictEqual(mergedSwItem.elapsedSeconds, 300 + 5, 'Merged stopwatch MUST catch up 5s during refresh!');
assert.strictEqual(mergeSwRes.hasLocalOverrides, true, 'Must flag local override to push updated stopwatch to cloud');
console.log('✓ Test 5 Passed: mergeCollections preserves actively running local stopwatch across refresh and rejects stale 0-second cloud snapshot.');

// Restore Date.now
Date.now = originalDateNow;

console.log('\n======================================================');
console.log('🎉 ALL CONTINUOUS RUNNING TIMER & STOPWATCH TESTS PASSED!');
console.log('======================================================');
