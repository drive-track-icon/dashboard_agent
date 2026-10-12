const assert = require('assert');

// Mock browser environment
const localStorageMock = {};
global.localStorage = {
  getItem: (k) => localStorageMock[k] || null,
  setItem: (k, v) => { localStorageMock[k] = String(v); },
  removeItem: (k) => { delete localStorageMock[k]; }
};

global.window = {
  DRIVE_FIREBASE_CONFIG: {
    apiKey: "test-api-key",
    projectId: "test-project-id"
  }
};
global.document = {
  addEventListener: () => {},
  getElementById: () => null
};

// Load firebase-sync.js
require('../js/firebase-sync.js');

const fs = global.window.FirebaseSync;
assert.ok(fs, 'FirebaseSync manager exists');

// Test getConfig
const cfg = fs.getConfig();
assert.strictEqual(cfg.projectId, 'test-project-id', 'Correctly reads projectId');

// Test attachSaveHooks
let changeNotified = false;
let changedKey = '';
let changedData = null;
fs.notifyDataChanged = (key, data) => {
  changeNotified = true;
  changedKey = key;
  changedData = data;
};

const mockState = {
  saveUsers(users) {
    this._users = users;
  },
  saveTikets(tikets) {
    this._tikets = tikets;
  }
};

fs.attachSaveHooks(mockState);

// Trigger saveUsers
mockState.saveUsers([{ id: 1, name: 'Budi' }]);
assert.strictEqual(changeNotified, true, 'notifyDataChanged triggered on saveUsers');
assert.strictEqual(changedKey, 'vortex_users', 'Correct key passed for saveUsers');
assert.deepStrictEqual(changedData, [{ id: 1, name: 'Budi' }], 'Correct data passed');

// Trigger saveTikets
changeNotified = false;
mockState.saveTikets([{ id: 'TK-1', count: 50 }]);
assert.strictEqual(changeNotified, true, 'notifyDataChanged triggered on saveTikets');
assert.strictEqual(changedKey, 'vortex_tikets', 'Correct key passed for saveTikets');

console.log('✅ ALL FIREBASE SYNC HOOK TESTS PASSED SUCCESSFULLY!');
