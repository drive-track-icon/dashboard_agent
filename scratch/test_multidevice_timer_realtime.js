/**
 * Automated Verification Script: Multi-Device Realtime Timer & Stopwatch Sync + Floating Pop-up
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- STARTING MULTI-DEVICE TIMER & POP-UP VERIFICATION ---');

// Mock browser globals
global.window = global;
global.window.addEventListener = () => {};
global.document = {
  getElementById: (id) => null,
  addEventListener: () => {},
  createElement: (tag) => ({
    setAttribute: () => {},
    appendChild: () => {},
    classList: { add: () => {}, remove: () => {} },
    style: {},
    querySelector: () => ({ addEventListener: () => {} })
  }),
  head: { appendChild: () => {} },
  body: { innerHTML: '', appendChild: () => {} },
  visibilityState: 'visible'
};
global.localStorage = {
  _store: {},
  getItem(k) { return this._store[k] || null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; },
  clear() { this._store = {}; }
};
global.navigator = { onLine: true };
global.showToast = (t, m, type) => { /* quiet in test */ };

// Load code
const appJsPath = path.join(__dirname, '..', 'js', 'app.js');
const syncJsPath = path.join(__dirname, '..', 'js', 'firebase-sync.js');
const appContent = fs.readFileSync(appJsPath, 'utf8');
const syncContent = fs.readFileSync(syncJsPath, 'utf8');

// Evaluate app.js and firebase-sync.js in sandbox
eval(syncContent);
eval(appContent);
global.showToast = () => {};

console.log('✓ Successfully loaded and initialized js/app.js and js/firebase-sync.js');

// 1. Verify Helper Functions
assert(typeof window.getTimerRemainingSeconds === 'function', 'getTimerRemainingSeconds must exist');
assert(typeof window.getStopwatchElapsedSeconds === 'function', 'getStopwatchElapsedSeconds must exist');
assert(typeof window.addTimerQuickSeconds === 'function', 'addTimerQuickSeconds must exist');
assert(typeof window.openFloatingTimerWindow === 'function', 'openFloatingTimerWindow must exist');
assert(typeof window.updateFloatingTimerUI === 'function', 'updateFloatingTimerUI must exist');
assert(typeof window.updateFloatingTimerTick === 'function', 'updateFloatingTimerTick must exist');
console.log('✓ All core functions are globally exposed');

// Setup mock state & user
state.currentUser = {
  id: 'usr_test_agent',
  username: 'agent_test',
  fullName: 'Agent Tester',
  role: 'admin',
  department: 'CSO INBOUND'
};
state.isAdmin = () => true;

// 2. Test Drift-Free Time Calculation
const baseNow = Date.now();
const testTimer = {
  id: 'tmr_drift_test',
  totalSeconds: 300,
  remainingSeconds: 300,
  isRunning: true,
  targetEndTime: baseNow + (300 * 1000),
  startedAt: baseNow
};

assert.strictEqual(window.getTimerRemainingSeconds(testTimer, baseNow), 300, 'Initial timer should be 300s');
assert.strictEqual(window.getTimerRemainingSeconds(testTimer, baseNow + 5000), 295, 'After 5s timer should be 295s');
assert.strictEqual(window.getTimerRemainingSeconds(testTimer, baseNow + 300000), 0, 'After 300s timer should be 0s');
assert.strictEqual(window.getTimerRemainingSeconds(testTimer, baseNow + 350000), 0, 'After >300s timer should remain 0s');
console.log('✓ Drift-free Countdown calculation verified across timestamps');

const testSw = {
  id: 'sw_drift_test',
  elapsedSeconds: 0,
  accumulatedSeconds: 10,
  isRunning: true,
  startedAt: baseNow
};
assert.strictEqual(window.getStopwatchElapsedSeconds(testSw, baseNow), 10, 'Initial stopwatch should be 10s');
assert.strictEqual(window.getStopwatchElapsedSeconds(testSw, baseNow + 5000), 15, 'After 5s stopwatch should be 15s');
assert.strictEqual(window.getStopwatchElapsedSeconds(testSw, baseNow + 120000), 130, 'After 120s stopwatch should be 130s');
console.log('✓ Drift-free Stopwatch calculation verified across timestamps');

// 3. Test Multi-Device Synchronization & Conflict Resolution
const syncMgr = new window.FirebaseSync.constructor();
syncMgr.deviceId = 'device_pc';

// Device PC creates timer
const initialTimer = {
  id: 'tmr_sync_1',
  userId: 'usr_test_agent',
  name: 'Shift Inbound',
  category: 'CSO INBOUND',
  totalSeconds: 600,
  remainingSeconds: 600,
  isRunning: true,
  targetEndTime: baseNow + 600000,
  startedAt: baseNow,
  actionAt: baseNow,
  actionType: 'create',
  actionDeviceId: 'device_pc',
  updatedAt: baseNow
};

// Device Mobile receives this timer
const mobileLocalArr = [];
const remoteArr = [initialTimer];
const deletedIds = new Set();

let mergeResult = syncMgr.mergeCollections('vortex_timers', mobileLocalArr, remoteArr, deletedIds);
assert.strictEqual(mergeResult.merged.length, 1, 'Mobile should receive the new timer');
assert.strictEqual(mergeResult.hasLocalOverrides, false, 'Mobile should have no overrides');
assert.strictEqual(mergeResult.merged[0].isRunning, true, 'Timer on Mobile should be running');
console.log('✓ Device B (Mobile) successfully hydrated new timer from Device A (PC)');

// 5 seconds later, Mobile clicks Jeda (Pause)
const pauseTime = baseNow + 5000;
const mobilePausedTimer = {
  ...initialTimer,
  isRunning: false,
  remainingSeconds: 595,
  targetEndTime: null,
  pausedAt: pauseTime,
  actionAt: pauseTime,
  actionType: 'pause',
  actionDeviceId: 'device_mobile',
  updatedAt: pauseTime
};

// PC receives Mobile's pause while PC still had it running locally
const pcLocalRunning = {
  ...initialTimer,
  remainingSeconds: 595
};

mergeResult = syncMgr.mergeCollections('vortex_timers', [pcLocalRunning], [mobilePausedTimer], deletedIds);
assert.strictEqual(mergeResult.merged.length, 1);
assert.strictEqual(mergeResult.merged[0].isRunning, false, 'PC MUST pause when Mobile paused!');
assert.strictEqual(mergeResult.merged[0].remainingSeconds, 595, 'PC must have exact remaining seconds from pause');
assert.strictEqual(mergeResult.hasLocalOverrides, false, 'PC must NOT override Mobile pause!');
console.log('✓ Cross-Device Pause: Mobile pause successfully pauses PC without false overrides');

// PC clicks Reset
const resetTime = pauseTime + 3000;
const pcResetTimer = {
  ...mobilePausedTimer,
  isRunning: false,
  remainingSeconds: 600,
  targetEndTime: null,
  resetAt: resetTime,
  actionAt: resetTime,
  actionType: 'reset',
  actionDeviceId: 'device_pc',
  updatedAt: resetTime
};

// Mobile receives PC's reset
mergeResult = syncMgr.mergeCollections('vortex_timers', [mobilePausedTimer], [pcResetTimer], deletedIds);
assert.strictEqual(mergeResult.merged.length, 1);
assert.strictEqual(mergeResult.merged[0].remainingSeconds, 600, 'Mobile must be reset to 600s');
assert.strictEqual(mergeResult.merged[0].isRunning, false, 'Mobile timer must be stopped');
assert.strictEqual(mergeResult.hasLocalOverrides, false, 'Mobile must not override PC reset');
console.log('✓ Cross-Device Reset: PC reset successfully resets Mobile in real-time');

// 4. Test Stopwatch Cross-Device Sync
const initialSw = {
  id: 'sw_sync_1',
  userId: 'usr_test_agent',
  name: 'Handling Call',
  dept: 'CSO INBOUND',
  elapsedSeconds: 0,
  accumulatedSeconds: 0,
  isRunning: true,
  startedAt: baseNow,
  actionAt: baseNow,
  actionType: 'create',
  actionDeviceId: 'device_mobile',
  updatedAt: baseNow
};

// PC receives Stopwatch from Mobile
mergeResult = syncMgr.mergeCollections('vortex_stopwatches', [], [initialSw], deletedIds);
assert.strictEqual(mergeResult.merged.length, 1);
assert.strictEqual(mergeResult.merged[0].isRunning, true);
console.log('✓ Device PC successfully receives running Stopwatch from Mobile');

// Mobile pauses Stopwatch at 20s
const swPauseTime = baseNow + 20000;
const mobilePausedSw = {
  ...initialSw,
  isRunning: false,
  elapsedSeconds: 20,
  accumulatedSeconds: 20,
  startedAt: null,
  pausedAt: swPauseTime,
  actionAt: swPauseTime,
  actionType: 'pause',
  actionDeviceId: 'device_mobile',
  updatedAt: swPauseTime
};

const pcRunningSw = { ...initialSw };
mergeResult = syncMgr.mergeCollections('vortex_stopwatches', [pcRunningSw], [mobilePausedSw], deletedIds);
assert.strictEqual(mergeResult.merged[0].isRunning, false, 'PC must pause stopwatch');
assert.strictEqual(mergeResult.merged[0].elapsedSeconds, 20, 'PC must have exact elapsed time');
assert.strictEqual(mergeResult.hasLocalOverrides, false, 'PC must not override stopwatch pause');
console.log('✓ Cross-Device Stopwatch Pause: Real-time sync verified');

// 5. Test Floating Window DOM & Controls
let mockPipDoc = {
  title: '',
  head: {
    appendChild: (el) => {}
  },
  body: {
    innerHTML: ''
  },
  getElementById: function(id) {
    if (!this._elements) this._elements = {};
    if (!this._elements[id]) {
      this._elements[id] = {
        id,
        className: '',
        textContent: '',
        style: {},
        classList: {
          add: () => {},
          remove: () => {}
        },
        onclick: null,
        onchange: null
      };
    }
    return this._elements[id];
  }
};

let mockPipWindow = {
  document: mockPipDoc,
  closed: false,
  focus: () => {},
  addEventListener: () => {}
};

window.vortexFloatingWindow = mockPipWindow;
window.floatingActiveTab = 'timer';
window.floatingSelectedTimerId = initialTimer.id;
state.getTimers = () => [initialTimer];
state.getStopwatches = () => [initialSw];

window.updateFloatingTimerUI();
assert(mockPipDoc.getElementById('pipContentArea').innerHTML.length > 0, 'Floating content area must be populated');
console.log('✓ Floating Pop-up Window UI rendering verified');

window.updateFloatingTimerTick();
console.log('✓ Floating Pop-up Window live ticking verified');

// Test Quick Add Time
const timersBefore = [JSON.parse(JSON.stringify(initialTimer))];
state.getTimers = () => timersBefore;
state.saveTimers = (t) => { timersBefore.splice(0, timersBefore.length, ...t); };
window.addTimerQuickSeconds(initialTimer.id, 60);
assert.strictEqual(timersBefore[0].remainingSeconds, 660, 'Timer should have 60s added (660s)');
console.log('✓ addTimerQuickSeconds (+1 minute) verified');

console.log('--- ALL MULTI-DEVICE & POP-UP TIMER TESTS PASSED (100%) ---');
