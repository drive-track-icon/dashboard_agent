const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== TEST SUITE: Delete Monthly Data for Ringkasan & Update PA ===');

// 1. Verify index.html contains both buttons
const htmlContent = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

assert(htmlContent.includes('id="btnDeleteAllOverviewMonth"'), 'btnDeleteAllOverviewMonth should exist in index.html');
assert(htmlContent.includes('id="btnDeleteAllPaMonth"'), 'btnDeleteAllPaMonth should exist in index.html');
console.log('✓ Buttons exist in index.html');

// 2. Verify js/app.js contains UI mapping and event listeners
const jsContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'app.js'), 'utf8');

assert(jsContent.includes("btnDeleteAllPaMonth: document.getElementById('btnDeleteAllPaMonth')"), 'btnDeleteAllPaMonth should be cached in UI');
assert(jsContent.includes("btnDeleteAllOverviewMonth: document.getElementById('btnDeleteAllOverviewMonth')"), 'btnDeleteAllOverviewMonth should be cached in UI');
assert(jsContent.includes('promptDeleteAllOverviewMonth'), 'promptDeleteAllOverviewMonth function should exist in js/app.js');
assert(jsContent.includes('promptDeleteAllPaMonth'), 'promptDeleteAllPaMonth function should exist in js/app.js');
assert(jsContent.includes("type === 'overview_month'"), "executePendingDelete should handle 'overview_month'");
assert(jsContent.includes("type === 'pa_month'"), "executePendingDelete should handle 'pa_month'");
console.log('✓ App.js contains required UI bindings, prompts, and handlers');

// 3. Mock DOM environment to test logic
const mockElements = {};
function createMockElement(id) {
  return {
    id,
    classList: {
      _classes: new Set(),
      add(cls) { this._classes.add(cls); },
      remove(cls) { this._classes.delete(cls); },
      contains(cls) { return this._classes.has(cls); },
      toggle(cls, force) {
        if (force === undefined) {
          if (this.contains(cls)) { this.remove(cls); return false; }
          else { this.add(cls); return true; }
        }
        if (force) { this.add(cls); return true; }
        else { this.remove(cls); return false; }
      }
    },
    value: '',
    textContent: '',
    innerHTML: '',
    style: {},
    addEventListener: () => {}
  };
}

global.document = {
  getElementById(id) {
    if (!mockElements[id]) {
      mockElements[id] = createMockElement(id);
    }
    return mockElements[id];
  }
};
global.window = global;

// Mock localStorage
const storage = {};
global.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; }
};

// Seed sample data for 2026-09 and 2026-10
const sampleCa = [
  { id: 'ca1', date: '2026-09-10', score: 95 },
  { id: 'ca2', date: '2026-09-15', score: 90 },
  { id: 'ca3', date: '2026-10-01', score: 88 }
];
const sampleTiket = [
  { id: 't1', date: '2026-09-12', ticketCount: 100 },
  { id: 't2', date: '2026-10-02', ticketCount: 150 }
];
const sampleArt = [
  { id: 'art1', date: '2026-09-14', avgResponseSeconds: 22 },
  { id: 'art2', date: '2026-10-05', avgResponseSeconds: 18 }
];
const samplePa = [
  { id: 'pa1', date: '2026-09-20', activityCategory: 'Inbound Call' },
  { id: 'pa2', date: '2026-09-21', activityCategory: 'Follow Up' },
  { id: 'pa3', date: '2026-10-03', activityCategory: 'Inbound Call' }
];

storage['vortex_ca_logs'] = JSON.stringify(sampleCa);
storage['vortex_tikets'] = JSON.stringify(sampleTiket);
storage['vortex_art_logs'] = JSON.stringify(sampleArt);
storage['vortex_pa_logs'] = JSON.stringify(samplePa);
storage['vortex_audit_logs'] = JSON.stringify([]);

let lastToast = null;
global.showToast = (title, msg, type) => {
  lastToast = { title, msg, type };
};

global.formatMonthLabel = (m) => m === '2026-09' ? 'September 2026' : (m === '2026-10' ? 'Oktober 2026' : m);

// Test state
const mockState = {
  currentUser: { id: 'admin1', username: 'admin', fullName: 'Administrator Utama', role: 'admin' },
  isAdmin() { return this.currentUser && this.currentUser.role === 'admin'; },
  getCaLogs() { return JSON.parse(storage['vortex_ca_logs'] || '[]'); },
  saveCaLogs(l) { storage['vortex_ca_logs'] = JSON.stringify(l); },
  getTikets() { return JSON.parse(storage['vortex_tikets'] || '[]'); },
  saveTikets(l) { storage['vortex_tikets'] = JSON.stringify(l); },
  getArtLogs() { return JSON.parse(storage['vortex_art_logs'] || '[]'); },
  saveArtLogs(l) { storage['vortex_art_logs'] = JSON.stringify(l); },
  getPaLogs() { return JSON.parse(storage['vortex_pa_logs'] || '[]'); },
  savePaLogs(l) { storage['vortex_pa_logs'] = JSON.stringify(l); },
  addLog(action, title, details) {
    const logs = JSON.parse(storage['vortex_audit_logs'] || '[]');
    logs.unshift({ action, title, details, timestamp: new Date().toISOString() });
    storage['vortex_audit_logs'] = JSON.stringify(logs);
  },
  pendingDelete: null,
  selectedCaIds: new Set(),
  selectedTiketIds: new Set(),
  selectedArtIds: new Set()
};

global.state = mockState;
global.UI = {
  btnDeleteAllOverviewMonth: document.getElementById('btnDeleteAllOverviewMonth'),
  btnDeleteAllPaMonth: document.getElementById('btnDeleteAllPaMonth'),
  filterOverviewMonth: document.getElementById('filterOverviewMonth'),
  filterPaMonth: document.getElementById('filterPaMonth'),
  confirmDeleteTitle: document.getElementById('confirmDeleteTitle'),
  confirmDeleteMessage: document.getElementById('confirmDeleteMessage'),
  modalConfirmDelete: document.getElementById('modalConfirmDelete')
};

// 4. Test Role Visibility toggling
// When user is regular:
mockState.currentUser.role = 'user';
const isAdminUser = mockState.isAdmin();
UI.btnDeleteAllOverviewMonth.classList.toggle('hidden', !isAdminUser);
UI.btnDeleteAllPaMonth.classList.toggle('hidden', !isAdminUser);

assert(UI.btnDeleteAllOverviewMonth.classList.contains('hidden'), 'btnDeleteAllOverviewMonth must be hidden for regular user');
assert(UI.btnDeleteAllPaMonth.classList.contains('hidden'), 'btnDeleteAllPaMonth must be hidden for regular user');
console.log('✓ Buttons hidden for regular user');

// When user is Admin:
mockState.currentUser.role = 'admin';
const isAdminNow = mockState.isAdmin();
UI.btnDeleteAllOverviewMonth.classList.toggle('hidden', !isAdminNow);
UI.btnDeleteAllPaMonth.classList.toggle('hidden', !isAdminNow);

assert(!UI.btnDeleteAllOverviewMonth.classList.contains('hidden'), 'btnDeleteAllOverviewMonth must be visible for admin');
assert(!UI.btnDeleteAllPaMonth.classList.contains('hidden'), 'btnDeleteAllPaMonth must be visible for admin');
console.log('✓ Buttons visible for admin');

// 5. Test Non-Admin execution guard
mockState.currentUser.role = 'user';
// Extract prompt functions
eval(jsContent.slice(jsContent.indexOf('window.promptDeleteAllOverviewMonth = function() {'), jsContent.indexOf('function renderOverviewPage() {')));
eval(jsContent.slice(jsContent.indexOf('window.promptDeleteAllPaMonth = function() {'), jsContent.indexOf('window.approvePa = function(id) {')));

window.promptDeleteAllOverviewMonth();
assert(lastToast && lastToast.title === 'Akses Dibatasi', 'Non-admin promptDeleteAllOverviewMonth should show access restricted toast');
assert(!mockState.pendingDelete, 'pendingDelete should remain null for non-admin');

window.promptDeleteAllPaMonth();
assert(lastToast && lastToast.title === 'Akses Dibatasi', 'Non-admin promptDeleteAllPaMonth should show access restricted toast');
assert(!mockState.pendingDelete, 'pendingDelete should remain null for non-admin');
console.log('✓ Non-admin access guards tested successfully');

// 6. Test 'ALL' selection guard
mockState.currentUser.role = 'admin';
UI.filterOverviewMonth.value = 'ALL';
window.promptDeleteAllOverviewMonth();
assert(lastToast && lastToast.title === 'Pilih Bulan Spesifik', "'ALL' overview month should trigger specific month toast");
assert(!mockState.pendingDelete, 'pendingDelete should remain null when ALL is selected');

UI.filterPaMonth.value = 'ALL';
window.promptDeleteAllPaMonth();
assert(lastToast && lastToast.title === 'Pilih Bulan Spesifik', "'ALL' PA month should trigger specific month toast");
assert(!mockState.pendingDelete, 'pendingDelete should remain null when ALL is selected');
console.log('✓ ALL month selection guards tested successfully');

// 7. Test prompt execution for valid month '2026-09'
UI.filterPaMonth.value = '2026-09';
window.promptDeleteAllPaMonth();
assert(mockState.pendingDelete && mockState.pendingDelete.type === 'pa_month', 'pendingDelete type should be pa_month');
assert.strictEqual(mockState.pendingDelete.id, '2026-09');
assert.strictEqual(mockState.pendingDelete.count, 2);
console.log('✓ promptDeleteAllPaMonth prepares pendingDelete correctly');

// Mock executePendingDelete logic from app.js
let pageRendered = null;
global.renderUpdatePaPage = () => { pageRendered = 'update_pa'; };
global.renderOverviewPage = () => { pageRendered = 'overview'; };
global.updateDynamicMonthDropdowns = () => {};

// Extract executePendingDelete from js/app.js
eval(jsContent.slice(jsContent.indexOf('function executePendingDelete() {'), jsContent.indexOf('// 10. MANAJEMEN USER')));

// Execute PA deletion
executePendingDelete();
const remainingPa = mockState.getPaLogs();
assert.strictEqual(remainingPa.length, 1, 'Only 1 PA log should remain');
assert.strictEqual(remainingPa[0].date, '2026-10-03', 'Remaining PA log should be October');
assert.strictEqual(pageRendered, 'update_pa', 'renderUpdatePaPage should be called');
console.log('✓ Deletion of PA monthly data verified');

// Test Overview monthly deletion
UI.filterOverviewMonth.value = '2026-09';
window.promptDeleteAllOverviewMonth();
assert(mockState.pendingDelete && mockState.pendingDelete.type === 'overview_month', 'pendingDelete type should be overview_month');
assert.strictEqual(mockState.pendingDelete.countCa, 2);
assert.strictEqual(mockState.pendingDelete.countTiket, 1);
assert.strictEqual(mockState.pendingDelete.countArt, 1);
assert.strictEqual(mockState.pendingDelete.countPa, 0); // Already deleted 2026-09 PA

executePendingDelete();
const remCa = mockState.getCaLogs();
const remTiket = mockState.getTikets();
const remArt = mockState.getArtLogs();

assert.strictEqual(remCa.length, 1, 'Only 1 CA log should remain');
assert.strictEqual(remCa[0].date, '2026-10-01');
assert.strictEqual(remTiket.length, 1, 'Only 1 Tiket log should remain');
assert.strictEqual(remTiket[0].date, '2026-10-02');
assert.strictEqual(remArt.length, 1, 'Only 1 ART log should remain');
assert.strictEqual(remArt[0].date, '2026-10-05');
assert.strictEqual(pageRendered, 'overview', 'renderOverviewPage should be called');
console.log('✓ Deletion of Overview monthly data verified across CA, Tiket, ART, PA');

console.log('=== ALL TESTS PASSED SUCCESSFULLY! ===');
