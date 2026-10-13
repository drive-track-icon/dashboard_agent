// Comprehensive Persistence & Anti-Reset Stability Test Suite
const assert = require('assert');

// Mock localStorage and sessionStorage
const createStorageMock = () => {
  let store = {};
  return {
    getItem(k) { return Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null; },
    setItem(k, v) { store[k] = String(v); },
    removeItem(k) { delete store[k]; },
    clear() { store = {}; },
    _dump() { return { ...store }; }
  };
};

const mockLocalStorage = createStorageMock();
const mockSessionStorage = createStorageMock();

global.localStorage = mockLocalStorage;
global.sessionStorage = mockSessionStorage;
global.window = {
  localStorage: mockLocalStorage,
  sessionStorage: mockSessionStorage,
  addEventListener: () => {}
};

// Mock defaults
const DEFAULT_USERS = [{ id: 'usr_1', username: 'admin', fullName: 'Admin' }];
const DEFAULT_ITEMS = [{ id: 'item_1', name: 'Barang Default' }];
const DEFAULT_LOGS = [{ id: 'log_1', action: 'INIT' }];
const DEFAULT_TIMERS = [{ id: 'tm_1', title: 'Timer 1' }];
const DEFAULT_STOPWATCHES = [{ id: 'sw_1', title: 'SW 1' }];
const DEFAULT_PA_LOGS = [{ id: 'pa_1' }, { id: 'pa_6' }];
const DEFAULT_CA_LOGS = Array.from({ length: 15 }, (_, i) => ({ id: `ca_${i}`, score: 85.5 }));
const DEFAULT_TIKETS = Array.from({ length: 25 }, (_, i) => ({ id: `tk_${i}`, ticketCount: 50 }));
const DEFAULT_AHT_LOGS = [{ id: 'aht_1', date: '2026-09-01' }];
const DEFAULT_ART_LOGS = [{ id: 'art_1', date: '2026-09-01' }];
const DEFAULT_FINDINGS = [{ id: 'fnd_1', userFullName: 'Siti Rahma' }];
const DEFAULT_QUIZ_QUESTIONS = [{ id: 'qz_1', question: 'Q1' }];

class MockAppState {
  constructor() {
    this.initStorage();
  }

  safeGetStorage(key, fallback = []) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        try {
          const backup = sessionStorage.getItem('backup_' + key);
          if (backup) {
            const parsedBackup = JSON.parse(backup);
            if (parsedBackup !== null && parsedBackup !== undefined) {
              localStorage.setItem(key, backup);
              return parsedBackup;
            }
          }
        } catch (e) {}
        return fallback;
      }
      const parsed = JSON.parse(raw);
      return (parsed !== null && parsed !== undefined) ? parsed : fallback;
    } catch (e) {
      try {
        const backup = sessionStorage.getItem('backup_' + key);
        if (backup) return JSON.parse(backup);
      } catch (err) {}
      return fallback;
    }
  }

  safeSetStorage(key, value) {
    try {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, serialized);
      try {
        sessionStorage.setItem('backup_' + key, serialized);
      } catch (e) {}
      return true;
    } catch (e) {
      try {
        sessionStorage.setItem('backup_' + key, JSON.stringify(value));
      } catch (err) {}
      return false;
    }
  }

  initStorage() {
    const isAlreadyInitialized = localStorage.getItem('vortex_data_initialized') === 'true';

    if (!isAlreadyInitialized) {
      if (localStorage.getItem('vortex_users') === null) {
        localStorage.setItem('vortex_users', JSON.stringify(DEFAULT_USERS));
      }
      if (localStorage.getItem('vortex_items') === null) {
        localStorage.setItem('vortex_items', JSON.stringify(DEFAULT_ITEMS));
      }
      if (localStorage.getItem('vortex_logs') === null) {
        localStorage.setItem('vortex_logs', JSON.stringify(DEFAULT_LOGS));
      }
      if (localStorage.getItem('vortex_pa_logs') === null) {
        localStorage.setItem('vortex_pa_logs', JSON.stringify(DEFAULT_PA_LOGS));
      }
      if (localStorage.getItem('vortex_ca_logs') === null) {
        localStorage.setItem('vortex_ca_logs', JSON.stringify(DEFAULT_CA_LOGS));
      }
      if (localStorage.getItem('vortex_tikets') === null) {
        localStorage.setItem('vortex_tikets', JSON.stringify(DEFAULT_TIKETS));
      }
      if (localStorage.getItem('vortex_aht_logs') === null) {
        localStorage.setItem('vortex_aht_logs', JSON.stringify(DEFAULT_AHT_LOGS));
      }
      if (localStorage.getItem('vortex_art_logs') === null) {
        localStorage.setItem('vortex_art_logs', JSON.stringify(DEFAULT_ART_LOGS));
      }
      if (localStorage.getItem('vortex_findings') === null) {
        localStorage.setItem('vortex_findings', JSON.stringify(DEFAULT_FINDINGS));
      }
      if (localStorage.getItem('vortex_quiz_questions') === null) {
        localStorage.setItem('vortex_quiz_questions', JSON.stringify(DEFAULT_QUIZ_QUESTIONS));
      }
      if (localStorage.getItem('vortex_timers') === null) {
        localStorage.setItem('vortex_timers', JSON.stringify(DEFAULT_TIMERS));
      }
      if (localStorage.getItem('vortex_stopwatches') === null) {
        localStorage.setItem('vortex_stopwatches', JSON.stringify(DEFAULT_STOPWATCHES));
      }
      localStorage.setItem('vortex_data_initialized', 'true');
    } else {
      const criticalKeys = [
        'vortex_users', 'vortex_items', 'vortex_logs', 'vortex_pa_logs',
        'vortex_ca_logs', 'vortex_tikets', 'vortex_aht_logs', 'vortex_art_logs',
        'vortex_findings', 'vortex_quiz_questions', 'vortex_timers', 'vortex_stopwatches'
      ];
      criticalKeys.forEach(k => {
        if (localStorage.getItem(k) === null) {
          localStorage.setItem(k, '[]');
        }
      });
    }
  }

  getPaLogs() { return this.safeGetStorage('vortex_pa_logs', []); }
  savePaLogs(v) { this.safeSetStorage('vortex_pa_logs', v); }

  getCaLogs() { return this.safeGetStorage('vortex_ca_logs', []); }
  saveCaLogs(v) { this.safeSetStorage('vortex_ca_logs', v); }

  getTikets() { return this.safeGetStorage('vortex_tikets', []); }
  saveTikets(v) { this.safeSetStorage('vortex_tikets', v); }

  getAhtLogs() { return this.safeGetStorage('vortex_aht_logs', []); }
  saveAhtLogs(v) { this.safeSetStorage('vortex_aht_logs', v); }

  getArtLogs() { return this.safeGetStorage('vortex_art_logs', []); }
  saveArtLogs(v) { this.safeSetStorage('vortex_art_logs', v); }
}

console.log('--- TEST 1: First Run seeds defaults and sets vortex_data_initialized ---');
const app1 = new MockAppState();
assert.strictEqual(localStorage.getItem('vortex_data_initialized'), 'true');
assert.strictEqual(app1.getPaLogs().length, 2);
assert.strictEqual(app1.getCaLogs().length, 15);
assert.strictEqual(app1.getTikets().length, 25);
console.log('✓ First-time seed OK');

console.log('\n--- TEST 2: User customizes data (removes items / modifies collections) ---');
// User deletes pa_6 and replaces PA logs with 1 custom item
app1.savePaLogs([{ id: 'custom_pa_1', author: 'Budi' }]);
assert.strictEqual(app1.getPaLogs().length, 1);
assert.strictEqual(app1.getPaLogs()[0].id, 'custom_pa_1');

// User trims CA logs down to 2 logs (less than 10)
app1.saveCaLogs([{ id: 'custom_ca_1', score: 100 }, { id: 'custom_ca_2', score: 95 }]);
assert.strictEqual(app1.getCaLogs().length, 2);

// User trims Tikets down to 3 tickets (less than 20)
app1.saveTikets([{ id: 'custom_tk_1', ticketCount: 10 }]);
assert.strictEqual(app1.getTikets().length, 1);

// User empties AHT logs
app1.saveAhtLogs([]);
assert.strictEqual(app1.getAhtLogs().length, 0);

console.log('✓ Custom data saved');

console.log('\n--- TEST 3: Web Refresh / Subsequent Access MUST NOT RESET DATA ---');
// Simulate closing browser, opening new tab, or refreshing:
const appRefresh = new MockAppState();

// Verify PA did NOT re-inject pa_6 or DEFAULT_PA_LOGS
const paAfterRefresh = appRefresh.getPaLogs();
console.log('PA after refresh count:', paAfterRefresh.length, 'IDs:', paAfterRefresh.map(p => p.id));
assert.strictEqual(paAfterRefresh.length, 1, 'PA must maintain custom count');
assert.strictEqual(paAfterRefresh[0].id, 'custom_pa_1');
assert.strictEqual(paAfterRefresh.some(p => p.id === 'pa_6'), false, 'pa_6 must NOT resurrect');

// Verify CA did NOT reset to 15 items
const caAfterRefresh = appRefresh.getCaLogs();
console.log('CA after refresh count:', caAfterRefresh.length);
assert.strictEqual(caAfterRefresh.length, 2, 'CA must not reset to default 15 items');

// Verify Tiket did NOT reset to 25 items
const tiketAfterRefresh = appRefresh.getTikets();
console.log('Tiket after refresh count:', tiketAfterRefresh.length);
assert.strictEqual(tiketAfterRefresh.length, 1, 'Tikets must not reset to default 25 items');

// Verify AHT did NOT reset from empty array
const ahtAfterRefresh = appRefresh.getAhtLogs();
console.log('AHT after refresh count:', ahtAfterRefresh.length);
assert.strictEqual(ahtAfterRefresh.length, 0, 'AHT must stay empty as customized');

console.log('✓ NO UNWANTED RESETS! Data perfectly preserved on access/refresh!');

console.log('\n--- TEST 4: Safe Storage Resilience against Corrupted JSON ---');
// Inject malformed JSON into localStorage
localStorage.setItem('vortex_pa_logs', '{ bad json ...');
// Should safely return fallback instead of crashing
const safePa = appRefresh.getPaLogs();
console.log('Corrupt JSON fallback handled smoothly, returned length:', safePa.length);
assert.ok(Array.isArray(safePa), 'Must return valid array even with corrupt data');

console.log('\n--- TEST 5: Cloud Merge Protection (Offline Additions Preserved) ---');
// Simulate Cloud having remote data and local having new offline item
const remoteCloudCa = [{ id: 'ca_cloud_1', score: 88 }];
const localCa = [{ id: 'ca_cloud_1', score: 88 }, { id: 'ca_local_offline', score: 92 }];
const deletedIds = new Set();

const localOnly = localCa.filter(l => l && l.id && !deletedIds.has(l.id) && !remoteCloudCa.some(r => r.id === l.id));
const merged = [...remoteCloudCa, ...localOnly];
console.log('Merged Cloud count:', merged.length, 'IDs:', merged.map(m => m.id));
assert.strictEqual(merged.length, 2);
assert.strictEqual(merged.some(m => m.id === 'ca_local_offline'), true);
console.log('✓ Offline local items successfully protected and merged!');

console.log('\n=== ALL PERSISTENCE AND STABILITY TESTS PASSED WITH 100% SUCCESS! ===');
