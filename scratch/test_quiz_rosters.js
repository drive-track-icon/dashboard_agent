const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- RUNNING QUIZ ROSTERS & FEATURES VERIFICATION ---');

const baseDir = path.resolve(__dirname, '..');
const assetsDir = path.join(baseDir, 'assets');
const appJsPath = path.join(baseDir, 'js', 'app.js');
const indexHtmlPath = path.join(baseDir, 'index.html');
const cssPath = path.join(baseDir, 'css', 'style.css');

// 1. Verify Image Assets
const requiredImages = [
  'ultraman_iconnet.jpg',
  'ultraman_zero.jpg',
  'ultraman_tiga.jpg',
  'ultraman_geed.jpg',
  'ultraman_orb.jpg',
  'ultraman_blazar.jpg',
  'monster_giga_lag.jpg',
  'monster_packet_loss.jpg',
  'monster_ping_inferno.jpg',
  'monster_bandwidth_devourer.jpg',
  'monster_cyber_glitch.jpg',
  'monster_latency_titan.jpg'
];

requiredImages.forEach(img => {
  const p = path.join(assetsDir, img);
  assert(fs.existsSync(p), `Image file missing: ${img}`);
  const stat = fs.statSync(p);
  assert(stat.size > 1000, `Image file is empty or corrupted: ${img} (${stat.size} bytes)`);
  console.log(`[PASS] Asset verified: ${img} (${Math.round(stat.size / 1024)} KB)`);
});

// 2. Verify app.js content & logic
const appJs = fs.readFileSync(appJsPath, 'utf8');

assert(appJs.includes('const ULTRAMAN_ROSTER = ['), 'ULTRAMAN_ROSTER array missing in app.js');
assert(appJs.includes('const MONSTER_ROSTER = ['), 'MONSTER_ROSTER array missing in app.js');
assert(appJs.includes('function renderHeroSelector('), 'renderHeroSelector function missing');
assert(appJs.includes('function selectQuizHero('), 'selectQuizHero function missing');
assert(appJs.includes('function getSelectedQuizHero('), 'getSelectedQuizHero function missing');

// Check 6 Ultramans
['iconnet', 'zero', 'tiga', 'geed', 'orb', 'blazar'].forEach(id => {
  assert(appJs.includes(`id: '${id}'`), `Ultraman hero ${id} not found in ULTRAMAN_ROSTER`);
});
console.log('[PASS] 6 Ultraman Heroes found in roster');

// Check 6 Monsters
['giga_lag', 'packet_loss', 'ping_inferno', 'bandwidth_devourer', 'cyber_glitch', 'latency_titan'].forEach(id => {
  assert(appJs.includes(`id: '${id}'`), `Monster ${id} not found in MONSTER_ROSTER`);
});
console.log('[PASS] 6 Monster Kaijus found in roster');

// 3. Verify Forbidden Hidden Strings
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

assert(!indexHtml.includes('Palapa Ring Sky City •'), 'Palapa Ring Sky City • should be hidden/removed from index.html');
assert(!appJs.includes("setBattleAnnouncer('Monster Giga Lag terdeteksi"), 'Old initial announcer message still present in app.js');
assert(!appJs.includes("tableDesc.textContent = 'Tabel rekapitulasi nilai kuis"), 'Old tableDesc text still being set in app.js');
console.log('[PASS] All 3 specified strings are hidden/removed cleanly');

// 4. Verify HTML Elements for hero selection and arena
assert(indexHtml.includes('id="quizHeroSelectDropdownGroup"'), '#quizHeroSelectDropdownGroup missing in index.html');
assert(indexHtml.includes('id="selectQuizHero"'), '#selectQuizHero missing in index.html');
assert(indexHtml.includes('id="quizBattleStage"'), '#quizBattleStage missing in index.html');
assert(indexHtml.includes('id="quizQuestionCard"'), '#quizQuestionCard missing in index.html');
console.log('[PASS] Dropdown selector & Arena containers found in index.html');

// 5. Verify CSS rules
const css = fs.readFileSync(cssPath, 'utf8');
assert(css.includes('.hero-select-dropdown-group'), '.hero-select-dropdown-group CSS missing');
assert(css.includes('.hero-select-dropdown'), '.hero-select-dropdown CSS missing');
assert(css.includes('.quiz-battle-stage'), '.quiz-battle-stage CSS missing');
assert(css.includes('.quiz-question-card'), '.quiz-question-card CSS missing');
console.log('[PASS] CSS classes for compact card & hero selector verified');

console.log('\n--- ALL VERIFICATION TESTS PASSED SUCCESSFULLY! ---');
