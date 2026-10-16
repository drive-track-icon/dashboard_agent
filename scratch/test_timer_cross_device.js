const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== TEST: CROSS-DEVICE (PINDAH DEVICE) TIMER & STOPWATCH PERSISTENCE ===\n');

// Load firebase-sync.js
const syncJsContent = fs.readFileSync(path.join(__dirname, '../js/firebase-sync.js'), 'utf8');

let simulatedNow = 1770000000000;

// Extract mergeCollections
const sandbox = {
  getDeletedIds: () => new Set(),
  notifyDataChanged: () => {},
  console: console,
  Date: {
    now: () => simulatedNow
  }
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

// Scenario 1: Device A starts countdown timer at T=1770000000000
const startTime = simulatedNow;
const timerOnDeviceA = {
  id: 'tmr_makan_1',
  name: 'Makan Siang',
  totalSeconds: 1800,
  remainingSeconds: 1800,
  isRunning: true,
  lastTick: startTime,
  updatedAt: startTime,
  resetAt: null
};

// Cloud Firestore now holds timerOnDeviceA
const cloudFirestoreTimers = [timerOnDeviceA];

// 5 minutes (300 seconds) pass while user moves to Device B (pindah device)
simulatedNow += 300000;

// Device B opens for the first time:
// Device B has default demo timers in its local storage
const deviceBLocalTimers = [
  {
    id: 'tmr_user_1',
    name: 'Pemeriksaan Fisik Barang Masuk',
    totalSeconds: 2700,
    remainingSeconds: 2700,
    isRunning: false,
    lastTick: null,
    updatedAt: 1769900000000
  }
];

// Evaluate merge on Device B
const mergeResultDeviceB = testSync.mergeCollections('vortex_timers', deviceBLocalTimers, cloudFirestoreTimers, new Set());
const timersOnDeviceB = mergeResultDeviceB.merged;

// Check: Timer Makan Siang must be in Device B
const makanOnDeviceB = timersOnDeviceB.find(t => t.id === 'tmr_makan_1');
assert(makanOnDeviceB, 'Timer Makan Siang MUST exist on Device B');
assert.strictEqual(makanOnDeviceB.isRunning, true, 'Timer Makan Siang MUST be running on Device B');

// Check: 300 seconds (5 minutes) elapsed, remaining should be 1500 seconds (NOT reset to 1800!)
assert.strictEqual(makanOnDeviceB.remainingSeconds, 1500, 'Timer on Device B MUST NOT reset to 1800! Must be 1500s remaining.');

// Check: Device B did NOT flag local override (it must NOT overwrite the cloud with a stopped timer!)
assert.strictEqual(mergeResultDeviceB.hasLocalOverrides, false, 'Device B must NOT override Cloud Firestore with stale local defaults!');

console.log('✓ Test 1 Passed: Pindah Device - Device B downloads running timer, catches up elapsed time (1500s), and does NOT reset to beginning.');

// Scenario 2: Device B opens with EMPTY local storage (fresh browser / incognito)
const mergeResultFreshDevice = testSync.mergeCollections('vortex_timers', [], cloudFirestoreTimers, new Set());
const freshTimers = mergeResultFreshDevice.merged;
const freshMakan = freshTimers.find(t => t.id === 'tmr_makan_1');
assert(freshMakan, 'Timer Makan Siang must exist on fresh device');
assert.strictEqual(freshMakan.isRunning, true, 'Timer on fresh device must be running');
assert.strictEqual(freshMakan.remainingSeconds, 1500, 'Timer on fresh device must catch up to 1500s');
assert.strictEqual(mergeResultFreshDevice.hasLocalOverrides, false, 'Fresh device must not trigger overrides');
console.log('✓ Test 2 Passed: Fresh Device / Incognito - Empty storage adopts caught-up running timer.');

// Scenario 3: Stopwatch started on Device A, user switches to Device B
const stopwatchOnDeviceA = {
  id: 'sw_audit_1',
  name: 'Stopwatch Audit',
  elapsedSeconds: 0,
  isRunning: true,
  lastTick: startTime,
  updatedAt: startTime,
  resetAt: null
};

// Device B syncs stopwatch after 300 seconds
const cloudFirestoreSw = [stopwatchOnDeviceA];
const mergeResultSwDeviceB = testSync.mergeCollections('vortex_stopwatches', [], cloudFirestoreSw, new Set());
const swOnDeviceB = mergeResultSwDeviceB.merged.find(s => s.id === 'sw_audit_1');

assert(swOnDeviceB, 'Stopwatch must exist on Device B');
assert.strictEqual(swOnDeviceB.isRunning, true, 'Stopwatch must be running on Device B');
assert.strictEqual(swOnDeviceB.elapsedSeconds, 300, 'Stopwatch on Device B must be 300s elapsed (NOT reset to 0!)');
console.log('✓ Test 3 Passed: Pindah Device - Stopwatch catches up elapsed time (300s) on new device and continues running.');

// Scenario 4: User explicitly clicks RESET button on Device B
// Device B sets resetAt timestamp:
const resetTime = simulatedNow + 60000;
const resetTimerLocal = {
  ...makanOnDeviceB,
  remainingSeconds: 1800,
  isRunning: false,
  lastTick: null,
  resetAt: resetTime,
  updatedAt: resetTime
};

// Device A (which was still running at 1500s) receives this reset
const mergeResultAfterReset = testSync.mergeCollections('vortex_timers', [resetTimerLocal], cloudFirestoreTimers, new Set());
const finalMakan = mergeResultAfterReset.merged.find(t => t.id === 'tmr_makan_1');

assert.strictEqual(finalMakan.isRunning, false, 'Timer must be stopped after explicit reset');
assert.strictEqual(finalMakan.remainingSeconds, 1800, 'Timer must be 1800s after explicit reset');
assert.strictEqual(mergeResultAfterReset.hasLocalOverrides, true, 'Explicit reset must push override to cloud');
console.log('✓ Test 4 Passed: Explicit Reset on Device B cleanly resets timer and overrides cloud.');

console.log('\n=============================================================');
console.log('🎉 ALL CROSS-DEVICE (PINDAH DEVICE) TESTS PASSED 100%!');
console.log('=============================================================');
