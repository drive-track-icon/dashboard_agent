const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- RUNNING TEST: HERO DROPDOWN & DAMAGE TEXT REMOVAL ---');

const baseDir = path.resolve(__dirname, '..');
const indexHtmlPath = path.join(baseDir, 'index.html');
const appJsPath = path.join(baseDir, 'js', 'app.js');
const cssPath = path.join(baseDir, 'css', 'style.css');

const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const appJs = fs.readFileSync(appJsPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');

// 1. Verify "Pahlawan Aktif: ULTRAMAN ICONNET" is completely removed
assert(!indexHtml.includes('Pahlawan Aktif:'), 'Pahlawan Aktif: still found in index.html');
assert(!appJs.includes('Pahlawan Aktif:'), 'Pahlawan Aktif: still found in app.js');
console.log('[PASS] "Pahlawan Aktif: ULTRAMAN ICONNET" is completely removed');

// 2. Verify old hero select roster bar is removed from index.html
assert(!indexHtml.includes('id="quizHeroSelectBar"'), '#quizHeroSelectBar still found in index.html');
assert(!indexHtml.includes('id="heroSelectRoster"'), '#heroSelectRoster still found in index.html');
console.log('[PASS] Old quizHeroSelectBar removed');

// 3. Verify dropdown exists inside CYBER ARENA ICONNET (within quizBattleStage)
assert(indexHtml.includes('id="quizHeroSelectDropdownGroup"'), '#quizHeroSelectDropdownGroup missing in index.html');
assert(indexHtml.includes('id="selectQuizHero"'), '#selectQuizHero missing in index.html');
assert(indexHtml.includes('Pilih Karakter Ultraman Anda:'), '"Pilih Karakter Ultraman Anda:" label missing in index.html');

// Verify it is inside quizBattleStage
const arenaStart = indexHtml.indexOf('id="quizBattleStage"');
const dropdownPos = indexHtml.indexOf('id="selectQuizHero"');
const cardPromptPos = indexHtml.indexOf('id="quizQuestionCard"');
assert(arenaStart !== -1 && dropdownPos > arenaStart && dropdownPos < cardPromptPos, 'Dropdown is not inside CYBER ARENA ICONNET');
console.log('[PASS] "Pilih Karakter Ultraman Anda:" dropdown is positioned inside "CYBER ARENA ICONNET"');

// 4. Verify "-10HP!" removal
assert(!appJs.includes('HP!'), 'HP! text still set in app.js');
assert(!appJs.includes('monsterDamageFloat.textContent = `-${Math.round(damage)}'), 'monsterDamageFloat text still set in app.js');
assert(!appJs.includes('heroDamageFloat.textContent = `-${Math.round(damage)}'), 'heroDamageFloat text still set in app.js');
assert(!appJs.includes('(-${Math.round(damagePerQuestion)} HP)'), 'Announcer still has HP deduction suffix in app.js');
assert(!indexHtml.includes('id="ultramanDamageFloat"'), 'ultramanDamageFloat element still present in index.html');
assert(!indexHtml.includes('id="monsterDamageFloat"'), 'monsterDamageFloat element still present in index.html');
assert(css.includes('.floating-damage-box {\n  display: none !important;'), 'floating-damage-box not hidden in style.css');
console.log('[PASS] "-10HP!" floating and announcer text is completely removed');

// 5. Verify dropdown logic in app.js
assert(appJs.includes("document.getElementById('selectQuizHero')"), 'selectQuizHero not referenced in app.js');
assert(appJs.includes('dropdown.value = hero.id'), 'Dropdown value update missing in selectQuizHero');
console.log('[PASS] Dropdown selection logic verified in app.js');

console.log('\n--- ALL TESTS PASSED! ---');
