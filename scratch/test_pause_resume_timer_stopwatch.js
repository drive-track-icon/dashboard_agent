const assert = require('assert');

console.log('=== TEST: VERIFY FIXED PAUSE & RESUME LOGIC (TIMER & STOPWATCH) ===\n');

const storage = {};
global.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; }
};

let mockedNow = 1000000;
Date.now = () => mockedNow;

global.window = global;
global.document = {
  getElementById: () => null,
  addEventListener: () => {}
};
global.showToast = () => {};
global.renderTimerPage = () => {};
global.updateFloatingTimerUI = () => {};

global.state = {
  currentUser: { id: 'usr_test', fullName: 'Tester', role: 'admin' },
  isAdmin: () => true,
  getTimers: () => JSON.parse(storage['vortex_timers'] || '[]'),
  saveTimers: (t) => { storage['vortex_timers'] = JSON.stringify(t); },
  getStopwatches: () => JSON.parse(storage['vortex_stopwatches'] || '[]'),
  saveStopwatches: (s) => { storage['vortex_stopwatches'] = JSON.stringify(s); }
};

// Fixed functions:
window.getTimerRemainingSeconds = function(timer, now = Date.now()) {
  if (!timer) return 0;
  if (!timer.isRunning) {
    return Math.max(0, Number(timer.remainingSeconds) || 0);
  }
  if (timer.targetEndTime) {
    return Math.max(0, Math.ceil((Number(timer.targetEndTime) - now) / 1000));
  }
  if (timer.startedAt && timer.remainingSeconds) {
    const elapsedSec = Math.floor((now - Number(timer.startedAt)) / 1000);
    return Math.max(0, (Number(timer.remainingSeconds) || 0) - elapsedSec);
  }
  if (timer.lastTick) {
    const elapsedSec = Math.floor((now - Number(timer.lastTick)) / 1000);
    return Math.max(0, (Number(timer.remainingSeconds) || 0) - elapsedSec);
  }
  return Math.max(0, Number(timer.remainingSeconds) || 0);
};

window.getStopwatchElapsedSeconds = function(sw, now = Date.now()) {
  if (!sw) return 0;
  if (!sw.isRunning) {
    return Math.max(0, Number(sw.elapsedSeconds) || 0);
  }
  if (sw.startedAt) {
    const addedSec = Math.floor((now - Number(sw.startedAt)) / 1000);
    return Math.max(0, (Number(sw.accumulatedSeconds) || Number(sw.elapsedSeconds) || 0) + addedSec);
  }
  if (sw.lastTick) {
    const elapsedSec = Math.floor((now - Number(sw.lastTick)) / 1000);
    return Math.max(0, (Number(sw.elapsedSeconds) || 0) + elapsedSec);
  }
  return Math.max(0, Number(sw.elapsedSeconds) || 0);
};

window.toggleTimerRunning = function(id) {
  if (!state.currentUser) return;
  const timers = state.getTimers();
  const timer = timers.find(t => t.id === id);
  if (!timer) return;

  if (timer.userId !== state.currentUser.id && !state.isAdmin()) {
    showToast('Akses Ditolak', 'Anda hanya dapat mengontrol timer milik Anda sendiri.', 'warning');
    return;
  }

  const now = Date.now();
  const devId = 'dev_' + now;

  const curRem = window.getTimerRemainingSeconds(timer, now);

  if (curRem === 0 || timer.remainingSeconds === 0) {
    timer.remainingSeconds = timer.totalSeconds;
    timer.isRunning = true;
    timer.startedAt = now;
    timer.targetEndTime = now + (Number(timer.remainingSeconds) * 1000);
    timer.lastTick = now;
    timer.pausedAt = null;
    timer.resetAt = null;
    timer.actionAt = now;
    timer.actionType = 'start';
  } else if (timer.isRunning) {
    timer.remainingSeconds = curRem;
    timer.isRunning = false;
    timer.targetEndTime = null;
    timer.lastTick = null;
    timer.startedAt = null;
    timer.pausedAt = now;
    timer.actionAt = now;
    timer.actionType = 'pause';
  } else {
    timer.remainingSeconds = curRem;
    timer.isRunning = true;
    timer.startedAt = now;
    timer.targetEndTime = now + (Number(curRem) * 1000);
    timer.lastTick = now;
    timer.pausedAt = null;
    timer.resetAt = null;
    timer.actionAt = now;
    timer.actionType = 'start';
  }
  timer.actionDeviceId = devId;
  timer.updatedAt = now;
  state.saveTimers(timers);
  renderTimerPage();
  if (typeof window.updateFloatingTimerUI === 'function') {
    window.updateFloatingTimerUI();
  }
};

window.toggleStopwatchRunning = function(id) {
  if (!state.currentUser) return;
  const stopwatches = state.getStopwatches();
  const sw = stopwatches.find(s => s.id === id);
  if (!sw) return;

  if (sw.userId !== state.currentUser.id && !state.isAdmin()) {
    showToast('Akses Ditolak', 'Anda hanya dapat mengontrol stopwatch milik Anda sendiri.', 'warning');
    return;
  }

  const now = Date.now();
  const devId = 'dev_' + now;

  const curElapsed = window.getStopwatchElapsedSeconds(sw, now);

  if (sw.isRunning) {
    sw.elapsedSeconds = curElapsed;
    sw.accumulatedSeconds = curElapsed;
    sw.isRunning = false;
    sw.startedAt = null;
    sw.lastTick = null;
    sw.pausedAt = now;
    sw.actionAt = now;
    sw.actionType = 'pause';
  } else {
    sw.elapsedSeconds = curElapsed;
    sw.accumulatedSeconds = curElapsed;
    sw.isRunning = true;
    sw.startedAt = now;
    sw.lastTick = now;
    sw.pausedAt = null;
    sw.resetAt = null;
    sw.actionAt = now;
    sw.actionType = 'start';
  }
  sw.actionDeviceId = devId;
  sw.updatedAt = now;
  state.saveStopwatches(stopwatches);
  renderTimerPage();
  if (typeof window.updateFloatingTimerUI === 'function') {
    window.updateFloatingTimerUI();
  }
};

// -------------------------------------------------------------
// TEST 1: Countdown Timer Full Cycle
// -------------------------------------------------------------
console.log('--- TEST 1: Countdown Timer Multi-Cycle (Jeda -> Mulai -> Jeda -> Mulai) ---');
const testTimer = {
  id: 'tmr_1',
  userId: 'usr_test',
  name: 'Countdown 10m',
  totalSeconds: 600,
  remainingSeconds: 600,
  isRunning: true,
  startedAt: mockedNow,
  targetEndTime: mockedNow + 600000
};
state.saveTimers([testTimer]);

// Step 1: Run 20s
mockedNow += 20000;
let t = state.getTimers()[0];
assert.strictEqual(window.getTimerRemainingSeconds(t), 580, 'After 20s, remaining must be 580');

// Step 2: Click JEDA (Pause)
window.toggleTimerRunning('tmr_1');
t = state.getTimers()[0];
assert.strictEqual(t.isRunning, false, 'Timer must be paused');
assert.strictEqual(t.remainingSeconds, 580, 'Paused remainingSeconds must be 580');
assert.strictEqual(window.getTimerRemainingSeconds(t), 580, 'getTimerRemainingSeconds must return 580 while paused');

// Step 3: Wait 15s while paused
mockedNow += 15000;
t = state.getTimers()[0];
assert.strictEqual(window.getTimerRemainingSeconds(t), 580, 'While paused, time must freeze at 580s');

// Step 4: Click MULAI (Resume)
window.toggleTimerRunning('tmr_1');
t = state.getTimers()[0];
assert.strictEqual(t.isRunning, true, 'Timer must be running again');
assert.strictEqual(window.getTimerRemainingSeconds(t), 580, 'Immediately upon resume, time is 580s');

// Step 5: Run 15s more
mockedNow += 15000;
t = state.getTimers()[0];
assert.strictEqual(window.getTimerRemainingSeconds(t), 565, 'After 15s more, time must count down to 565s');

// Step 6: Click JEDA (Pause) again
window.toggleTimerRunning('tmr_1');
t = state.getTimers()[0];
assert.strictEqual(t.isRunning, false, 'Timer must pause again');
assert.strictEqual(t.remainingSeconds, 565, 'Timer must freeze at 565s');

// Step 7: Wait 30s while paused
mockedNow += 30000;
assert.strictEqual(window.getTimerRemainingSeconds(state.getTimers()[0]), 565, 'Frozen at 565s');

// Step 8: Click MULAI (Resume) again
window.toggleTimerRunning('tmr_1');
// Run 25s
mockedNow += 25000;
t = state.getTimers()[0];
assert.strictEqual(window.getTimerRemainingSeconds(t), 540, 'After 25s more, time must count down to 540s');

console.log('✓ TEST 1 PASSED: Countdown timer successfully pauses and resumes without jumping or resetting!\n');

// -------------------------------------------------------------
// TEST 2: Stopwatch Multi-Cycle
// -------------------------------------------------------------
console.log('--- TEST 2: Stopwatch Multi-Cycle (Jeda -> Mulai -> Jeda -> Mulai) ---');
const testSw = {
  id: 'sw_1',
  userId: 'usr_test',
  name: 'Stopwatch 1',
  elapsedSeconds: 0,
  accumulatedSeconds: 0,
  isRunning: true,
  startedAt: mockedNow
};
state.saveStopwatches([testSw]);

// Step 1: Run 25s
mockedNow += 25000;
let sw = state.getStopwatches()[0];
assert.strictEqual(window.getStopwatchElapsedSeconds(sw), 25, 'After 25s, stopwatch elapsed must be 25');

// Step 2: Click JEDA (Pause)
window.toggleStopwatchRunning('sw_1');
sw = state.getStopwatches()[0];
assert.strictEqual(sw.isRunning, false, 'Stopwatch must be paused');
assert.strictEqual(sw.elapsedSeconds, 25, 'Stopwatch elapsed must be 25');
assert.strictEqual(sw.accumulatedSeconds, 25, 'Stopwatch accumulated must be 25');
assert.strictEqual(window.getStopwatchElapsedSeconds(sw), 25, 'getStopwatchElapsedSeconds must be 25');

// Step 3: Wait 20s while paused
mockedNow += 20000;
assert.strictEqual(window.getStopwatchElapsedSeconds(state.getStopwatches()[0]), 25, 'Frozen at 25s');

// Step 4: Click MULAI (Resume)
window.toggleStopwatchRunning('sw_1');
sw = state.getStopwatches()[0];
assert.strictEqual(sw.isRunning, true, 'Stopwatch must be running');
assert.strictEqual(window.getStopwatchElapsedSeconds(sw), 25, 'At resume instant, elapsed is 25');

// Step 5: Run 15s more
mockedNow += 15000;
sw = state.getStopwatches()[0];
assert.strictEqual(window.getStopwatchElapsedSeconds(sw), 40, 'After 15s more, stopwatch elapsed must be 40s (25 + 15)');

// Step 6: Click JEDA (Pause) again
window.toggleStopwatchRunning('sw_1');
sw = state.getStopwatches()[0];
assert.strictEqual(sw.isRunning, false, 'Stopwatch must pause');
assert.strictEqual(sw.elapsedSeconds, 40, 'Stopwatch elapsed frozen at 40');

// Step 7: Click MULAI again and run 10s
window.toggleStopwatchRunning('sw_1');
mockedNow += 10000;
sw = state.getStopwatches()[0];
assert.strictEqual(window.getStopwatchElapsedSeconds(sw), 50, 'After 10s more, stopwatch elapsed must be 50s (40 + 10)');

console.log('✓ TEST 2 PASSED: Stopwatch successfully pauses and resumes with progressive counting!\n');

console.log('🎉 ALL TESTS PASSED! Fix is completely verified.');
