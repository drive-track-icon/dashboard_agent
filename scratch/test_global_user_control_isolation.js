const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== TEST: GLOBAL USER MENU NAVIGATION & CONTROLS ISOLATION ===\n');

// Mock localStorage and browser environment
const storage = {};
global.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
};

// Mock DOM elements
const elements = {};
function getOrCreateElement(id, tagName = 'input') {
  if (!elements[id]) {
    elements[id] = {
      id: id,
      tagName: tagName.toUpperCase(),
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
      }
    };
  }
  return elements[id];
}

global.document = {
  getElementById: (id) => getOrCreateElement(id),
  querySelectorAll: () => [],
  querySelector: () => null
};

// Load app.js functions under test
const appJsPath = path.resolve(__dirname, '..', 'js', 'app.js');
const appJsCode = fs.readFileSync(appJsPath, 'utf8');

// Test that key isolation system declarations exist in app.js
assert(appJsCode.includes('PAGE_CONTROL_DEFAULTS'), 'PAGE_CONTROL_DEFAULTS must be defined in app.js');
assert(appJsCode.includes('getUserActivePage'), 'getUserActivePage must be defined in app.js');
assert(appJsCode.includes('saveUserActivePage'), 'saveUserActivePage must be defined in app.js');
assert(appJsCode.includes('getUserControls'), 'getUserControls must be defined in app.js');
assert(appJsCode.includes('saveUserControl'), 'saveUserControl must be defined in app.js');
assert(appJsCode.includes('syncUserControlsForPage'), 'syncUserControlsForPage must be defined in app.js');
assert(appJsCode.includes('syncAllUserControls'), 'syncAllUserControls must be defined in app.js');
assert(appJsCode.includes('resetUserControlsForPage'), 'resetUserControlsForPage must be defined in app.js');
console.log('[PASS] Static verification: All isolation helper functions are present in app.js!');

// Extract and evaluate the isolation system functions in a sandbox
const sandbox = {
  localStorage: global.localStorage,
  document: global.document,
  UI: {
    pages: {
      overview: {},
      'update-pa': {},
      ca: {},
      tiket: {},
      aht: {},
      art: {},
      finding: {},
      'data-management': {},
      timer: {},
      'typing-test': {},
      quiz: {},
      'user-management': {},
      'activity-log': {},
      settings: {}
    }
  },
  console: console,
  state: {
    currentUser: null,
    isAdmin() { return this.currentUser && this.currentUser.role === 'admin'; }
  },
  syncOverviewUserPreferences: () => {},
  typingState: { selectedCar: 'lightning', category: 'cs-general' },
  quizState: { activeTab: 'battle' }
};

const vm = require('vm');
vm.createContext(sandbox);

// Execute Section 2.8 isolation code from app.js in sandbox
const section28Start = appJsCode.indexOf('// 2.8 PER-USER ACTIVE MENU & CONTROLS ISOLATION SYSTEM');
const section28End = appJsCode.indexOf('function initTheme()', section28Start);
const section28Code = appJsCode.substring(section28Start, section28End);
vm.runInContext(section28Code, sandbox);

// -------------------------------------------------------------
// TEST 1: MENU NAVIGATION ISOLATION ACROSS MULTIPLE USERS
// -------------------------------------------------------------
console.log('\n--- 1. Testing Menu Navigation Isolation ---');
const userAdmin = { id: 'u-admin', username: 'admin', fullName: 'Administrator', role: 'admin' };
const userBudi = { id: 'u-budi', username: 'budi', fullName: 'Budi Santoso', role: 'user' };
const userSiti = { id: 'u-siti', username: 'siti', fullName: 'Siti Rahma', role: 'user' };

// User Admin navigates to 'ca'
sandbox.state.currentUser = userAdmin;
sandbox.saveUserActivePage(userAdmin, 'ca');

// User Budi logs in (first time) -> must default to 'overview'
sandbox.state.currentUser = userBudi;
assert.strictEqual(sandbox.getUserActivePage(userBudi), 'overview', 'User Budi default page must be overview');
// Budi navigates to 'tiket'
sandbox.saveUserActivePage(userBudi, 'tiket');

// User Siti logs in (first time) -> must default to 'overview'
sandbox.state.currentUser = userSiti;
assert.strictEqual(sandbox.getUserActivePage(userSiti), 'overview', 'User Siti default page must be overview');
// Siti navigates to 'update-pa'
sandbox.saveUserActivePage(userSiti, 'update-pa');

// Verify Admin returns to 'ca', Budi returns to 'tiket', Siti returns to 'update-pa'
assert.strictEqual(sandbox.getUserActivePage(userAdmin), 'ca', 'Admin active page must remain ca');
assert.strictEqual(sandbox.getUserActivePage(userBudi), 'tiket', 'Budi active page must remain tiket');
assert.strictEqual(sandbox.getUserActivePage(userSiti), 'update-pa', 'Siti active page must remain update-pa');
console.log('[PASS] Menu navigation is strictly isolated per user: Admin (ca), Budi (tiket), Siti (update-pa)');

// Verify RBAC protection on navigation: non-admin trying to access user-management
sandbox.saveUserActivePage(userBudi, 'user-management');
assert.strictEqual(sandbox.getUserActivePage(userBudi), 'overview', 'Non-admin cannot resume on admin-only page');
console.log('[PASS] RBAC protection verified: non-admin safely redirected to overview');

// -------------------------------------------------------------
// TEST 2: CONTROLS & FILTERS ISOLATION ACROSS PAGES
// -------------------------------------------------------------
console.log('\n--- 2. Testing Controls & Filters Isolation ---');

// Case A: Page Update PA
sandbox.saveUserControl('searchPaInput', 'audit internal', userAdmin);
sandbox.saveUserControl('filterPaShift', 'Pagi', userAdmin);
sandbox.saveUserControl('filterPaService', 'CSO INBOUND', userAdmin);

sandbox.saveUserControl('searchPaInput', 'rekap tiket', userBudi);
sandbox.saveUserControl('filterPaShift', 'Malam', userBudi);
sandbox.saveUserControl('filterPaService', 'CSO OUTBOUND', userBudi);

// Verify Admin controls
assert.strictEqual(sandbox.getUserControlValue('searchPaInput', '', userAdmin), 'audit internal');
assert.strictEqual(sandbox.getUserControlValue('filterPaShift', 'ALL', userAdmin), 'Pagi');
assert.strictEqual(sandbox.getUserControlValue('filterPaService', 'ALL', userAdmin), 'CSO INBOUND');

// Verify Budi controls
assert.strictEqual(sandbox.getUserControlValue('searchPaInput', '', userBudi), 'rekap tiket');
assert.strictEqual(sandbox.getUserControlValue('filterPaShift', 'ALL', userBudi), 'Malam');
assert.strictEqual(sandbox.getUserControlValue('filterPaService', 'ALL', userBudi), 'CSO OUTBOUND');

// Verify Siti (untouched) has clean defaults
assert.strictEqual(sandbox.getUserControlValue('searchPaInput', '', userSiti), '');
assert.strictEqual(sandbox.getUserControlValue('filterPaShift', 'ALL', userSiti), 'ALL');
assert.strictEqual(sandbox.getUserControlValue('filterPaService', 'ALL', userSiti), 'ALL');
console.log('[PASS] Update PA controls: Admin, Budi, and Siti maintain completely independent filters');

// Case B: Page CA (Customer Attributes)
sandbox.saveUserControl('filterCaMonth', '2026-08', userAdmin);
sandbox.saveUserControl('filterCaGrade', 'Sangat Baik', userAdmin);
sandbox.saveUserControl('filterCaScoreSort', 'SCORE_DESC', userAdmin);

sandbox.saveUserControl('filterCaMonth', '2026-07', userBudi);
sandbox.saveUserControl('filterCaGrade', 'Perlu Coaching', userBudi);
sandbox.saveUserControl('filterCaScoreSort', 'DATE_DESC', userBudi);

assert.strictEqual(sandbox.getUserControlValue('filterCaMonth', '2026-09', userAdmin), '2026-08');
assert.strictEqual(sandbox.getUserControlValue('filterCaGrade', 'ALL', userAdmin), 'Sangat Baik');
assert.strictEqual(sandbox.getUserControlValue('filterCaScoreSort', 'DATE_DESC', userAdmin), 'SCORE_DESC');

assert.strictEqual(sandbox.getUserControlValue('filterCaMonth', '2026-09', userBudi), '2026-07');
assert.strictEqual(sandbox.getUserControlValue('filterCaGrade', 'ALL', userBudi), 'Perlu Coaching');
assert.strictEqual(sandbox.getUserControlValue('filterCaScoreSort', 'DATE_DESC', userBudi), 'DATE_DESC');

assert.strictEqual(sandbox.getUserControlValue('filterCaMonth', '2026-09', userSiti), '2026-09');
assert.strictEqual(sandbox.getUserControlValue('filterCaGrade', 'ALL', userSiti), 'ALL');
console.log('[PASS] CA controls: independent month, grade, and sort order per user');

// Case C: Page Tiket
sandbox.saveUserControl('filterTiketMonth', '2026-08', userAdmin);
sandbox.saveUserControl('filterTiketSummarySort', 'DIFF_DESC', userAdmin);

sandbox.saveUserControl('filterTiketMonth', '2026-07', userSiti);
sandbox.saveUserControl('filterTiketSummarySort', 'COUNT_ASC', userSiti);

assert.strictEqual(sandbox.getUserControlValue('filterTiketMonth', '2026-09', userAdmin), '2026-08');
assert.strictEqual(sandbox.getUserControlValue('filterTiketMonth', '2026-09', userSiti), '2026-07');
assert.strictEqual(sandbox.getUserControlValue('filterTiketMonth', '2026-09', userBudi), '2026-09');
console.log('[PASS] Tiket controls: independent month & summary sort per user');

// Case D: Page Data Management
sandbox.saveUserControl('filterCategory', 'Elektronik', userAdmin);
sandbox.saveUserControl('dataSortField', 'price', userAdmin);
sandbox.saveUserControl('dataSortOrder', 'desc', userAdmin);
sandbox.saveUserControl('dataCurrentPage', 3, userAdmin);

sandbox.state.currentUser = userAdmin;
sandbox.syncUserControlsForPage('data-management', userAdmin);
assert.strictEqual(sandbox.state.selectedCategory, 'Elektronik');
assert.strictEqual(sandbox.state.sortField, 'price');
assert.strictEqual(sandbox.state.sortOrder, 'desc');
assert.strictEqual(sandbox.state.currentDataPage, 3);

// Switch to User Budi and sync Data Management
sandbox.state.currentUser = userBudi;
sandbox.syncUserControlsForPage('data-management', userBudi);
assert.strictEqual(sandbox.state.selectedCategory, 'ALL');
assert.strictEqual(sandbox.state.sortField, 'code');
assert.strictEqual(sandbox.state.sortOrder, 'asc');
assert.strictEqual(sandbox.state.currentDataPage, 1);
console.log('[PASS] Data Management state: Admin is on page 3 / Elektronik / price desc; Budi is on page 1 / ALL / code asc');

// Case E: Page Quiz
sandbox.saveUserControl('quizActiveTab', 'leaderboard', userAdmin);
sandbox.saveUserControl('selectQuizHero', 'hero_zero', userAdmin);

sandbox.saveUserControl('quizActiveTab', 'battle', userBudi);
sandbox.saveUserControl('selectQuizHero', 'hero_tiga', userBudi);

assert.strictEqual(sandbox.getUserControlValue('quizActiveTab', 'battle', userAdmin), 'leaderboard');
assert.strictEqual(sandbox.getUserControlValue('selectQuizHero', 'hero_tiga', userAdmin), 'hero_zero');

assert.strictEqual(sandbox.getUserControlValue('quizActiveTab', 'battle', userBudi), 'battle');
assert.strictEqual(sandbox.getUserControlValue('selectQuizHero', 'hero_tiga', userBudi), 'hero_tiga');
console.log('[PASS] Quiz controls: Admin on leaderboard with hero_zero, Budi on battle with hero_tiga');

// -------------------------------------------------------------
// TEST 3: RESET BUTTONS LOCALIZED TO ACTIVE USER ONLY
// -------------------------------------------------------------
console.log('\n--- 3. Testing Reset Filter Localization ---');

// Admin resets CA filters
sandbox.resetUserControlsForPage('ca', userAdmin);

// Verify Admin CA controls are reset to defaults
assert.strictEqual(sandbox.getUserControlValue('filterCaMonth', '2026-09', userAdmin), '2026-09');
assert.strictEqual(sandbox.getUserControlValue('filterCaGrade', 'ALL', userAdmin), 'ALL');
assert.strictEqual(sandbox.getUserControlValue('filterCaScoreSort', 'DATE_DESC', userAdmin), 'DATE_DESC');

// Verify Budi's CA controls remain untouched (still 2026-07 and Perlu Coaching)
assert.strictEqual(sandbox.getUserControlValue('filterCaMonth', '2026-09', userBudi), '2026-07');
assert.strictEqual(sandbox.getUserControlValue('filterCaGrade', 'ALL', userBudi), 'Perlu Coaching');
console.log('[PASS] Resetting CA filters for Admin does NOT reset or touch Budi\'s CA filters!');

console.log('\n=== ALL GLOBAL USER MENU & CONTROL ISOLATION TESTS PASSED 100%! ===');
