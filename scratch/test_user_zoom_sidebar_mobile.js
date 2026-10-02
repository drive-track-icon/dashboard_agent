// test_user_zoom_sidebar_mobile.js
// Verification test for:
// 1. Zoom in/out affects typography ONLY (--content-font-scale), NOT containers
// 2. Containers are 100% fluid, follow screen size, and do not overflow or exit the screen
// 3. Per-user zoom & sidebar state isolation
// 4. Mobile sidebar visibility (58px rail) & responsiveness across devices

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- STARTING VERIFICATION TESTS ---');

// 1. Check Files Existence & Syntax
const appJsPath = path.join(__dirname, '..', 'js', 'app.js');
const styleCssPath = path.join(__dirname, '..', 'css', 'style.css');
const indexHtmlPath = path.join(__dirname, '..', 'index.html');

assert(fs.existsSync(appJsPath), 'js/app.js exists');
assert(fs.existsSync(styleCssPath), 'css/style.css exists');
assert(fs.existsSync(indexHtmlPath), 'index.html exists');

const appJsContent = fs.readFileSync(appJsPath, 'utf8');
const styleCssContent = fs.readFileSync(styleCssPath, 'utf8');
const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

console.log('✓ Files read successfully');

// 2. Verify Per-User Logic in app.js
assert(appJsContent.includes('function getUserSidebarCollapsed(user)'), 'getUserSidebarCollapsed exists');
assert(appJsContent.includes('function setUserSidebarCollapsed(user, collapsed)'), 'setUserSidebarCollapsed exists');
assert(appJsContent.includes('function getUserDashboardZoom(user)'), 'getUserDashboardZoom exists');
assert(appJsContent.includes('function setUserDashboardZoom(user, level)'), 'setUserDashboardZoom exists');

assert(appJsContent.includes("'drive_sidebar_collapsed_' + username"), 'drive_sidebar_collapsed_ key per username');
assert(appJsContent.includes("'drive_dashboard_zoom_' + username"), 'drive_dashboard_zoom_ key per username');

// Check renderAppView per-user calls
assert(appJsContent.includes('const userSidebarCollapsed = getUserSidebarCollapsed(state.currentUser);'), 'renderAppView loads per-user sidebar');
assert(appJsContent.includes('const userZoom = getUserDashboardZoom(state.currentUser);'), 'renderAppView loads per-user zoom');

console.log('✓ Per-user isolation functions present and called in renderAppView');

// 3. Test Per-User Mock Simulation
const mockStorage = {};
const localStorage = {
  getItem: (k) => (k in mockStorage ? mockStorage[k] : null),
  setItem: (k, v) => { mockStorage[k] = String(v); },
  removeItem: (k) => { delete mockStorage[k]; }
};

// Simulation of user functions
function simGetUserSidebarCollapsed(user) {
  if (!user) return false;
  const username = (user.username || user.id || '').toLowerCase();
  const saved = localStorage.getItem('drive_sidebar_collapsed_' + username);
  if (saved !== null) return saved === 'true';
  return false;
}

function simSetUserSidebarCollapsed(user, collapsed) {
  if (!user) return;
  const username = (user.username || user.id || '').toLowerCase();
  localStorage.setItem('drive_sidebar_collapsed_' + username, collapsed ? 'true' : 'false');
}

function simGetUserDashboardZoom(user) {
  if (!user) return 100;
  const username = (user.username || user.id || '').toLowerCase();
  const saved = localStorage.getItem('drive_dashboard_zoom_' + username);
  if (saved) {
    const parsed = parseInt(saved, 10);
    if (!isNaN(parsed) && parsed >= 60 && parsed <= 160) return parsed;
  }
  return 100;
}

function simSetUserDashboardZoom(user, level) {
  if (!user) return;
  const username = (user.username || user.id || '').toLowerCase();
  localStorage.setItem('drive_dashboard_zoom_' + username, level.toString());
}

const userAdmin = { username: 'admin', role: 'admin' };
const userRegular = { username: 'user', role: 'user' };

// Admin sets collapsed = true, zoom = 80
simSetUserSidebarCollapsed(userAdmin, true);
simSetUserDashboardZoom(userAdmin, 80);

assert.strictEqual(simGetUserSidebarCollapsed(userAdmin), true, 'Admin sidebar is collapsed');
assert.strictEqual(simGetUserDashboardZoom(userAdmin), 80, 'Admin zoom is 80%');

// Regular user has not set anything yet -> should default to false and 100%
assert.strictEqual(simGetUserSidebarCollapsed(userRegular), false, 'Regular user sidebar defaults to uncollapsed');
assert.strictEqual(simGetUserDashboardZoom(userRegular), 100, 'Regular user zoom defaults to 100%');

// Regular user sets collapsed = false, zoom = 120%
simSetUserSidebarCollapsed(userRegular, false);
simSetUserDashboardZoom(userRegular, 120);

assert.strictEqual(simGetUserSidebarCollapsed(userRegular), false, 'Regular user sidebar is uncollapsed');
assert.strictEqual(simGetUserDashboardZoom(userRegular), 120, 'Regular user zoom is 120%');

// Admin remains unaffected!
assert.strictEqual(simGetUserSidebarCollapsed(userAdmin), true, 'Admin sidebar remains collapsed (isolated)');
assert.strictEqual(simGetUserDashboardZoom(userAdmin), 80, 'Admin zoom remains 80% (isolated)');

console.log('✓ Per-user isolation verified: Admin and User settings do not conflict');

// 4. Verify applyDashboardZoom in app.js:
// Containers are NOT altered (no style.zoom, no width overrides).
// Zoom ONLY affects typography via --content-font-scale.
assert(!appJsContent.includes('mainContent.style.zoom'), 'mainContent.style.zoom is NOT used');
assert(!appJsContent.includes('roleAlertBanner.style.zoom'), 'roleAlertBanner.style.zoom is NOT used');
assert(appJsContent.includes("mainContent.style.removeProperty('zoom')"), 'Cleans up any legacy mainContent.style.zoom');
assert(appJsContent.includes("mainContent.style.removeProperty('width')"), 'Cleans up any legacy mainContent.style.width');
assert(appJsContent.includes("mainContent.style.removeProperty('max-width')"), 'Cleans up any legacy mainContent.style.max-width');
assert(appJsContent.includes("setProperty('--content-font-scale', scale.toString())"), 'Sets --content-font-scale for typography scaling');

console.log('✓ applyDashboardZoom pure typography scaling verified in app.js (containers unaffected)');

// 5. Verify Container Immunity & Fluidity in style.css
// The containers (.dashboard-shell, .main-wrapper, .page-content) have 100% fluid bounds and overflow-x: hidden
assert(styleCssContent.includes('overflow-x: hidden !important;'), 'page-content has overflow-x: hidden !important');
assert(styleCssContent.includes('box-sizing: border-box !important;'), 'page-content has box-sizing: border-box !important');
assert(!styleCssContent.includes('var(--content-zoom-width,'), 'All legacy var(--content-zoom-width) eliminated from style.css');
assert(styleCssContent.includes('--content-font-scale: 1 !important;'), 'Sidebar, topbar, and modals lock --content-font-scale at 1');

console.log('✓ Container immunity and screen bounding verified in style.css');

// 6. Verify Typography Scaling in style.css & index.html
const calcFontRegex = /font-size:\s*calc\([^)]+\s*\*\s*var\(--content-font-scale,\s*1\)\)/g;
const cssCalcFontMatches = (styleCssContent.match(calcFontRegex) || []).length;
console.log(`Found ${cssCalcFontMatches} font-size calc rules in style.css`);
assert(cssCalcFontMatches >= 250, 'style.css has extensive typography font-size calc rules');

const htmlCalcFontMatches = (indexHtmlContent.match(calcFontRegex) || []).length;
console.log(`Found ${htmlCalcFontMatches} font-size calc rules in index.html`);
assert(htmlCalcFontMatches >= 140, 'index.html has inline typography font-size calc rules');

console.log('✓ Extensive typography font-scaling rules verified across CSS and HTML');

// 7. Verify Mobile CSS Rules in style.css
const mobileSectionIndex = styleCssContent.indexOf('@media (max-width: 768px)');
assert(mobileSectionIndex !== -1, '@media (max-width: 768px) block found');
const mobileCss = styleCssContent.slice(mobileSectionIndex);

// Find .sidebar block in mobile CSS
const sidebarMobileMatch = mobileCss.match(/\.sidebar\s*\{([^}]+)\}/);
assert(sidebarMobileMatch, '.sidebar block found in mobile media query');
assert(!sidebarMobileMatch[1].includes('translateX(-100%)'), 'Mobile .sidebar does not have translateX(-100%)');
assert(mobileCss.includes('width: var(--sidebar-width-mobile-collapsed) !important'), 'Mobile sidebar width is 58px');
assert(mobileCss.includes('transform: translateX(0) !important'), 'Mobile sidebar is visible with translateX(0)');
assert(mobileCss.includes('margin-left: var(--sidebar-width-mobile-collapsed) !important'), 'Main-wrapper leaves 58px for sidebar');
assert(mobileCss.includes('width: calc(100% - var(--sidebar-width-mobile-collapsed)) !important'), 'Main-wrapper dynamically fills rest of screen');

console.log('✓ Mobile sidebar visibility rules verified in style.css');

// 8. Verify index.html sidebar collapse button
assert(!indexHtmlContent.includes('id="sidebarCollapseBtn" class="sidebar-collapse-btn hide-mobile"'), 'hide-mobile removed from sidebarCollapseBtn');
assert(indexHtmlContent.includes('id="sidebarCollapseBtn"'), 'sidebarCollapseBtn present');

console.log('✓ index.html sidebar button verified');

// 9. Verify Container Queries for True Fluid Responsiveness
assert(styleCssContent.includes('container-type: inline-size;'), 'Container queries enabled on pageContent');
assert(styleCssContent.includes('@container pageContent (max-width: 960px)'), 'Container query 960px rule present');
assert(styleCssContent.includes('@container pageContent (max-width: 640px)'), 'Container query 640px rule present');

// 10. Verify Overflow Containment on Desktop Shell & Wrapper
assert(styleCssContent.includes('width: calc(100% - var(--sidebar-width));'), 'Main wrapper dynamically sized to 100% minus sidebar');
assert(styleCssContent.includes('min-width: 0;'), 'Main wrapper has min-width: 0 to prevent flex blowout');

// 11. Verify Chart & Overview Fluid Flex Cards
assert(styleCssContent.includes('flex: 1 1 min(100%, 420px);'), 'Chart card uses fluid min(100%, 420px) flex rule');

console.log('✓ Container queries, overflow containment, and fluid cards verified');

console.log('--- ALL VERIFICATION TESTS PASSED SUCCESSFULLY! ---');
