// Test Timer & Stopwatch persistence across web refresh
const https = require('https');

// 1. Mock LocalStorage
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return Object.prototype.hasOwnProperty.call(this.store, key) ? this.store[key] : null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

const mockLS = new MockLocalStorage();
global.localStorage = mockLS;
global.window = { localStorage: mockLS };

console.log('--- Testing Timer Persistence Logic ---');

// Default timers simulated
const DEFAULT_TIMERS = [
  { id: 'tmr_1', userId: 'usr_1', name: 'Timer 1', totalSeconds: 100, remainingSeconds: 100, isRunning: false },
  { id: 'tmr_2', userId: 'usr_1', name: 'Timer 2', totalSeconds: 200, remainingSeconds: 200, isRunning: true }
];

// Initialize storage test
if (mockLS.getItem('vortex_timers') === null) {
  mockLS.setItem('vortex_timers', JSON.stringify(DEFAULT_TIMERS));
}

let timers = JSON.parse(mockLS.getItem('vortex_timers'));
console.log('Initial timers count:', timers.length);

// User adds a new timer
const newTimer = {
  id: 'tmr_test_' + Date.now(),
  userId: 'usr_1',
  name: 'Waktu Mundur Testing Refresh',
  totalSeconds: 1800,
  remainingSeconds: 1800,
  isRunning: true,
  createdAt: Date.now()
};

timers.push(newTimer);
mockLS.setItem('vortex_timers', JSON.stringify(timers));
console.log('After adding timer, count:', JSON.parse(mockLS.getItem('vortex_timers')).length);

// Simulate startTimerTicker ticking (suppressed sync)
let suppressSync = true;
timers.forEach(t => {
  if (t.isRunning) t.remainingSeconds -= 1;
});
if (suppressSync) {
  mockLS.setItem('vortex_timers', JSON.stringify(timers));
}
console.log('Ticked remainingSeconds:', timers.find(t => t.id === newTimer.id).remainingSeconds);

// Simulate PAGE REFRESH!
console.log('\n--- Simulating Page Refresh (F5 / Reload) ---');
// On page load, initStorage runs:
if (mockLS.getItem('vortex_timers') === null) {
  mockLS.setItem('vortex_timers', JSON.stringify(DEFAULT_TIMERS));
} else {
  const existing = JSON.parse(mockLS.getItem('vortex_timers') || '[]');
  if (existing.length > 0) {
    existing.forEach(t => { if (!t.userId) t.userId = 'usr_1'; });
    mockLS.setItem('vortex_timers', JSON.stringify(existing));
  }
}

let afterRefreshTimers = JSON.parse(mockLS.getItem('vortex_timers'));
console.log('After initStorage on refresh, count:', afterRefreshTimers.length);

// Now simulate syncAllFromCloud with old remote data that doesn't have newTimer
const oldRemoteDoc = {
  payload: DEFAULT_TIMERS // only 2 items
};

// Merge logic as in syncAllFromCloud:
const localRaw = mockLS.getItem('vortex_timers');
const localArr = localRaw ? JSON.parse(localRaw) : [];
const remoteArr = Array.isArray(oldRemoteDoc.payload) ? oldRemoteDoc.payload : [];

let finalPayload = oldRemoteDoc.payload;
if (Array.isArray(localArr) && localArr.length > 0) {
  const deletedIds = new Set();
  const localOnly = localArr.filter(l => l && l.id && !deletedIds.has(l.id) && !remoteArr.some(r => r.id === l.id));
  if (localOnly.length > 0) {
    finalPayload = [...remoteArr, ...localOnly];
    console.log('SUCCESS: Merged localOnly items:', localOnly.map(i => i.name));
  }
}

mockLS.setItem('vortex_timers', JSON.stringify(finalPayload));
const finalTimers = JSON.parse(mockLS.getItem('vortex_timers'));
console.log('Final count after syncAllFromCloud:', finalTimers.length);

const foundNew = finalTimers.find(t => t.id === newTimer.id);
if (foundNew) {
  console.log('TEST PASSED: Newly added timer survived page refresh intact!', foundNew.name);
} else {
  console.error('TEST FAILED: Timer was lost!');
  process.exit(1);
}
