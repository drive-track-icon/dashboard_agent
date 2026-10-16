const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== TEST: MULTI-DEVICE REALTIME SYNC (JEDA, RESET, HAPUS, & ZERO TIME DIFFERENCE) ===\n');

// 1. Load files
const syncJsContent = fs.readFileSync(path.join(__dirname, '../js/firebase-sync.js'), 'utf8');
const appJsContent = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');

let simulatedNow = 1770000000000;

function createTestSync(localDeletedIds = new Set(), syncedIds = new Set()) {
  const store = {
    'vortex_deleted_ids_vortex_timers': JSON.stringify([...localDeletedIds]),
    'vortex_deleted_ids_vortex_stopwatches': JSON.stringify([...localDeletedIds]),
    'vortex_synced_ids_vortex_timers': JSON.stringify([...syncedIds]),
    'vortex_synced_ids_vortex_stopwatches': JSON.stringify([...syncedIds])
  };

  const sandbox = {
    localStorage: {
      getItem: (k) => store[k] || null,
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: (k) => { delete store[k]; }
    },
    console: console,
    Date: {
      now: () => simulatedNow
    }
  };

  const mergeEndIdx = syncJsContent.lastIndexOf('/**', syncJsContent.indexOf('startRealtimeListeners() {'));
  const mergeMethodCode = syncJsContent.substring(syncJsContent.indexOf('mergeCollections('), mergeEndIdx);
  const helpersCode = `
    getKnownSyncedIds(key) {
      try {
        const raw = localStorage.getItem('vortex_synced_ids_' + key);
        const arr = raw ? JSON.parse(raw) : [];
        return new Set(Array.isArray(arr) ? arr : []);
      } catch (e) {
        return new Set();
      }
    }
    recordKnownSyncedIds(key, ids) {
      try {
        const set = this.getKnownSyncedIds(key);
        if (Array.isArray(ids)) {
          ids.forEach(id => { if (id) set.add(id); });
        }
        localStorage.setItem('vortex_synced_ids_' + key, JSON.stringify([...set]));
      } catch (e) {}
    }
    removeKnownSyncedId(key, id) {
      try {
        const set = this.getKnownSyncedIds(key);
        set.delete(id);
        localStorage.setItem('vortex_synced_ids_' + key, JSON.stringify([...set]));
      } catch (e) {}
    }
    getDeletedIds(key) {
      try {
        const raw = localStorage.getItem('vortex_deleted_ids_' + key);
        const arr = raw ? JSON.parse(raw) : [];
        return new Set(Array.isArray(arr) ? arr : []);
      } catch (e) {
        return new Set();
      }
    }
    trackDeletedId(key, id) {
      if (!id) return;
      try {
        const set = this.getDeletedIds(key);
        set.add(id);
        localStorage.setItem('vortex_deleted_ids_' + key, JSON.stringify([...set]));
        this.removeKnownSyncedId(key, id);
      } catch (e) {}
    }
  `;

  const evalCode = `
  class TestSync {
    ${helpersCode}
    ${mergeMethodCode}
  }
  new TestSync();
  `;
  return vm.runInNewContext(evalCode, sandbox);
}

// =========================================================================
// SCENARIO 1: JEDA (PAUSE) ON DEVICE A PROPAGATES TO DEVICE B
// Device A and Device B both have timer running.
// Device A pauses the timer at T = 1770000030000 (after 30 seconds).
// Device B (which was still ticking) receives the snapshot from Device A.
// Device B must adopt the pause, freeze at the exact remaining seconds, and NOT override!
// =========================================================================
console.log('--- SCENARIO 1: JEDA (PAUSE) PROPAGATION ACROSS DEVICES ---');

const syncEngine = createTestSync(new Set(), new Set(['tmr_task_1']));

const T0 = simulatedNow;
const runningTimerDeviceA = {
  id: 'tmr_task_1',
  name: 'Task Countdown',
  totalSeconds: 600,
  remainingSeconds: 600,
  isRunning: true,
  lastTick: T0,
  startedAt: T0,
  updatedAt: T0,
  pausedAt: null,
  resetAt: null
};

// 30 seconds later:
simulatedNow += 30000; // T0 + 30s
const T_pause = simulatedNow;

// Device A paused:
const pausedTimerFromDeviceA = {
  id: 'tmr_task_1',
  name: 'Task Countdown',
  totalSeconds: 600,
  remainingSeconds: 570,
  isRunning: false,
  lastTick: null,
  startedAt: T0,
  pausedAt: T_pause,
  updatedAt: T_pause,
  resetAt: null
};

// Device B locally was running and its local ticker reached 570s:
const localTimerDeviceB = {
  id: 'tmr_task_1',
  name: 'Task Countdown',
  totalSeconds: 600,
  remainingSeconds: 570,
  isRunning: true,
  lastTick: T_pause,
  startedAt: T0,
  pausedAt: null,
  updatedAt: T0,
  resetAt: null
};

const mergeResultPause = syncEngine.mergeCollections('vortex_timers', [localTimerDeviceB], [pausedTimerFromDeviceA], new Set());
const timerOnBAfterPause = mergeResultPause.merged.find(t => t.id === 'tmr_task_1');

assert(timerOnBAfterPause, 'Timer must exist on Device B');
assert.strictEqual(timerOnBAfterPause.isRunning, false, 'Device B MUST accept the pause action from Device A!');
assert.strictEqual(timerOnBAfterPause.remainingSeconds, 570, 'Device B must freeze at 570 remaining seconds');
assert.strictEqual(mergeResultPause.hasLocalOverrides, false, 'Device B must NOT override Cloud when adopting remote pause!');
console.log('✓ Scenario 1 Passed: Jeda (Pause) on Device A cleanly pauses Device B without cloud override.\n');

// =========================================================================
// SCENARIO 2: RESET ON DEVICE A PROPAGATES TO DEVICE B
// Device B is running. Device A presses Reset.
// Device B must reset to totalSeconds (600), isRunning: false, no override!
// =========================================================================
console.log('--- SCENARIO 2: RESET PROPAGATION ACROSS DEVICES ---');
simulatedNow += 10000; // 10s later
const T_reset = simulatedNow;

const resetTimerFromDeviceA = {
  id: 'tmr_task_1',
  name: 'Task Countdown',
  totalSeconds: 600,
  remainingSeconds: 600,
  isRunning: false,
  lastTick: null,
  startedAt: null,
  pausedAt: null,
  resetAt: T_reset,
  updatedAt: T_reset
};

// Device B was running:
const runningTimerDeviceB = {
  id: 'tmr_task_1',
  name: 'Task Countdown',
  totalSeconds: 600,
  remainingSeconds: 560,
  isRunning: true,
  lastTick: T_reset,
  startedAt: T0,
  pausedAt: null,
  resetAt: null,
  updatedAt: T0
};

const mergeResultReset = syncEngine.mergeCollections('vortex_timers', [runningTimerDeviceB], [resetTimerFromDeviceA], new Set());
const timerOnBAfterReset = mergeResultReset.merged.find(t => t.id === 'tmr_task_1');

assert(timerOnBAfterReset, 'Timer must exist on Device B');
assert.strictEqual(timerOnBAfterReset.isRunning, false, 'Device B MUST accept remote reset and stop running!');
assert.strictEqual(timerOnBAfterReset.remainingSeconds, 600, 'Device B must be reset to totalSeconds (600)!');
assert.strictEqual(mergeResultReset.hasLocalOverrides, false, 'Device B must NOT override Cloud when adopting remote reset!');
console.log('✓ Scenario 2 Passed: Reset on Device A cleanly resets Device B without cloud override.\n');

// =========================================================================
// SCENARIO 3: HAPUS (DELETE) ON DEVICE A PROPAGATES TO DEVICE B
// Device A deletes timer 'tmr_custom_del'.
// Cloud payload is updated without it.
// Device B receives remoteArr: [].
// Device B must NOT resurrect 'tmr_custom_del'!
// =========================================================================
console.log('--- SCENARIO 3: HAPUS (DELETE) PROPAGATION ACROSS DEVICES ---');

const syncEngineDelete = createTestSync(new Set(['tmr_custom_del']), new Set(['tmr_custom_del']));

const itemDeletedOnA = {
  id: 'tmr_custom_del',
  name: 'Custom To Delete',
  totalSeconds: 300,
  remainingSeconds: 300,
  isRunning: false,
  createdAt: T0,
  updatedAt: T0
};

// Device B has it in local storage:
const localTimersOnB = [itemDeletedOnA];
// Cloud has deleted it (remoteArr is empty or doesn't have it):
const remoteTimersAfterDelete = [];

const mergeResultDelete = syncEngineDelete.mergeCollections('vortex_timers', localTimersOnB, remoteTimersAfterDelete, new Set(['tmr_custom_del']));
const timerOnBAfterDelete = mergeResultDelete.merged.find(t => t.id === 'tmr_custom_del');

assert(!timerOnBAfterDelete, 'Deleted timer MUST NOT be resurrected on Device B!');
assert.strictEqual(mergeResultDelete.hasLocalOverrides, false, 'Device B must NOT push deleted item back to Cloud!');
console.log('✓ Scenario 3 Passed: Hapus (Delete) on Device A cleanly deletes from Device B without resurrection.\n');

// =========================================================================
// SCENARIO 4: STOPWATCH PAUSE & RESET PROPAGATION
// Device A pauses stopwatch after 120s. Device B must pause at 120s.
// Device A resets stopwatch to 0s. Device B must reset to 0s.
// =========================================================================
console.log('--- SCENARIO 4: STOPWATCH PAUSE & RESET PROPAGATION ---');

const T_sw_start = simulatedNow;
const swPausedFromA = {
  id: 'sw_ops_1',
  name: 'Stopwatch Ops',
  elapsedSeconds: 120,
  isRunning: false,
  lastTick: null,
  startedAt: T_sw_start,
  pausedAt: T_sw_start + 120000,
  updatedAt: T_sw_start + 120000,
  resetAt: null
};

const swRunningOnB = {
  id: 'sw_ops_1',
  name: 'Stopwatch Ops',
  elapsedSeconds: 120,
  isRunning: true,
  lastTick: T_sw_start + 120000,
  startedAt: T_sw_start,
  pausedAt: null,
  updatedAt: T_sw_start,
  resetAt: null
};

const swMergePause = syncEngine.mergeCollections('vortex_stopwatches', [swRunningOnB], [swPausedFromA], new Set());
const swOnBAfterPause = swMergePause.merged.find(s => s.id === 'sw_ops_1');

assert(swOnBAfterPause, 'Stopwatch must exist on Device B');
assert.strictEqual(swOnBAfterPause.isRunning, false, 'Device B must pause stopwatch!');
assert.strictEqual(swOnBAfterPause.elapsedSeconds, 120, 'Device B stopwatch must freeze at 120s');
assert.strictEqual(swMergePause.hasLocalOverrides, false, 'No overrides on pause');

// Now reset stopwatch on Device A
const swResetFromA = {
  id: 'sw_ops_1',
  name: 'Stopwatch Ops',
  elapsedSeconds: 0,
  isRunning: false,
  lastTick: null,
  startedAt: null,
  pausedAt: null,
  resetAt: T_sw_start + 150000,
  updatedAt: T_sw_start + 150000
};

const swMergeReset = syncEngine.mergeCollections('vortex_stopwatches', [swOnBAfterPause], [swResetFromA], new Set());
const swOnBAfterReset = swMergeReset.merged.find(s => s.id === 'sw_ops_1');
assert.strictEqual(swOnBAfterReset.isRunning, false);
assert.strictEqual(swOnBAfterReset.elapsedSeconds, 0, 'Stopwatch must reset to 0');
assert.strictEqual(swMergeReset.hasLocalOverrides, false);
console.log('✓ Scenario 4 Passed: Stopwatch pause and reset propagate accurately across devices.\n');

// =========================================================================
// SCENARIO 5: ZERO TIME DIFFERENCE (TIDAK ADA PERBEDAAN WAKTU)
// Device A starts timer at T_start with totalSeconds 1800.
// 250 seconds pass on wall clock.
// Device A ticks: remainingSeconds = 1800 - 250 = 1550.
// Device B loads cloud data: remainingSeconds MUST be 1550 with ZERO difference.
// =========================================================================
console.log('--- SCENARIO 5: ZERO TIME DRIFT (SYNCHRONIZED WALL CLOCK) ---');

const T_timer_start = simulatedNow;
const runningTimerCloud = {
  id: 'tmr_zero_drift',
  name: 'Zero Drift Timer',
  totalSeconds: 1800,
  remainingSeconds: 1800,
  isRunning: true,
  lastTick: T_timer_start,
  startedAt: T_timer_start,
  updatedAt: T_timer_start
};

// 250 seconds elapse
simulatedNow += 250000;

// Device B connects:
const devBMerge = syncEngine.mergeCollections('vortex_timers', [], [runningTimerCloud], new Set());
const devBTimer = devBMerge.merged.find(t => t.id === 'tmr_zero_drift');

assert(devBTimer, 'Timer must exist on Device B');
assert.strictEqual(devBTimer.isRunning, true, 'Timer must be running on Device B');
assert.strictEqual(devBTimer.remainingSeconds, 1550, 'Device B must show exact same remaining seconds (1550s) with 0s drift!');
assert.strictEqual(devBMerge.hasLocalOverrides, false);
console.log('✓ Scenario 5 Passed: Zero Time Difference verified. Device B matches Device A exactly with 0s difference.\n');

console.log('=============================================================');
console.log('🎉 ALL MULTI-DEVICE SYNC SCENARIOS PASSED 100%!');
console.log('=============================================================');
