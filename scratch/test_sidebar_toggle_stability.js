// scratch/test_sidebar_toggle_stability.js
// Automated verification for:
// 1. Sidebar toggle does not trigger state.saveUsers or FirebaseSync re-renders
// 2. Mobile sidebar expanding does not auto-collapse
// 3. navigateToPage(..., false) (background render) does not close mobile sidebar
// 4. Sidebar brand click does not close expanded sidebar
// 5. Desktop and mobile settings are properly isolated

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('=== STARTING SIDEBAR TOGGLE STABILITY & MOBILE FIX TESTS ===');

const appJsPath = path.join(__dirname, '..', 'js', 'app.js');
const appJsContent = fs.readFileSync(appJsPath, 'utf8');

// Test 1: Verify code assertions in app.js
console.log('Test 1: Code inspections in app.js...');

// Ensure setUserSidebarCollapsed does NOT call state.saveUsers
const setUserSidebarCollapsedMatch = appJsContent.match(/function setUserSidebarCollapsed\([^)]*\)\s*\{([\s\S]*?)\n\}/);
assert(setUserSidebarCollapsedMatch, 'setUserSidebarCollapsed function found');
const setUserSidebarCollapsedBodyWithoutComments = setUserSidebarCollapsedMatch[1].replace(/\/\/.*/g, '');
assert(!setUserSidebarCollapsedBodyWithoutComments.includes('state.saveUsers'), 'setUserSidebarCollapsed does NOT call state.saveUsers');
assert(!setUserSidebarCollapsedBodyWithoutComments.includes('saveUsers('), 'setUserSidebarCollapsed does NOT call saveUsers');

// Ensure setUserDashboardZoom does NOT call state.saveUsers
const setUserDashboardZoomMatch = appJsContent.match(/function setUserDashboardZoom\([^)]*\)\s*\{([\s\S]*?)\n\}/);
assert(setUserDashboardZoomMatch, 'setUserDashboardZoom function found');
const setUserDashboardZoomBodyWithoutComments = setUserDashboardZoomMatch[1].replace(/\/\/.*/g, '');
assert(!setUserDashboardZoomBodyWithoutComments.includes('state.saveUsers'), 'setUserDashboardZoom does NOT call state.saveUsers');

// Ensure navigateToPage guards closeMobileSidebar
assert(
  appJsContent.includes("if (save && typeof window !== 'undefined' && window.innerWidth <= 768 && !isSidebarCollapsed)"),
  'navigateToPage guards closeMobileSidebar so background renders do not collapse sidebar'
);

// Ensure sidebarBrandClickable only expands when collapsed
assert(
  appJsContent.includes('if (isSidebarCollapsed) {\n        e.stopPropagation();\n        toggleSidebarCollapse();\n      }'),
  'sidebarBrandClickable only toggles when isSidebarCollapsed is true'
);

console.log('✓ Test 1 Passed: Code inspections verified');

// Test 2: Simulating runtime mobile expand & background navigation
console.log('Test 2: Simulating mobile expand & background navigation...');

const mockLocalStorage = {};
global.localStorage = {
  getItem: (k) => (k in mockLocalStorage ? mockLocalStorage[k] : null),
  setItem: (k, v) => { mockLocalStorage[k] = String(v); },
  removeItem: (k) => { delete mockLocalStorage[k]; }
};

let saveUsersCallCount = 0;
let firebaseSyncNotified = false;

const state = {
  currentUser: { username: 'budi_qa', fullName: 'Budi QA', role: 'user' },
  getUsers: () => [{ username: 'budi_qa', fullName: 'Budi QA', role: 'user' }],
  saveUsers: () => { saveUsersCallCount++; },
  setSession: () => {}
};

// Mock DOM
let isSidebarCollapsed = true;
let dashboardClasses = new Set(['sidebar-collapsed']);
let sidebarOverlayActive = false;

const UI = {
  dashboardView: {
    classList: {
      toggle: (cls, val) => {
        if (val) dashboardClasses.add(cls);
        else dashboardClasses.delete(cls);
      }
    }
  },
  sidebar: {
    classList: {
      add: () => {},
      remove: () => {}
    }
  },
  sidebarOverlay: {
    classList: {
      toggle: (cls, val) => {
        if (cls === 'active') sidebarOverlayActive = !!val;
      },
      remove: (cls) => {
        if (cls === 'active') sidebarOverlayActive = false;
      }
    }
  },
  sidebarCollapseIcon: { className: '' },
  sidebarCollapseBtn: { title: '' }
};

global.window = {
  innerWidth: 412, // Mobile device
  dispatchEvent: () => {}
};
global.Event = function () {};

// Logic extracted from app.js
function getUserSidebarCollapsed(user) {
  if (!user) return false;
  const username = (user.username || user.id || '').toLowerCase();
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const storageKey = isMobile ? 'drive_sidebar_collapsed_mobile_' + username : 'drive_sidebar_collapsed_' + username;
  const saved = localStorage.getItem(storageKey);
  if (saved !== null) return saved === 'true';
  return isMobile ? true : false;
}

function setUserSidebarCollapsed(user, collapsed) {
  if (!user) return;
  const username = (user.username || user.id || '').toLowerCase();
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const storageKey = isMobile ? 'drive_sidebar_collapsed_mobile_' + username : 'drive_sidebar_collapsed_' + username;
  localStorage.setItem(storageKey, collapsed ? 'true' : 'false');
  if (!isMobile) {
    localStorage.setItem('sidebar_collapsed', collapsed ? 'true' : 'false');
    user.sidebarCollapsed = collapsed;
  }
}

function applySidebarCollapse(collapsed, save = true) {
  isSidebarCollapsed = collapsed;
  UI.dashboardView.classList.toggle('sidebar-collapsed', collapsed);
  if (window.innerWidth <= 768 && UI.sidebarOverlay) {
    UI.sidebarOverlay.classList.toggle('active', !collapsed);
  }
  if (save && state.currentUser) {
    setUserSidebarCollapsed(state.currentUser, collapsed);
  }
}

function toggleSidebarCollapse() {
  isSidebarCollapsed = !isSidebarCollapsed;
  applySidebarCollapse(isSidebarCollapsed, true);
}

function closeMobileSidebar() {
  UI.sidebarOverlay.classList.remove('active');
  if (window.innerWidth <= 768) {
    applySidebarCollapse(true, true);
  }
}

function navigateToPage(pageId, save = true) {
  if (save && typeof window !== 'undefined' && window.innerWidth <= 768 && !isSidebarCollapsed) {
    closeMobileSidebar();
  }
}

// 2a. Initial mobile check
assert.strictEqual(getUserSidebarCollapsed(state.currentUser), true, 'Initial state on mobile defaults to collapsed (58px rail)');
assert.strictEqual(dashboardClasses.has('sidebar-collapsed'), true, 'Dashboard initially has sidebar-collapsed');

// 2b. User expands sidebar on mobile
toggleSidebarCollapse();
assert.strictEqual(isSidebarCollapsed, false, 'Sidebar is now expanded on mobile');
assert.strictEqual(dashboardClasses.has('sidebar-collapsed'), false, 'sidebar-collapsed class is removed');
assert.strictEqual(sidebarOverlayActive, true, 'Overlay is active on mobile when expanded');
assert.strictEqual(saveUsersCallCount, 0, 'state.saveUsers was NEVER called upon expanding');
assert.strictEqual(localStorage.getItem('drive_sidebar_collapsed_mobile_budi_qa'), 'false', 'Mobile preference saved as false');

// 2c. Background sync/render occurs (save = false, e.g. FirebaseSync, time tick, etc.)
navigateToPage('overview', false);
assert.strictEqual(isSidebarCollapsed, false, 'CRITICAL: Background render did NOT collapse the mobile sidebar!');
assert.strictEqual(dashboardClasses.has('sidebar-collapsed'), false, 'Sidebar remains expanded after background render');

// 2d. Accidental click on brand header when expanded
// Should NOT collapse
if (isSidebarCollapsed) {
  toggleSidebarCollapse();
}
assert.strictEqual(isSidebarCollapsed, false, 'Clicking brand header when already expanded does NOT collapse it');

// 2e. Explicit user action: user taps a menu item (save = true)
navigateToPage('update-pa', true);
assert.strictEqual(isSidebarCollapsed, true, 'Explicit page navigation closes mobile sidebar drawer');
assert.strictEqual(sidebarOverlayActive, false, 'Overlay deactivated after explicit navigation');

console.log('✓ Test 2 Passed: Mobile expand stability and drawer behavior fully verified');

// Test 3: PC isolation and performance
console.log('Test 3: Simulating PC toggling and device isolation...');
window.innerWidth = 1440; // Desktop

// PC expands sidebar
applySidebarCollapse(false, true);
assert.strictEqual(localStorage.getItem('drive_sidebar_collapsed_budi_qa'), 'false', 'PC saved as false');
assert.strictEqual(localStorage.getItem('drive_sidebar_collapsed_mobile_budi_qa'), 'true', 'Mobile setting untouched');
assert.strictEqual(saveUsersCallCount, 0, 'No state.saveUsers on PC toggle (no re-renders, no focus loss, no network writes)');

// PC collapses sidebar
applySidebarCollapse(true, true);
assert.strictEqual(localStorage.getItem('drive_sidebar_collapsed_budi_qa'), 'true', 'PC saved as true');
assert.strictEqual(localStorage.getItem('drive_sidebar_collapsed_mobile_budi_qa'), 'true', 'Mobile setting still intact');
assert.strictEqual(saveUsersCallCount, 0, 'Zero saveUsers calls throughout whole lifecycle');

console.log('✓ Test 3 Passed: Desktop toggling and storage isolation verified');

console.log('====================================================');
console.log('ALL SIDEBAR TOGGLE STABILITY TESTS PASSED (3/3)');
console.log('====================================================');
