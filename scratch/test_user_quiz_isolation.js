const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- TESTING QUIZ USER ISOLATION (CHARACTER & QUESTIONS) ---');

// Mock browser environment
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = String(value); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
    _dump: () => store
  };
})();

global.localStorage = localStorageMock;

// Mock minimal DOM
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
    addEventListener: () => {},
    querySelector: () => null,
    querySelectorAll: () => []
  };
  el.classList = {
    add: function(c) { if (!el.classes.includes(c)) el.classes.push(c); },
    remove: function(c) { el.classes = el.classes.filter(x => x !== c); },
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
const ids = [
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
  'textOptionA', 'textOptionB', 'textOptionC', 'textOptionD', 'textOptionE'
];

ids.forEach(id => {
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
global.confirm = () => true;
global.showToast = () => {};
global.playBattleAudio = () => {};

// Load app.js code and expose variables to global
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
global.finishQuizBattle = finishQuizBattle;
global.clearMyQuizHistory = clearMyQuizHistory;
`;

eval(appJsCode);
showToast = () => {};

console.log('[PASS] app.js loaded and executed in sandbox successfully');

// TEST 1: User 1 selects Ultraman Tiga
const user1 = { id: 'usr_user_1', username: 'user', fullName: 'Siti Rahma', role: 'user', department: 'CSO WA' };
const user2 = { id: 'usr_admin_1', username: 'admin', fullName: 'Budi Santoso', role: 'admin', department: 'CSO INBOUND' };
const user3 = { id: 'usr_user_2', username: 'ahmad_fauzi', fullName: 'Ahmad Fauzi', role: 'user', department: 'CSO BACK OFFICE' };

state.currentUser = user1;
selectQuizHero('tiga', true);
assert.strictEqual(getSelectedQuizHero().id, 'tiga', 'User 1 hero should be tiga');
assert.strictEqual(quizState.selectedHeroId, 'tiga', 'quizState hero should be tiga for user 1');

// TEST 2: Switch to User 2 (admin) -> should NOT be affected by User 1's hero
state.currentUser = user2;
assert.strictEqual(getSelectedQuizHero('usr_admin_1').id, 'iconnet', 'User 2 should default to iconnet');
selectQuizHero('zero', true);
assert.strictEqual(getSelectedQuizHero('usr_admin_1').id, 'zero', 'User 2 hero should be zero');

// Verify User 1's hero is still tiga
assert.strictEqual(getSelectedQuizHero('usr_user_1').id, 'tiga', 'User 1 hero must still be tiga after user 2 changed to zero');
console.log('[PASS] Character selection isolated between user 1 (tiga) and user 2 (zero)');

// TEST 3: Switch to User 3 -> Select Orb
state.currentUser = user3;
selectQuizHero('orb', true);
assert.strictEqual(getSelectedQuizHero('usr_user_2').id, 'orb', 'User 3 hero should be orb');
assert.strictEqual(getSelectedQuizHero('usr_user_1').id, 'tiga', 'User 1 hero still tiga');
assert.strictEqual(getSelectedQuizHero('usr_admin_1').id, 'zero', 'User 2 hero still zero');
console.log('[PASS] Character selection isolated across 3 distinct users');

// TEST 4: User 1 answers questions in battle
state.currentUser = user1;
syncQuizUserSession();
assert.strictEqual(quizState.activeUserId, 'usr_user_1', 'Active battle user should be usr_user_1');
assert.strictEqual(quizState.selectedHeroId, 'tiga', 'quizState hero for user 1 should be tiga');
assert.strictEqual(quizState.currentIndex, 0, 'User 1 starts at question index 0');

// User 1 answers question 1 correctly
const q1 = quizState.questions[0];
handleSelectQuizOption(q1.correctAnswer);
assert.strictEqual(quizState.answered, true, 'User 1 question 1 should be answered');
assert.strictEqual(quizState.correctCount, 1, 'User 1 correctCount should be 1');
assert.strictEqual(quizState.monsterHp < 100, true, 'Monster should have taken damage from User 1');
const user1MonsterHpAfterQ1 = quizState.monsterHp;
const user1ScoreAfterQ1 = quizState.score;

// User 1 moves to question 2
nextQuizQuestion();
assert.strictEqual(quizState.currentIndex, 1, 'User 1 should be on question index 1');
assert.strictEqual(quizState.answered, false, 'Question 2 should be unanswered');
console.log(`[PASS] User 1 progressed to Question 2 (Score: ${user1ScoreAfterQ1}, Monster HP: ${user1MonsterHpAfterQ1})`);

// TEST 5: Switch to User 2 -> User 2 must NOT see User 1's battle progress
state.currentUser = user2;
syncQuizUserSession();
assert.strictEqual(quizState.activeUserId, 'usr_admin_1', 'Active battle user should now be usr_admin_1');
assert.strictEqual(quizState.selectedHeroId, 'zero', 'User 2 hero should be zero');
assert.strictEqual(quizState.currentIndex, 0, 'User 2 must start at question index 0, NOT question 1');
assert.strictEqual(quizState.score, 0, 'User 2 score must be 0, NOT user 1 score');
assert.strictEqual(quizState.ultramanHp, 100, 'User 2 Ultraman HP must be 100');
assert.strictEqual(quizState.monsterHp, 100, 'User 2 Monster HP must be 100');
console.log('[PASS] User 2 starts clean battle at Q1 with 100/100 HP, untouched by User 1');

// TEST 6: User 2 answers question 1 wrongly
const u2Q1 = quizState.questions[0];
const wrongChoice = ['A', 'B', 'C', 'D', 'E'].find(c => c !== u2Q1.correctAnswer);
handleSelectQuizOption(wrongChoice);
assert.strictEqual(quizState.wrongCount, 1, 'User 2 wrongCount should be 1');
assert.strictEqual(quizState.ultramanHp < 100, true, 'User 2 Ultraman should have taken damage');
assert.strictEqual(quizState.monsterHp, 100, 'User 2 Monster HP should still be 100');
const user2UltramanHp = quizState.ultramanHp;

// TEST 7: Switch back to User 1 -> User 1 must be exactly where she left off!
state.currentUser = user1;
syncQuizUserSession();
assert.strictEqual(quizState.activeUserId, 'usr_user_1', 'Active battle user should be restored to usr_user_1');
assert.strictEqual(quizState.selectedHeroId, 'tiga', 'User 1 hero must be restored to tiga');
assert.strictEqual(quizState.currentIndex, 1, 'User 1 must still be on Question 2');
assert.strictEqual(quizState.score, user1ScoreAfterQ1, 'User 1 score must be preserved');
assert.strictEqual(quizState.monsterHp, user1MonsterHpAfterQ1, 'User 1 monster HP must be preserved');
assert.strictEqual(quizState.ultramanHp, 100, 'User 1 Ultraman HP must still be 100 (unaffected by User 2 damage)');
assert.strictEqual(quizState.correctCount, 1, 'User 1 correct count must still be 1');
console.log('[PASS] User 1 session fully restored with Q2, score 10, monster 90 HP, ultraman 100 HP');

// TEST 8: User 1 finishes quiz
while (quizState.currentIndex < quizState.questions.length) {
  const currQ = quizState.questions[quizState.currentIndex];
  handleSelectQuizOption(currQ.correctAnswer);
  if (quizState.currentIndex + 1 < quizState.questions.length) {
    nextQuizQuestion();
  } else {
    break;
  }
}
finishQuizBattle('ultimate', 100);

const history = state.getQuizHistory();
const user1History = history.filter(h => h.userId === 'usr_user_1');
assert.strictEqual(user1History.length > 0, true, 'User 1 history record should exist');
assert.strictEqual(user1History[0].score, 100, 'User 1 score in history should be 100');
assert.strictEqual(user1History[0].userId, 'usr_user_1', 'History must be tagged with usr_user_1');
console.log('[PASS] User 1 quiz finished and saved with userId usr_user_1');

// TEST 9: Switch to User 2 -> User 2 still has his in-progress battle!
state.currentUser = user2;
syncQuizUserSession();
assert.strictEqual(quizState.activeUserId, 'usr_admin_1', 'Active battle user should be usr_admin_1');
assert.strictEqual(quizState.currentIndex, 0, 'User 2 should still be at question 0');
assert.strictEqual(quizState.ultramanHp, user2UltramanHp, 'User 2 Ultraman HP must be preserved at damaged level');
assert.strictEqual(quizState.selectedHeroId, 'zero', 'User 2 hero still zero');
console.log('[PASS] User 2 in-progress battle completely unharmed after User 1 finished');

// TEST 10: Clear personal history for User 1
state.currentUser = user1;
clearMyQuizHistory();
const historyAfterClear = state.getQuizHistory();
assert.strictEqual(historyAfterClear.some(h => h.userId === 'usr_user_1'), false, 'User 1 history cleared');
console.log('[PASS] clearMyQuizHistory strictly clears only user 1 records');

console.log('\n--- ALL USER QUIZ ISOLATION TESTS PASSED 100%! ---');
