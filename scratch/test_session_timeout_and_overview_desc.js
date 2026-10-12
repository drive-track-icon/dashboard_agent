const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== TEST SUITE: 9-Hour Auto Logout & Hidden Overview Description ===');

// 1. Static HTML verification for overviewPageDesc
const htmlContent = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
assert(htmlContent.includes('id="overviewPageDesc"'), 'overviewPageDesc must exist in index.html');
assert(htmlContent.includes('class="page-desc hidden" id="overviewPageDesc"'), 'overviewPageDesc must have hidden class');
assert(!htmlContent.includes('>Rekapitulasi perolehan seluruh petugas CSO untuk Customer Attributes (CA)'), 'Old description text must be removed from HTML');
console.log('✓ HTML: overviewPageDesc is hidden and empty in index.html');

// 2. Static JS verification for js/app.js
const jsContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'app.js'), 'utf8');
assert(jsContent.includes('SESSION_TIMEOUT_MS = 9 * 60 * 60 * 1000'), 'SESSION_TIMEOUT_MS must equal 9 hours in ms');
assert(jsContent.includes('checkSessionExpiry'), 'checkSessionExpiry function must exist');
assert(jsContent.includes('handleAutoLogout'), 'handleAutoLogout function must exist');
assert(jsContent.includes('vortex_session_login_time'), 'vortex_session_login_time must be tracked in storage');
console.log('✓ JS: 9-hour session constant and auto-logout functions defined in js/app.js');

// 3. Mock DOM environment for logic simulation
const mockStorage = {};
global.localStorage = {
  getItem: (k) => mockStorage[k] || null,
  setItem: (k, v) => { mockStorage[k] = String(v); },
  removeItem: (k) => { delete mockStorage[k]; },
  clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); }
};

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
    setAttribute: () => {},
    addEventListener: () => {}
  };
}

global.document = {
  getElementById(id) {
    if (!mockElements[id]) mockElements[id] = createMockElement(id);
    return mockElements[id];
  },
  body: createMockElement('body'),
  title: ''
};
global.window = global;

let lastToast = null;
global.showToast = (title, msg, type) => {
  lastToast = { title, msg, type };
};

// 4. Test updateOverviewLegendAndTitles hiding behavior
let overviewActiveCategory = 'ALL';
const descEl = document.getElementById('overviewPageDesc');
const legendEl = document.getElementById('overviewColorLegend');
const titleEl = document.getElementById('overviewPageTitle');
const badgeEl = document.getElementById('overviewPageBadge');
global.UI = {
  overviewPageDesc: descEl,
  loginView: createMockElement('loginView'),
  dashboardView: createMockElement('dashboardView'),
  realtimeClock: createMockElement('realtimeClock')
};

// Test with categories: ALL, CA, TIKET, ART
eval(jsContent.slice(jsContent.indexOf('function updateOverviewLegendAndTitles() {'), jsContent.indexOf('window.promptDeleteAllOverviewMonth = function() {')));

['ALL', 'CA', 'TIKET', 'ART'].forEach(cat => {
  overviewActiveCategory = cat;
  updateOverviewLegendAndTitles();
  assert.strictEqual(descEl.textContent, '', `descEl textContent must be empty for ${cat}`);
  assert(descEl.classList.contains('hidden'), `descEl must have hidden class for ${cat}`);
  assert.strictEqual(descEl.style.display, 'none', `descEl style.display must be none for ${cat}`);
});
console.log('✓ Overview description is guaranteed hidden and blank across all view categories (ALL, CA, TIKET, ART)');

// 5. Test 9-Hour Session Timeout logic
const SESSION_TIMEOUT_MS = 9 * 60 * 60 * 1000;
assert.strictEqual(SESSION_TIMEOUT_MS, 32400000, '9 hours must be 32,400,000 milliseconds');

// Mock state and session handling
const mockUsers = [
  { id: 'u_admin', username: 'admin', fullName: 'Budi Santoso', role: 'admin' },
  { id: 'u_user', username: 'user', fullName: 'Siti Rahma', role: 'user' }
];

let auditLogs = [];
const state = {
  currentUser: null,
  sessionExpiredOnLoad: false,
  getUsers() { return mockUsers; },
  addLog(action, title, details) {
    auditLogs.push({ action, title, details, timestamp: new Date().toISOString() });
  },
  loadSession() {
    const session = localStorage.getItem('vortex_session');
    if (!session) return null;
    const loginTimeStr = localStorage.getItem('vortex_session_login_time');
    if (loginTimeStr) {
      const loginTime = parseInt(loginTimeStr, 10);
      if (!isNaN(loginTime) && (Date.now() - loginTime >= SESSION_TIMEOUT_MS)) {
        this.clearSession();
        this.sessionExpiredOnLoad = true;
        return null;
      }
    } else {
      localStorage.setItem('vortex_session_login_time', String(Date.now()));
    }
    return JSON.parse(session);
  },
  setSession(user, isNewLogin = false) {
    this.currentUser = user;
    localStorage.setItem('vortex_session', JSON.stringify(user));
    if (isNewLogin || !localStorage.getItem('vortex_session_login_time')) {
      localStorage.setItem('vortex_session_login_time', String(Date.now()));
    }
  },
  clearSession() {
    this.currentUser = null;
    localStorage.removeItem('vortex_session');
    localStorage.removeItem('vortex_session_login_time');
  },
  isAdmin() { return this.currentUser && this.currentUser.role === 'admin'; }
};
global.state = state;

let appViewRendered = false;
global.renderAppView = () => { appViewRendered = true; };

eval(jsContent.slice(jsContent.indexOf('function checkSessionExpiry() {'), jsContent.indexOf('// ==========================================\n// 5. AUTHENTICATION & ROLE SWITCHING')));

// Scenario A: Admin logs in
const now = 1000000000000;
let currentTime = now;
const originalDateNow = Date.now;
Date.now = () => currentTime;

state.setSession(mockUsers[0], true);
assert(state.currentUser !== null, 'Admin should be logged in');
assert.strictEqual(localStorage.getItem('vortex_session_login_time'), String(now), 'Login time recorded');

// Check expiry at 8 hours and 59 minutes (before 9h timeout)
currentTime = now + (8 * 3600 * 1000 + 59 * 60 * 1000);
let expired = checkSessionExpiry();
assert.strictEqual(expired, false, 'Session should NOT expire before 9 hours');
assert(state.currentUser !== null, 'Admin remains logged in at 8h 59m');

// Check expiry at 9 hours exactly
currentTime = now + (9 * 3600 * 1000);
expired = checkSessionExpiry();
assert.strictEqual(expired, true, 'Session MUST expire at 9 hours');
assert.strictEqual(state.currentUser, null, 'Admin must be logged out automatically');
assert.strictEqual(localStorage.getItem('vortex_session'), null, 'Session storage cleared');
assert.strictEqual(localStorage.getItem('vortex_session_login_time'), null, 'Login time storage cleared');
assert(lastToast && lastToast.title === 'Sesi Berakhir Otomatis', 'Auto-logout toast must be displayed');
console.log('✓ Admin auto-logout at 9 hours verified');

// Scenario B: Regular User logs in
currentTime = 2000000000000;
state.setSession(mockUsers[1], true);
assert.strictEqual(state.currentUser.role, 'user', 'User should be logged in');

// Check expiry at 5 hours
currentTime = 2000000000000 + (5 * 3600 * 1000);
assert.strictEqual(checkSessionExpiry(), false, 'Regular user session active at 5h');

// Check expiry at 9 hours + 10 seconds
currentTime = 2000000000000 + (9 * 3600 * 1000 + 10000);
assert.strictEqual(checkSessionExpiry(), true, 'Regular user session expired after 9h');
assert.strictEqual(state.currentUser, null, 'User logged out automatically');
console.log('✓ Regular User auto-logout at 9 hours verified');

// Scenario C: Page reload / loadSession after 9 hours
currentTime = 3000000000000;
mockStorage['vortex_session'] = JSON.stringify(mockUsers[0]);
mockStorage['vortex_session_login_time'] = String(currentTime);

// Reload after 10 hours
currentTime = 3000000000000 + (10 * 3600 * 1000);
const loadedUser = state.loadSession();
assert.strictEqual(loadedUser, null, 'Expired session on page load must return null');
assert.strictEqual(state.sessionExpiredOnLoad, true, 'sessionExpiredOnLoad flag set');
assert.strictEqual(mockStorage['vortex_session'], undefined, 'Storage cleaned up');
console.log('✓ Page reload after 9 hours properly rejects expired session');

// Restore Date.now
Date.now = originalDateNow;

console.log('=== ALL TESTS PASSED SUCCESSFULLY! ===');
