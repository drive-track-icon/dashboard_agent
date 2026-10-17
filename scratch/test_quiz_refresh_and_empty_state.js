const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== TEST: QUIZ REFRESH, EMPTY STATE, VICTORY GUARD & BANK DELETION ===');

// Mock localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: (key) => store[key] !== undefined ? store[key] : null,
    setItem: (key, value) => { store[key] = String(value); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
    key: (i) => Object.keys(store)[i] || null,
    get length() { return Object.keys(store).length; },
    _dump: () => store
  };
})();

global.localStorage = localStorageMock;

// Mock DOM elements
function createElementMock(id, tag = 'div') {
  const el = {
    id,
    tagName: tag.toUpperCase(),
    innerHTML: '',
    textContent: '',
    value: '',
    className: '',
    classes: [],
    style: {},
    dataset: {},
    listeners: {},
    addEventListener: function(evt, handler) {
      if (!this.listeners[evt]) this.listeners[evt] = [];
      this.listeners[evt].push(handler);
    },
    click: function() {
      if (this.listeners['click']) {
        this.listeners['click'].forEach(fn => fn({ preventDefault: () => {} }));
      }
    },
    querySelector: () => null,
    querySelectorAll: () => []
  };
  el.classList = {
    add: function(...args) {
      args.forEach(c => {
        if (!el.classes.includes(c)) el.classes.push(c);
      });
      el.className = el.classes.join(' ');
    },
    remove: function(...args) {
      el.classes = el.classes.filter(x => !args.includes(x));
      el.className = el.classes.join(' ');
    },
    toggle: function(c, force) {
      if (force === undefined) {
        if (el.classes.includes(c)) this.remove(c); else this.add(c);
      } else if (force) {
        this.add(c);
      } else {
        this.remove(c);
      }
    },
    contains: function(c) { return el.classes.includes(c); }
  };
  return el;
}

const domElements = {};
const allIds = [
  'selectQuizHero', 'avatarUltraman', 'cardUltramanHero', 'animHeroImg',
  'avatarMonster', 'cardMonsterEnemy', 'animMonsterImg', 'quizBattleActiveUserLabel',
  'quizProgressText', 'quizLiveScoreText', 'quizStreakText', 'quizQuestionCategory',
  'quizQuestionPointBadge', 'quizQuestionProgressFill', 'quizQuestionPrompt',
  'quizFeedbackBox', 'btnNextQuestion', 'ultramanHpBar', 'ultramanHpLabel',
  'ultramanColorTimer', 'monsterHpBar', 'monsterHpLabel', 'battleAnnouncer',
  'battleAnnouncerText', 'spaciumBeamFx', 'monsterStrikeFx', 'quizSpecialAnimOverlay',
  'modalQuizResult', 'quizResultHeader', 'quizResultTitle', 'quizResultOutcomeBadge',
  'quizResultOutcomeDesc', 'quizUltimateBanner', 'quizResultScoreCard',
  'resultStatItemMonster', 'resultStatItemDuration', 'quizResultCorrectCount',
  'quizResultWrongCount', 'quizResultDuration', 'quizResultMonsterStatus',
  'quizReviewCountBadge', 'quizReviewList', 'quizLeaderboardBanner',
  'quizLeaderboardBannerIcon', 'quizLeaderboardBannerTitle', 'quizLeaderboardBannerDesc',
  'quizLeaderboardBannerBadge', 'toolbarQuizAdminMonitor', 'thQuizHistoryAction',
  'btnClearMyQuizHistory', 'quizHistoryTableTitle', 'quizHistoryTableDesc',
  'filterQuizHistoryUser', 'filterQuizHistoryOutcome', 'searchQuizHistoryInput',
  'btnClearSearchQuizHistory', 'statQuizMyBestScore', 'statQuizMyBestStatus',
  'statQuizTotalVictories', 'statQuizWinRate', 'statQuizTotalPerfect',
  'statQuizTotalPlayed', 'lblQuizStatCard1Tag', 'lblQuizStatCard1Title',
  'lblQuizStatCard2Title', 'lblQuizStatCard3Title', 'lblQuizStatCard4Title',
  'lblQuizStatCard4Sub', 'quizHistoryTableBody', 'btnTabQuizBattle',
  'btnTabQuizLeaderboard', 'btnTabQuizAdminBank', 'quizTabBattleSection',
  'quizTabLeaderboardSection', 'quizTabAdminBankSection', 'btnOpenAddQuestionModal',
  'quizTitleThemeSuffix', 'quizPageDesc', 'quizPermissionBanner',
  'btnOptionA', 'btnOptionB', 'btnOptionC', 'btnOptionD', 'btnOptionE',
  'textOptionA', 'textOptionB', 'textOptionC', 'textOptionD', 'textOptionE',
  'btnRestartQuiz', 'quizEmptyStateBox', 'btnQuizEmptyRefresh', 'btnQuizEmptyAddQuestion',
  'quizQuestionBody', 'quizOptionsGrid', 'quizQuestionCard'
];

allIds.forEach(id => {
  domElements[id] = createElementMock(id);
});

global.document = {
  createElement: (tag) => createElementMock('mock_' + Date.now(), tag),
  getElementById: (id) => domElements[id] || null,
  querySelector: (sel) => {
    if (sel.includes('cardUltramanHero .fighter-name')) return { textContent: '' };
    if (sel.includes('cardUltramanHero .fighter-title')) return { textContent: '' };
    if (sel.includes('cardUltramanHero .fighter-type-tag')) return { textContent: '' };
    if (sel.includes('cardMonsterEnemy .fighter-name')) return { textContent: '' };
    if (sel.includes('cardMonsterEnemy .fighter-title')) return { textContent: '' };
    if (sel.includes('cardMonsterEnemy .fighter-type-tag')) return { textContent: '' };
    if (sel.includes('anim-fighter-label')) return { textContent: '', className: '', innerHTML: '' };
    return null;
  },
  querySelectorAll: () => [],
  addEventListener: () => {},
  documentElement: { style: { setProperty: () => {} } },
  body: { setAttribute: () => {}, classList: { add: () => {}, remove: () => {} } }
};

global.window = global;
global.window.addEventListener = () => {};
global.confirm = () => true;
global.showToast = () => {};
global.playBattleAudio = () => {};

// Load app.js
const appJsPath = path.resolve(__dirname, '..', 'js', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf8');
appJsCode += `
global.state = state;
global.quizState = quizState;
global.selectQuizHero = selectQuizHero;
global.getSelectedQuizHero = getSelectedQuizHero;
global.syncQuizUserSession = syncQuizUserSession;
global.loadUserQuizSession = loadUserQuizSession;
global.saveActiveUserQuizSession = saveActiveUserQuizSession;
global.startQuizBattle = startQuizBattle;
global.handleSelectQuizOption = handleSelectQuizOption;
global.nextQuizQuestion = nextQuizQuestion;
global.triggerQuizFinishWithSpecialAnim = triggerQuizFinishWithSpecialAnim;
global.finishQuizBattle = finishQuizBattle;
global.syncQuizArenaWithCurrentBank = syncQuizArenaWithCurrentBank;
global.purgeQuizQuestionFromAllSessions = purgeQuizQuestionFromAllSessions;
global.renderQuizEmptyState = renderQuizEmptyState;
global.promptDeleteQuizQuestion = promptDeleteQuizQuestion;
global.initQuizBattle = initQuizBattle;
`;

eval(appJsCode);
initQuizBattle();

// Set currentUser to Admin
state.currentUser = {
  id: 'usr_admin_1',
  username: 'admin',
  fullName: 'Administrator',
  role: 'admin'
};

// 1. TEST EMPTY STATE: When bank has 0 questions
console.log('\n[1] Testing Empty Quiz Bank Behavior...');
state.saveQuizQuestions([]);
startQuizBattle();

assert.strictEqual(quizState.questions.length, 0, 'quizState.questions must be empty when bank is empty');
assert.strictEqual(domElements['quizEmptyStateBox'].classList.contains('hidden'), false, 'quizEmptyStateBox must be visible');
assert.strictEqual(domElements['quizQuestionPrompt'].textContent, 'Tidak ada soal', 'quizQuestionPrompt must show "Tidak ada soal"');
assert.strictEqual(domElements['quizProgressText'].textContent, '0 / 0', 'quizProgressText must show 0 / 0');
assert.strictEqual(domElements['modalQuizResult'].classList.contains('hidden'), true, 'modalQuizResult must be hidden when bank is empty');
assert.strictEqual(domElements['quizSpecialAnimOverlay'].classList.contains('hidden'), true, 'quizSpecialAnimOverlay must be hidden when bank is empty');
console.log('✓ PASS: Empty bank displays "Tidak ada soal" without victory/defeat popup.');

// 2. TEST VICTORY GUARD: Results ONLY show when all questions are answered
console.log('\n[2] Testing Strict Victory Guard (Only after ALL questions answered)...');
const sampleQuestions = [
  { id: 'Q-1', prompt: 'Soal Nomor 1', correctAnswer: 'A', options: { A: 'A1', B: 'B1', C: 'C1', D: 'D1', E: 'E1' }, category: 'Informasi' },
  { id: 'Q-2', prompt: 'Soal Nomor 2', correctAnswer: 'B', options: { A: 'A2', B: 'B2', C: 'C2', D: 'D2', E: 'E2' }, category: 'Informasi' }
];
state.saveQuizQuestions(sampleQuestions);
startQuizBattle();

assert.strictEqual(quizState.questions.length, 2, 'quizState must load 2 questions');
assert.strictEqual(domElements['quizEmptyStateBox'].classList.contains('hidden'), true, 'quizEmptyStateBox must be hidden when questions exist');
assert.strictEqual(domElements['quizProgressText'].textContent, '1 / 2', 'Progress must be 1 / 2');

// Premature finish attempt must be blocked
triggerQuizFinishWithSpecialAnim();
assert.strictEqual(domElements['modalQuizResult'].classList.contains('hidden'), true, 'modalQuizResult must NOT show if questions are unanswered');
assert.strictEqual(quizState.isFinished, false, 'quizState.isFinished must remain false');

// Answer question 1
handleSelectQuizOption('A');
assert.strictEqual(quizState.userAnswers.length, 1, '1 answer recorded');
nextQuizQuestion();
assert.strictEqual(quizState.currentIndex, 1, 'Current index moved to 1 (question 2)');
assert.strictEqual(domElements['quizProgressText'].textContent, '2 / 2', 'Progress must be 2 / 2');
assert.strictEqual(domElements['modalQuizResult'].classList.contains('hidden'), true, 'modalQuizResult must NOT show yet on question 2');

// Answer question 2 (last question)
handleSelectQuizOption('B');
assert.strictEqual(quizState.userAnswers.length, 2, 'All 2 answers recorded');
nextQuizQuestion(); // Triggers finish since all answered!
// Execute callback from anim or finish
finishQuizBattle('ultimate', 100);

assert.strictEqual(quizState.isFinished, true, 'Quiz battle is marked finished');
assert.strictEqual(domElements['modalQuizResult'].classList.contains('hidden'), false, 'modalQuizResult is shown now that ALL questions were answered');
console.log('✓ PASS: Victory only appears strictly after all questions are answered.');

// 3. TEST DELETED QUESTIONS NEVER REAPPEAR
console.log('\n[3] Testing Deleted Questions Never Reappear in Bank or Arena...');
const bankThree = [
  { id: 'Q-10', prompt: 'Pertanyaan 10', correctAnswer: 'A', options: { A: '1', B: '2', C: '3', D: '4', E: '5' } },
  { id: 'Q-20', prompt: 'Pertanyaan 20', correctAnswer: 'B', options: { A: '1', B: '2', C: '3', D: '4', E: '5' } },
  { id: 'Q-30', prompt: 'Pertanyaan 30', correctAnswer: 'C', options: { A: '1', B: '2', C: '3', D: '4', E: '5' } }
];
state.saveQuizQuestions(bankThree);
startQuizBattle();
assert.strictEqual(quizState.questions.length, 3, 'Arena initially has 3 questions');

// Admin deletes Q-20
promptDeleteQuizQuestion('Q-20');

// Verify state
const remainingBank = state.getQuizQuestions();
assert.strictEqual(remainingBank.some(q => q.id === 'Q-20'), false, 'Q-20 must not be in bank');
assert.strictEqual(quizState.questions.some(q => q.id === 'Q-20'), false, 'Q-20 must not be in active quiz arena');

// Simulate reload user session from storage
loadUserQuizSession('usr_admin_1');
assert.strictEqual(quizState.questions.some(q => q.id === 'Q-20'), false, 'Q-20 must not reappear when session is reloaded');

// Even if raw storage held Q-20, getQuizQuestions() filters out deleted ID
localStorage.setItem('vortex_quiz_questions', JSON.stringify(bankThree));
const safeQuestions = state.getQuizQuestions();
assert.strictEqual(safeQuestions.some(q => q.id === 'Q-20'), false, 'state.getQuizQuestions() filters deleted ID permanently');
console.log('✓ PASS: Deleted questions are permanently excluded and never reappear.');

// 4. TEST ARENA SHOWS LATEST UPDATED QUESTION
console.log('\n[4] Testing Arena Updates to Latest Question Content...');
const updatedBank = [
  { id: 'Q-10', prompt: 'Pertanyaan 10 UPDATED BARU', correctAnswer: 'A', options: { A: 'Baru 1', B: 'Baru 2', C: 'Baru 3', D: 'Baru 4', E: 'Baru 5' } },
  { id: 'Q-30', prompt: 'Pertanyaan 30 UPDATED BARU', correctAnswer: 'C', options: { A: '1', B: '2', C: '3', D: '4', E: '5' } }
];
state.saveQuizQuestions(updatedBank);
syncQuizArenaWithCurrentBank();

assert.strictEqual(quizState.questions[0].prompt, 'Pertanyaan 10 UPDATED BARU', 'Arena must reflect updated question prompt');
assert.strictEqual(domElements['quizQuestionPrompt'].textContent, 'Pertanyaan 10 UPDATED BARU', 'DOM must display latest updated question prompt');
console.log('✓ PASS: Arena strictly displays updated latest questions.');

// 5. TEST "MUAT ULANG" BUTTON
console.log('\n[5] Testing "Muat Ulang" Button Event...');
domElements['btnRestartQuiz'].click();
assert.strictEqual(quizState.currentIndex, 0, 'Muat Ulang restarts arena from index 0');
assert.strictEqual(quizState.questions.length, 2, 'Muat Ulang loaded 2 fresh questions from bank');

// Empty bank and click Muat Ulang
state.saveQuizQuestions([]);
domElements['btnRestartQuiz'].click();
assert.strictEqual(quizState.questions.length, 0, 'Muat Ulang on empty bank gives 0 questions');
assert.strictEqual(domElements['quizEmptyStateBox'].classList.contains('hidden'), false, 'Muat Ulang on empty bank displays empty state box');
assert.strictEqual(domElements['quizQuestionPrompt'].textContent, 'Tidak ada soal', 'Muat Ulang on empty bank displays "Tidak ada soal"');
console.log('✓ PASS: "Muat Ulang" button refreshes quiz with latest bank questions and shows empty state when 0.');

console.log('\n=== ALL QUIZ REFRESH & EMPTY STATE TESTS PASSED 100%! ===');
