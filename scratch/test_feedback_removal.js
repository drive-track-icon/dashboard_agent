const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- RUNNING TEST: FEEDBACK/PEMBAHASAN REMOVAL ---');

const baseDir = path.resolve(__dirname, '..');
const indexHtml = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
const appJs = fs.readFileSync(path.join(baseDir, 'js', 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(baseDir, 'css', 'style.css'), 'utf8');

// 1. Verify HTML: feedback badges and explanation box removed
assert(!indexHtml.includes('id="quizFeedbackBadge"'), '#quizFeedbackBadge still in index.html');
assert(!indexHtml.includes('id="quizFeedbackDamage"'), '#quizFeedbackDamage still in index.html');
assert(!indexHtml.includes('id="quizFeedbackExplanation"'), '#quizFeedbackExplanation still in index.html');
assert(indexHtml.includes('id="btnNextQuestion"'), '#btnNextQuestion missing in index.html');
assert(indexHtml.includes('id="quizFeedbackBox"'), '#quizFeedbackBox missing in index.html');
console.log('[PASS] Feedback header, badges, and explanation removed from index.html');

// 2. Verify JS: no references to removed elements
assert(!appJs.includes('quizFeedbackBadge'), 'quizFeedbackBadge still referenced in app.js');
assert(!appJs.includes('quizFeedbackDamage'), 'quizFeedbackDamage still referenced in app.js');
assert(!appJs.includes('quizFeedbackExplanation'), 'quizFeedbackExplanation still referenced in app.js');
assert(appJs.includes('Lihat Animasi &amp; Nilai Akhir'), 'Lihat Animasi & Nilai Akhir text missing in app.js');
assert(appJs.includes('Lanjut ke Soal Berikutnya'), 'Lanjut ke Soal Berikutnya text missing in app.js');
console.log('[PASS] app.js cleanly operates with only the navigation button');

// 3. Verify CSS: .quiz-feedback-box is transparent without explanation borders
assert(css.includes('background: transparent;'), 'quiz-feedback-box not transparent in style.css');
assert(css.includes('#btnNextQuestion {'), '#btnNextQuestion styling missing in style.css');
console.log('[PASS] CSS styling for action button verified');

console.log('\n--- ALL VERIFICATIONS PASSED SUCCESSFULLY! ---');
