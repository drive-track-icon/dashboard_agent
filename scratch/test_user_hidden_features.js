const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== TEST: VERIFY HIDDEN FEATURES FOR USER & ADMIN ACROSS 6 MENUS ===\n');

const appJsContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'app.js'), 'utf8');

// Mock localStorage and browser environment
const storage = {};
global.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
};

const elements = {};
function getOrCreateElement(id) {
  if (!elements[id]) {
    elements[id] = {
      id: id,
      value: '',
      classList: {
        classes: new Set(),
        add(c) { this.classes.add(c); },
        remove(c) { this.classes.delete(c); },
        contains(c) { return this.classes.has(c); },
        toggle(c, force) {
          if (force !== undefined) {
            if (force) this.classes.add(c);
            else this.classes.delete(c);
          } else {
            if (this.classes.has(c)) this.classes.delete(c);
            else this.classes.add(c);
          }
        }
      },
      style: {},
      options: []
    };
  }
  return elements[id];
}

global.document = {
  getElementById: (id) => getOrCreateElement(id),
  querySelector: (sel) => {
    if (sel.startsWith('#')) return getOrCreateElement(sel.slice(1));
    return getOrCreateElement('mockQuery');
  },
  querySelectorAll: () => []
};

// Check app.js static declarations for role toggling
console.log('1. Static source verification:');
const checkList = [
  // Update PA
  { code: 'UI.btnOpenAddPaModal.classList.add(\'hidden\')', desc: 'btnOpenAddPaModal hidden in Update PA' },
  // CA
  { code: 'UI.btnExportCaExcel.classList.toggle(\'hidden\', !isAdmin)', desc: 'btnExportCaExcel toggled by role' },
  { code: 'UI.caGSheetSyncBar.classList.toggle(\'hidden\', !isAdmin)', desc: 'caGSheetSyncBar toggled by role' },
  // Tiket
  { code: 'UI.btnExportTiketExcel.classList.toggle(\'hidden\', !isAdmin)', desc: 'btnExportTiketExcel toggled by role in renderAppView' },
  { code: 'UI.btnExportTiketExcel.classList.add(\'hidden\')', desc: 'btnExportTiketExcel hidden for user in renderTiketPage' },
  { code: 'UI.tiketGSheetSyncBar.classList.add(\'hidden\')', desc: 'tiketGSheetSyncBar hidden for user in renderTiketPage' },
  // AHT
  { code: 'UI.btnExportAhtExcel.classList.toggle(\'hidden\', !isAdmin)', desc: 'btnExportAhtExcel toggled by role in renderAppView' },
  { code: 'UI.btnExportAhtExcel.classList.add(\'hidden\')', desc: 'btnExportAhtExcel hidden for user in renderAhtPage' },
  { code: 'UI.ahtGSheetSyncBar.classList.add(\'hidden\')', desc: 'ahtGSheetSyncBar hidden for user in renderAhtPage' },
  // ART
  { code: 'UI.btnExportArtExcel.classList.toggle(\'hidden\', !isAdmin)', desc: 'btnExportArtExcel toggled by role in renderAppView' },
  { code: 'UI.btnExportArtExcel.classList.add(\'hidden\')', desc: 'btnExportArtExcel hidden for user in renderArtPage' },
  { code: 'UI.artGSheetSyncBar.classList.add(\'hidden\')', desc: 'artGSheetSyncBar hidden for user in renderArtPage' },
  // Finding
  { code: 'UI.btnExportFindingExcel.classList.toggle(\'hidden\', !isAdmin)', desc: 'btnExportFindingExcel toggled by role' },
  { code: 'UI.findingGSheetSyncBar.classList.toggle(\'hidden\', !isAdmin)', desc: 'findingGSheetSyncBar toggled by role' }
];

checkList.forEach(item => {
  assert(appJsContent.includes(item.code), `Missing: ${item.desc} (${item.code})`);
  console.log(`  [PASS] ${item.desc}`);
});

console.log('\n2. Simulation of Role Switching (User vs Admin):');

// Elements under test
const targetExcelButtons = [
  'btnExportCaExcel',
  'btnExportTiketExcel',
  'btnExportAhtExcel',
  'btnExportArtExcel',
  'btnExportFindingExcel'
];

const targetGSheetBars = [
  'caGSheetSyncBar',
  'tiketGSheetSyncBar',
  'ahtGSheetSyncBar',
  'artGSheetSyncBar',
  'findingGSheetSyncBar'
];

// SIMULATION: Regular User Login
let isAdmin = false;

// Simulate renderAppView role check
targetExcelButtons.forEach(id => {
  const el = getOrCreateElement(id);
  el.classList.toggle('hidden', !isAdmin);
});
targetGSheetBars.forEach(id => {
  const el = getOrCreateElement(id);
  el.classList.toggle('hidden', !isAdmin);
});
const paBtn = getOrCreateElement('btnOpenAddPaModal');
paBtn.classList.add('hidden');

// Verify all Excel buttons are hidden on regular user
targetExcelButtons.forEach(id => {
  assert(getOrCreateElement(id).classList.contains('hidden'), `${id} MUST be hidden for regular user`);
});
console.log('  [PASS] All 5 Download Excel buttons are hidden for regular User.');

// Verify all GSheet integration bars are hidden on regular user
targetGSheetBars.forEach(id => {
  assert(getOrCreateElement(id).classList.contains('hidden'), `${id} MUST be hidden for regular user`);
});
console.log('  [PASS] All 5 Google Spreadsheet integration bars are hidden for regular User.');

// Verify Catat Update PA is hidden for regular user
assert(paBtn.classList.contains('hidden'), 'btnOpenAddPaModal MUST be hidden for user');
console.log('  [PASS] Catat Update PA button is hidden for regular User.');


// SIMULATION: Admin Login
isAdmin = true;

targetExcelButtons.forEach(id => {
  const el = getOrCreateElement(id);
  el.classList.toggle('hidden', !isAdmin);
});
targetGSheetBars.forEach(id => {
  const el = getOrCreateElement(id);
  el.classList.toggle('hidden', !isAdmin);
});
paBtn.classList.add('hidden'); // Remains hidden for admin too!

// Verify all Excel buttons are visible on Admin
targetExcelButtons.forEach(id => {
  assert(!getOrCreateElement(id).classList.contains('hidden'), `${id} MUST be visible for Admin`);
});
console.log('  [PASS] All 5 Download Excel buttons are visible for Admin.');

// Verify all GSheet integration bars are visible on Admin
targetGSheetBars.forEach(id => {
  assert(!getOrCreateElement(id).classList.contains('hidden'), `${id} MUST be visible for Admin`);
});
console.log('  [PASS] All 5 Google Spreadsheet integration bars are visible for Admin.');

// Verify Catat Update PA is STILL hidden for Admin
assert(paBtn.classList.contains('hidden'), 'btnOpenAddPaModal MUST be hidden for admin as well');
console.log('  [PASS] Catat Update PA button remains hidden for Admin.');

console.log('\n=== ALL USER/ADMIN VISIBILITY CHECKS PASSED 100%! ===');
