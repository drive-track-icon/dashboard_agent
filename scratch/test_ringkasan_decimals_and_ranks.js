const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== TEST: MENU RINGKASAN - CA DECIMAL, HIDDEN INDIKATOR, NUMERIC RANKS ===\n');

const baseDir = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(baseDir, 'js', 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(baseDir, 'css', 'style.css'), 'utf8');

// Extract renderOverviewPage function
const overviewStart = js.indexOf('function renderOverviewPage()');
const overviewEnd = js.indexOf('function getStockBadge', overviewStart);
const overviewFnStr = js.substring(overviewStart, overviewEnd);

// 1. Verify Rank Badges use numbers 1, 2, 3, ... (NO crown/medal/award icons)
assert(!overviewFnStr.includes('fa-crown'), 'Overview must NOT use crown icon');
assert(!overviewFnStr.includes('fa-medal'), 'Overview must NOT use medal icon');
assert(!overviewFnStr.includes('fa-award'), 'Overview must NOT use award icon');
assert(overviewFnStr.includes('rankBadgeHtml = `<span class="ca-rank-badge ca-rank-1" title="Peringkat 1">1</span>`'), 'Rank 1 must display number 1');
assert(overviewFnStr.includes('rankBadgeHtml = `<span class="ca-rank-badge ca-rank-2" title="Peringkat 2">2</span>`'), 'Rank 2 must display number 2');
assert(overviewFnStr.includes('rankBadgeHtml = `<span class="ca-rank-badge ca-rank-3" title="Peringkat 3">3</span>`'), 'Rank 3 must display number 3');
assert(overviewFnStr.includes('${currentRank}'), 'Other ranks must display number');
console.log('[PASS] Rank badges: 1, 2, 3, and all ranks use clean numbers!');

// 2. Verify CA format in Ringkasan (decimal with 2 digits behind comma/dot, NO %)
assert(overviewFnStr.includes("caScoreFormatted = item.hasCa ? Number(item.caAvg).toFixed(2) : '-'"), 'caScoreFormatted must not append %');
assert(overviewFnStr.includes("caRangeFormatted = item.hasCa ? `${Number(item.caMin).toFixed(2)} - ${Number(item.caMax).toFixed(2)}` : '-'"), 'caRangeFormatted must not append %');
assert(overviewFnStr.includes("Target: 85.00"), 'Target label must be 85.00 without %');
assert(!overviewFnStr.includes("Target: 85.00%"), 'Target label must not have %');
assert(!js.includes("Skor CA (%) [2 Desimal]"), 'Table header must not have (%)');
assert(js.includes("Skor CA [2 Desimal]"), 'Table header must be Skor CA [2 Desimal]');
console.log('[PASS] CA values: Strictly formatted with 2 decimals without percentage symbol!');

// 3. Verify Indikator legend is hidden
assert(html.includes('id="overviewColorLegend" style="display:none !important;"'), 'overviewColorLegend in index.html must have display:none !important');
assert(css.includes('.ca-color-legend,') && css.includes('display: none !important;'), 'CSS must enforce display: none !important on ca-color-legend');
assert(js.includes("legendEl.style.display = 'none';"), 'js updateOverviewLegendAndTitles must hide legendEl');
console.log('[PASS] Indikator legend: Completely hidden via HTML, CSS, and JS!');

console.log('\n=== ALL UNIT ASSERTIONS PASSED! ===');
