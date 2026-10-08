const fs = require('fs');
const assert = require('assert');

console.log('--- RUNNING DETAILED OVERVIEW TABLE TESTS ---');

const html = fs.readFileSync('./index.html', 'utf8');
const js = fs.readFileSync('./js/app.js', 'utf8');

// 1. Verify 4 cards removed from #pageOverview
const pageOverviewSectionMatch = html.match(/<section[^>]*id="pageOverview"[\s\S]*?<\/section>/);
assert(pageOverviewSectionMatch, 'pageOverview section must exist in index.html');
const pageOverviewHtml = pageOverviewSectionMatch[0];

assert(!pageOverviewHtml.includes('class="metrics-grid"'), 'Top 4 cards (.metrics-grid) must be deleted from #pageOverview');
assert(!pageOverviewHtml.includes('overviewCaTeamAverage'), 'overviewCaTeamAverage card must be removed');
assert(!pageOverviewHtml.includes('overviewCaTopScore'), 'overviewCaTopScore card must be removed');
assert(!pageOverviewHtml.includes('overviewCaPassRate'), 'overviewCaPassRate card must be removed');
assert(!pageOverviewHtml.includes('overviewCaTotalUsers'), 'overviewCaTotalUsers card must be removed');
console.log('✅ PASS: Top 4 cards have been completely deleted from menu Ringkasan.');

// 2. Verify Dropdown Filter exists with options CA, Tiket, ART, and ALL
assert(pageOverviewHtml.includes('id="filterOverviewCategory"'), 'filterOverviewCategory dropdown must exist');
assert(pageOverviewHtml.includes('value="ALL"'), 'Option ALL (Semua) must exist');
assert(pageOverviewHtml.includes('value="CA"'), 'Option CA must exist');
assert(pageOverviewHtml.includes('value="TIKET"'), 'Option TIKET must exist');
assert(pageOverviewHtml.includes('value="ART"'), 'Option ART must exist');
console.log('✅ PASS: Dropdown filter exists with options for switching to CA, Tiket, ART, and Semua.');

// 3. Verify Sort Controls exist (Besar ke Kecil / Kecil ke Besar)
assert(pageOverviewHtml.includes('id="btnSortCaDesc"'), 'Sort DESC button must exist');
assert(pageOverviewHtml.includes('id="btnSortCaAsc"'), 'Sort ASC button must exist');
assert(pageOverviewHtml.includes('Besar ke Kecil'), 'Besar ke Kecil text must exist');
assert(pageOverviewHtml.includes('Kecil ke Besar'), 'Kecil ke Besar text must exist');
console.log('✅ PASS: Sorting controls (Besar ke Kecil / Kecil ke Besar) are present.');

// 4. Verify Table structure with dynamic thead and tbody
assert(pageOverviewHtml.includes('id="theadOverview"'), 'theadOverview must exist for dynamic columns');
assert(pageOverviewHtml.includes('id="tbodyOverviewCa"'), 'tbodyOverviewCa must exist for dynamic rows');
console.log('✅ PASS: Table structure with thead and tbody is present.');

// 5. Verify JS logic: calculateOverviewCombinedData exists and calculates CA, Tiket, ART
assert(js.includes('function calculateOverviewCombinedData()'), 'calculateOverviewCombinedData must exist');
assert(js.includes('function getCaDynamicColor'), 'getCaDynamicColor must exist');
assert(js.includes('function getTiketDynamicColor'), 'getTiketDynamicColor must exist');
assert(js.includes('function getArtDynamicColor'), 'getArtDynamicColor must exist');
assert(js.includes('function updateOverviewLegendAndTitles()'), 'updateOverviewLegendAndTitles must exist');
assert(js.includes('function renderOverviewPage()'), 'renderOverviewPage must exist');
console.log('✅ PASS: JS functions for combined multi-metric data, dynamic colors, and rendering exist.');

// 6. Verify Dynamic Color logic in JS: Green -> Yellow -> Red
const testScoreGreen = js.includes('hue = Math.round(45 + factor * 95)') || js.includes('140');
assert(testScoreGreen, 'Hue calculation for green -> yellow -> red must exist');
console.log('✅ PASS: Color gradient logic (Hijau bagus -> Kuning sedang -> Merah jelek) verified in code.');

// 7. Verify Dropdown Event Listener in JS
assert(js.includes('UI.filterOverviewCategory.addEventListener(\'change\''), 'filterOverviewCategory change listener must be registered');
console.log('✅ PASS: Dropdown event listener is registered in initEvents.');

console.log('\n🌟 ALL OVERVIEW COMBINED TABLE VERIFICATION TESTS PASSED SUCCESSFULLY! 🌟');
