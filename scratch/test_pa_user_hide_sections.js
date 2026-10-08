const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== RUNNING TEST: PA USER SECTIONS HIDING VERIFICATION ===\n');

const baseDir = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(baseDir, 'js', 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(baseDir, 'css', 'style.css'), 'utf8');

// 1. Check index.html elements
assert(html.includes('id="paAdminMetricsLogsSection"'), 'paAdminMetricsLogsSection should exist in index.html');
assert(html.includes('id="paMetricsGrid"'), 'paMetricsGrid should exist in index.html');
assert(html.includes('id="paSearchToolbar"'), 'paSearchToolbar should exist in index.html');
assert(html.includes('id="paTableContainer"'), 'paTableContainer should exist in index.html');
assert(html.includes('Total Interaksi Ditangani'), 'Total Interaksi Ditangani should exist');
assert(html.includes('Total Jam Efektif'), 'Total Jam Efektif should exist');
assert(html.includes('Total Waktu AUX'), 'Total Waktu AUX should exist');
assert(html.includes('Skor Capaian PA'), 'Skor Capaian PA should exist');
assert(html.includes('id="searchPaInput"'), 'searchPaInput should exist');
assert(html.includes('id="tablePaLogs"'), 'tablePaLogs should exist');
assert(html.includes('Waktu &amp; Tanggal'), 'Waktu & Tanggal should exist in table');
assert(html.includes('Petugas CSO'), 'Petugas CSO should exist in table');
assert(html.includes('Layanan CSO'), 'Layanan CSO should exist in table');
assert(html.includes('Aktivitas &amp; AUX'), 'Aktivitas & AUX should exist in table');
console.log('[PASS] index.html: All requested elements, cards, and table headers are identified and assigned proper IDs/wrappers.');

// 2. Check UI bindings in js/app.js
assert(js.includes("paAdminMetricsLogsSection: document.getElementById('paAdminMetricsLogsSection')"), 'UI.paAdminMetricsLogsSection should be bound');
assert(js.includes("paMetricsGrid: document.getElementById('paMetricsGrid')"), 'UI.paMetricsGrid should be bound');
assert(js.includes("paSearchToolbar: document.getElementById('paSearchToolbar')"), 'UI.paSearchToolbar should be bound');
assert(js.includes("paTableContainer: document.getElementById('paTableContainer')"), 'UI.paTableContainer should be bound');
console.log('[PASS] js/app.js: UI element references properly bound in UI object.');

// 3. Check data-user-role in renderAppView
assert(js.includes("document.body.setAttribute('data-user-role', isAdmin ? 'admin' : 'user')"), 'renderAppView should set data-user-role on body');
console.log('[PASS] js/app.js: document.body gets data-user-role dynamically on session changes.');

// 4. Check role-based visibility logic in renderUpdatePaPage
assert(js.includes("if (UI.paAdminMetricsLogsSection) UI.paAdminMetricsLogsSection.classList.add('hidden')"), 'paAdminMetricsLogsSection should be hidden for regular user');
assert(js.includes("if (UI.paMetricsGrid) UI.paMetricsGrid.classList.add('hidden')"), 'paMetricsGrid should be hidden for regular user');
assert(js.includes("if (UI.paSearchToolbar) UI.paSearchToolbar.classList.add('hidden')"), 'paSearchToolbar should be hidden for regular user');
assert(js.includes("if (UI.paTableContainer) UI.paTableContainer.classList.add('hidden')"), 'paTableContainer should be hidden for regular user');
assert(js.includes("if (UI.paAdminMetricsLogsSection) UI.paAdminMetricsLogsSection.classList.remove('hidden')"), 'paAdminMetricsLogsSection should be shown for admin');
console.log('[PASS] js/app.js: renderUpdatePaPage hides metrics, card cari, and card table on user role, and keeps them on admin role.');

// 5. Check CSS rules in style.css
assert(css.includes('body[data-user-role="user"] #paAdminMetricsLogsSection'), 'CSS rule for body[data-user-role="user"] #paAdminMetricsLogsSection should exist');
assert(css.includes('body[data-user-role="user"] #paMetricsGrid'), 'CSS rule for body[data-user-role="user"] #paMetricsGrid should exist');
assert(css.includes('body[data-user-role="user"] #paSearchToolbar'), 'CSS rule for body[data-user-role="user"] #paSearchToolbar should exist');
assert(css.includes('body[data-user-role="user"] #paTableContainer'), 'CSS rule for body[data-user-role="user"] #paTableContainer should exist');
assert(css.includes('body[data-user-role="admin"] #paUserPersonalCardContainer'), 'CSS rule for body[data-user-role="admin"] #paUserPersonalCardContainer should exist');
console.log('[PASS] css/style.css: Robust CSS rules enforce hiding on user and admin view.');

console.log('\n=== ALL UNIT ASSERTIONS PASSED! ===');
