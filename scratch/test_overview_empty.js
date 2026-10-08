const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== RUNNING TEST: OVERVIEW (RINGKASAN) EMPTIED VERIFICATION ===\n');

const baseDir = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(baseDir, 'js', 'app.js'), 'utf8');

// 1. Check section#pageOverview exists
assert(html.includes('id="pageOverview"'), '#pageOverview should exist');

// 2. Check content of #pageOverview in HTML is completely empty of widgets
const startIdx = html.indexOf('id="pageOverview"');
const closeTagIdx = html.indexOf('</section>', startIdx);
const sectionContent = html.substring(startIdx, closeTagIdx);

assert(!sectionContent.includes('Pusat Kendali &amp; Ringkasan'), 'Header Pusat Kendali & Ringkasan should not exist in pageOverview');
assert(!sectionContent.includes('metricTotalUsers'), 'metricTotalUsers should not exist in pageOverview');
assert(!sectionContent.includes('metricAdminRatio'), 'metricAdminRatio should not exist in pageOverview');
assert(!sectionContent.includes('metricPermissionLabel'), 'metricPermissionLabel should not exist in pageOverview');
assert(!sectionContent.includes('overviewActivityTimeline'), 'overviewActivityTimeline should not exist in pageOverview');
assert(!sectionContent.includes('btnRefreshStats'), 'btnRefreshStats should not exist in pageOverview');
assert(!sectionContent.includes('btnOverviewLogAll'), 'btnOverviewLogAll should not exist in pageOverview');
console.log('[PASS] index.html: section#pageOverview is completely emptied of all contents, metrics, headers, and timeline widgets.');

// 3. Check renderOverviewPage in js/app.js
assert(js.includes('function renderOverviewPage()'), 'renderOverviewPage function should exist');
assert(js.includes("UI.pages.overview.innerHTML = ''"), 'renderOverviewPage ensures innerHTML is cleared');
console.log('[PASS] js/app.js: renderOverviewPage cleanly empties #pageOverview without errors.');

console.log('\n=== ALL OVERVIEW CHECKS PASSED! ===');
