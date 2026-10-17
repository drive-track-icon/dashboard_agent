const assert = require('assert');
const fs = require('fs');

console.log('=== TEST: DIRECTLY TESTING JS/APP.JS ON PAUSE & RESUME ===\n');

const storage = {};
global.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; }
};

let mockedNow = 5000000;
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

// Read actual js/app.js and extract the functions
const appCode = fs.readFileSync('js/app.js', 'utf8');

eval(appCode.match(/function formatSecondsToHMS[\s\S]*?\n\}/)[0]);
eval(appCode.match(/window\.getTimerRemainingSeconds = function[\s\S]*?\n\};/)[0]);
eval(appCode.match(/window\.getStopwatchElapsedSeconds = function[\s\S]*?\n\};/)[0]);
eval(appCode.match(/window\.toggleTimerRunning = function[\s\S]*?\n\};/)[0]);
eval(appCode.match(/window\.toggleStopwatchRunning = function[\s\S]*?\n\};/)[0]);
eval(appCode.match(/window\.resetTimer = function[\s\S]*?\n\};/)[0]);
eval(appCode.match(/window\.resetStopwatch = function[\s\S]*?\n\};/)[0]);

// Test 1: Timer Countdown
console.log('--- TEST 1: Countdown Timer in js/app.js ---');
const t1 = {
  id: 'tmr_1',
  userId: 'usr_test',
  name: 'Test Countdown',
  totalSeconds: 300,
  remainingSeconds: 300,
  isRunning: true,
  startedAt: mockedNow,
  targetEndTime: mockedNow + 300000
};
state.saveTimers([t1]);

// 1. Run 10s
mockedNow += 10000;
assert.strictEqual(window.getTimerRemainingSeconds(state.getTimers()[0]), 290);
console.log('✓ 10s running -> 290s remaining');

// 2. Pause
window.toggleTimerRunning('tmr_1');
let savedT = state.getTimers()[0];
assert.strictEqual(savedT.isRunning, false);
assert.strictEqual(savedT.remainingSeconds, 290);
assert.strictEqual(window.getTimerRemainingSeconds(savedT), 290);
console.log('✓ Paused -> freezes at 290s (saved remainingSeconds: 290)');

// 3. Wait 10s while paused
mockedNow += 10000;
assert.strictEqual(window.getTimerRemainingSeconds(state.getTimers()[0]), 290);
console.log('✓ Time elapsed while paused -> remains 290s');

// 4. Resume
window.toggleTimerRunning('tmr_1');
savedT = state.getTimers()[0];
assert.strictEqual(savedT.isRunning, true);
assert.strictEqual(window.getTimerRemainingSeconds(savedT), 290);
console.log('✓ Resumed -> starts counting down from 290s');

// 5. Run 20s
mockedNow += 20000;
assert.strictEqual(window.getTimerRemainingSeconds(state.getTimers()[0]), 270);
console.log('✓ 20s running -> 270s remaining (COUNTING DOWNWARD, NO RESET!)');

// Test 2: Stopwatch
console.log('\n--- TEST 2: Stopwatch in js/app.js ---');
const sw1 = {
  id: 'sw_1',
  userId: 'usr_test',
  name: 'Test SW',
  elapsedSeconds: 0,
  accumulatedSeconds: 0,
  isRunning: true,
  startedAt: mockedNow
};
state.saveStopwatches([sw1]);

// 1. Run 40s
mockedNow += 40000;
assert.strictEqual(window.getStopwatchElapsedSeconds(state.getStopwatches()[0]), 40);
console.log('✓ 40s running -> 40s elapsed');

// 2. Pause
window.toggleStopwatchRunning('sw_1');
let savedSw = state.getStopwatches()[0];
assert.strictEqual(savedSw.isRunning, false);
assert.strictEqual(savedSw.elapsedSeconds, 40);
assert.strictEqual(savedSw.accumulatedSeconds, 40);
assert.strictEqual(window.getStopwatchElapsedSeconds(savedSw), 40);
console.log('✓ Paused -> freezes at 40s (saved elapsed: 40)');

// 3. Wait 10s while paused
mockedNow += 10000;
assert.strictEqual(window.getStopwatchElapsedSeconds(state.getStopwatches()[0]), 40);
console.log('✓ Time elapsed while paused -> remains 40s');

// 4. Resume
window.toggleStopwatchRunning('sw_1');
savedSw = state.getStopwatches()[0];
assert.strictEqual(savedSw.isRunning, true);
assert.strictEqual(window.getStopwatchElapsedSeconds(savedSw), 40);
console.log('✓ Resumed -> starts counting up from 40s');

// 5. Run 15s
mockedNow += 15000;
assert.strictEqual(window.getStopwatchElapsedSeconds(state.getStopwatches()[0]), 55);
console.log('✓ 15s running -> 55s elapsed (COUNTING UPWARD, NO RESET!)');

console.log('\n🎉 ALL CHECKS PASSED ON ACTUAL JS/APP.JS!');
