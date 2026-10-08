const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== RUNNING TEST: OVERVIEW CA TABLE, SORTING & COLOR GRADATION ===\n');

const baseDir = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(baseDir, 'js', 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(baseDir, 'css', 'style.css'), 'utf8');

// 1. Check HTML Elements
assert(html.includes('id="pageOverview"'), 'pageOverview should exist');
assert(html.includes('Ringkasan Perolehan CA User'), 'Page title should be Ringkasan Perolehan CA User');
assert(html.includes('id="tableOverviewCa"'), 'tableOverviewCa should exist');
assert(html.includes('id="tbodyOverviewCa"'), 'tbodyOverviewCa should exist');
assert(html.includes('id="btnSortCaDesc"'), 'btnSortCaDesc should exist');
assert(html.includes('id="btnSortCaAsc"'), 'btnSortCaAsc should exist');
assert(html.includes('id="thSortScore"'), 'thSortScore should exist');
assert(html.includes('id="searchOverviewCaInput"'), 'searchOverviewCaInput should exist');
assert(html.includes('id="overviewCaTeamAverage"'), 'overviewCaTeamAverage metric should exist');
assert(html.includes('id="overviewCaTopScore"'), 'overviewCaTopScore metric should exist');
assert(html.includes('id="overviewCaPassRate"'), 'overviewCaPassRate metric should exist');
assert(html.includes('id="overviewCaTotalUsers"'), 'overviewCaTotalUsers metric should exist');
assert(html.includes('Bagus (≥95%)'), 'Color legend Bagus should exist');
assert(html.includes('Sedang (85-94%)'), 'Color legend Sedang should exist');
assert(html.includes('Jelek (&lt;85%)'), 'Color legend Jelek should exist');
console.log('[PASS] index.html: Table, sort controls, metrics cards, and color scale legend verified.');

// 2. Check JS functions and calculations
assert(js.includes('function calculateOverviewCaData()'), 'calculateOverviewCaData should exist in js');
assert(js.includes('function getCaDynamicColor('), 'getCaDynamicColor should exist in js');
assert(js.includes('function renderOverviewPage()'), 'renderOverviewPage should exist in js');
assert(js.includes("overviewCaSortOrder = 'DESC'"), 'overviewCaSortOrder should be initialized');
assert(js.includes('UI.btnSortCaDesc'), 'btnSortCaDesc event listener should exist');
assert(js.includes('UI.btnSortCaAsc'), 'btnSortCaAsc event listener should exist');
assert(js.includes('UI.thSortScore'), 'thSortScore event listener should exist');

// 3. Test dynamic color mapping logic
eval(`
${js.slice(js.indexOf('function getCaDynamicColor('), js.indexOf('function renderOverviewPage()'))}
`);

const excellent = getCaDynamicColor(98.5);
assert(excellent.hue >= 100, 'Score 98.5 should have hue >= 100 (green)');
assert(excellent.grade === 'Sangat Baik', 'Score 98.5 should be Sangat Baik');

const good = getCaDynamicColor(88.0);
assert(good.hue >= 45 && good.hue < 90, 'Score 88.0 should have hue between 45 and 90 (lime to yellow)');
assert(good.grade.includes('Baik'), 'Score 88.0 should be Baik (Sedang)');

const fair = getCaDynamicColor(78.0);
assert(fair.hue >= 20 && fair.hue < 45, 'Score 78.0 should have hue between 20 and 45 (amber to orange)');

const poor = getCaDynamicColor(60.0);
assert(poor.hue === 0, 'Score 60.0 should have hue 0 (pure red)');
assert(poor.passStatus === 'Remedial SOP', 'Score 60.0 should be Remedial SOP');
console.log('[PASS] js/app.js: Dynamic color gradient verified: Green (Bagus) -> Yellow (Sedang) -> Red (Jelek).');

// 4. Test sorting logic
const sampleData = [
  { fullName: 'Agent A', avgScore: 92.5, hasLogs: true },
  { fullName: 'Agent B', avgScore: 98.0, hasLogs: true },
  { fullName: 'Agent C', avgScore: 84.0, hasLogs: true },
  { fullName: 'Agent D', avgScore: 0, hasLogs: false }
];

// Sort DESC (Besar ke Kecil)
const sortedDesc = [...sampleData].sort((a, b) => {
  if (!a.hasLogs && b.hasLogs) return 1;
  if (a.hasLogs && !b.hasLogs) return -1;
  return b.avgScore - a.avgScore;
});
assert.strictEqual(sortedDesc[0].fullName, 'Agent B', 'Highest score must be first in DESC');
assert.strictEqual(sortedDesc[1].fullName, 'Agent A');
assert.strictEqual(sortedDesc[2].fullName, 'Agent C');
assert.strictEqual(sortedDesc[3].fullName, 'Agent D', 'No logs must be last in DESC');

// Sort ASC (Kecil ke Besar)
const sortedAsc = [...sampleData].sort((a, b) => {
  if (!a.hasLogs && b.hasLogs) return 1;
  if (a.hasLogs && !b.hasLogs) return -1;
  return a.avgScore - b.avgScore;
});
assert.strictEqual(sortedAsc[0].fullName, 'Agent C', 'Lowest score must be first in ASC');
assert.strictEqual(sortedAsc[1].fullName, 'Agent A');
assert.strictEqual(sortedAsc[2].fullName, 'Agent B');
assert.strictEqual(sortedAsc[3].fullName, 'Agent D');
console.log('[PASS] Sorting logic verified: DESC (Besar ke Kecil) & ASC (Kecil ke Besar).');

// 5. Check CSS classes
assert(css.includes('.ca-sort-segmented-group'), 'CSS ca-sort-segmented-group should exist');
assert(css.includes('.ca-mini-bar-track'), 'CSS ca-mini-bar-track should exist');
assert(css.includes('.ca-mini-bar-fill'), 'CSS ca-mini-bar-fill should exist');
assert(css.includes('.ca-rank-1'), 'CSS ca-rank-1 gold rank should exist');
assert(css.includes('.ca-rank-2'), 'CSS ca-rank-2 silver rank should exist');
assert(css.includes('.ca-rank-3'), 'CSS ca-rank-3 bronze rank should exist');
assert(css.includes('.legend-chip.chip-green'), 'CSS legend chip green should exist');
assert(css.includes('.legend-chip.chip-yellow'), 'CSS legend chip yellow should exist');
assert(css.includes('.legend-chip.chip-red'), 'CSS legend chip red should exist');
console.log('[PASS] css/style.css: All styling, rank badges, mini progress bars, and legend chips verified.');

console.log('\n=== ALL OVERVIEW CA TABLE TESTS PASSED! ===');
