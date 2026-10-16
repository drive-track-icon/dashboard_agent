/**
 * Comprehensive Test: Quiz on New PC / Device
 * Verifies:
 * 1. Fresh PC storage initialization (empty localStorage) initializes zero dummy quiz history.
 * 2. Questions bank has the 10 clean active questions.
 * 3. Synchronization from Cloud preserves updated data and rejects all dummy records (QZH-1001, 1002, 1003, Budi Santoso, etc.).
 * 4. Deleted default questions from cloud are NEVER resurrected on fresh devices.
 * 5. Admin and User quiz leaderboard rendering is clean with zero dummy names.
 */

const assert = require('assert');

// 1. Mock Browser Environment
const localStorageMock = (function () {
  let store = {};
  return {
    getItem: (k) => store[k] !== undefined ? store[k] : null,
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
    clear: () => { store = {}; },
    _getStore: () => store
  };
})();

global.localStorage = localStorageMock;
global.sessionStorage = localStorageMock;

// Mock DOM elements
function createElement(tag, id = '') {
  return {
    tagName: tag.toUpperCase(),
    id: id,
    value: '',
    textContent: '',
    innerHTML: '',
    className: '',
    classList: {
      _classes: new Set(),
      add: function (c) { this._classes.add(c); },
      remove: function (c) { this._classes.delete(c); },
      contains: function (c) { return this._classes.has(c); },
      toggle: function (c, force) {
        if (force !== undefined) {
          if (force) this._classes.add(c); else this._classes.delete(c);
        } else {
          if (this._classes.has(c)) this._classes.delete(c); else this._classes.add(c);
        }
      }
    },
    style: {},
    attributes: {},
    setAttribute: function (k, v) { this.attributes[k] = v; },
    getAttribute: function (k) { return this.attributes[k]; },
    removeAttribute: function (k) { delete this.attributes[k]; },
    appendChild: function (child) {
      if (!this.children) this.children = [];
      this.children.push(child);
    },
    children: [],
    querySelectorAll: function () { return []; },
    querySelector: function () { return null; },
    addEventListener: function () {}
  };
}

const docElements = {
  // Navigation / Tabs
  btnTabQuizBattle: createElement('button', 'btnTabQuizBattle'),
  btnTabQuizLeaderboard: createElement('button', 'btnTabQuizLeaderboard'),
  btnTabQuizAdminBank: createElement('button', 'btnTabQuizAdminBank'),
  secQuizBattle: createElement('div', 'quizTabBattleSection'),
  secQuizLeaderboard: createElement('div', 'quizTabLeaderboardSection'),
  secQuizAdminBank: createElement('div', 'quizTabAdminBankSection'),
  quizPermissionBanner: createElement('div', 'quizPermissionBanner'),
  quizTitleThemeSuffix: createElement('span', 'quizTitleThemeSuffix'),
  quizPageDesc: createElement('p', 'quizPageDesc'),
  btnOpenAddQuestionModal: createElement('button', 'btnOpenAddQuestionModal'),

  // Battle Arena
  selectQuizHero: createElement('select', 'selectQuizHero'),
  quizBattleActiveUserLabel: createElement('div', 'quizBattleActiveUserLabel'),
  ultramanHpBar: createElement('div', 'ultramanHpBar'),
  ultramanHpLabel: createElement('span', 'ultramanHpLabel'),
  monsterHpBar: createElement('div', 'monsterHpBar'),
  monsterHpLabel: createElement('span', 'monsterHpLabel'),
  battleAnnouncer: createElement('div', 'battleAnnouncer'),
  battleAnnouncerText: createElement('span', 'battleAnnouncerText'),
  modalQuizResult: createElement('div', 'modalQuizResult'),

  // Leaderboard / History
  quizLeaderboardBanner: createElement('div', 'quizLeaderboardBanner'),
  quizLeaderboardBannerIcon: createElement('i', 'quizLeaderboardBannerIcon'),
  quizLeaderboardBannerTitle: createElement('h4', 'quizLeaderboardBannerTitle'),
  quizLeaderboardBannerDesc: createElement('p', 'quizLeaderboardBannerDesc'),
  quizLeaderboardBannerBadge: createElement('span', 'quizLeaderboardBannerBadge'),
  toolbarQuizAdminMonitor: createElement('div', 'toolbarQuizAdminMonitor'),
  thQuizHistoryAction: createElement('th', 'thQuizHistoryAction'),
  btnClearMyQuizHistory: createElement('button', 'btnClearMyQuizHistory'),
  quizHistoryTableTitle: createElement('h3', 'quizHistoryTableTitle'),
  quizHistoryTableDesc: createElement('p', 'quizHistoryTableDesc'),
  filterQuizHistoryUser: createElement('select', 'filterQuizHistoryUser'),
  filterQuizHistoryOutcome: createElement('select', 'filterQuizHistoryOutcome'),
  searchQuizHistoryInput: createElement('input', 'searchQuizHistoryInput'),
  btnClearSearchQuizHistory: createElement('button', 'btnClearSearchQuizHistory'),
  statQuizMyBestScore: createElement('h3', 'statQuizMyBestScore'),
  statQuizMyBestStatus: createElement('span', 'statQuizMyBestStatus'),
  statQuizTotalVictories: createElement('h3', 'statQuizTotalVictories'),
  statQuizWinRate: createElement('span', 'statQuizWinRate'),
  statQuizTotalPerfect: createElement('h3', 'statQuizTotalPerfect'),
  statQuizTotalPlayed: createElement('h3', 'statQuizTotalPlayed'),
  lblQuizStatCard1Tag: createElement('span', 'lblQuizStatCard1Tag'),
  lblQuizStatCard1Title: createElement('span', 'lblQuizStatCard1Title'),
  lblQuizStatCard2Title: createElement('span', 'lblQuizStatCard2Title'),
  lblQuizStatCard3Title: createElement('span', 'lblQuizStatCard3Title'),
  lblQuizStatCard4Title: createElement('span', 'lblQuizStatCard4Title'),
  lblQuizStatCard4Sub: createElement('span', 'lblQuizStatCard4Sub'),
  quizHistoryTableBody: createElement('tbody', 'quizHistoryTableBody'),

  // Admin Bank
  quizAdminQuestionsTableBody: createElement('tbody', 'quizAdminQuestionsTableBody'),
  chkQuizSelectAll: createElement('input', 'chkQuizSelectAll'),
  btnQuizSelectAll: createElement('button', 'btnQuizSelectAll'),
  btnQuizDeleteSelected: createElement('button', 'btnQuizDeleteSelected'),
  lblCountSelectedQuiz: createElement('span', 'lblCountSelectedQuiz')
};

global.document = {
  getElementById: (id) => docElements[id] || createElement('div', id),
  querySelectorAll: () => [],
  querySelector: () => null,
  addEventListener: () => {}
};

global.window = {
  localStorage: global.localStorage,
  sessionStorage: global.sessionStorage,
  addEventListener: () => {},
  document: global.document,
  DRIVE_FIREBASE_CONFIG: {
    apiKey: "AIzaSyBcoOc0mBtgNpUkA5k6uAgrKvdxXbtwluU",
    projectId: "dashboard-agent-adaro"
  }
};

// Load app.js and firebase-sync.js in sandbox
require('../js/app.js');
require('../js/firebase-sync.js');

const state = global.window.state;
const syncManager = global.window.FirebaseSync;

async function runTests() {
  console.log('=== TEST SUITE: Quiz on New Device & Data Cleanliness ===');

  // Test 1: Fresh Device Storage State
  console.log('\n1. Checking fresh PC storage initialization for Quiz...');
  const questions = state.getQuizQuestions();
  const history = state.getQuizHistory();

  console.log(`   Initial quiz questions count: ${questions.length}`);
  console.log(`   Initial quiz history count: ${history.length}`);

  assert.strictEqual(questions.length, 10, 'Expected 10 active quiz questions by default');
  assert.strictEqual(history.length, 0, 'Expected quiz history to be empty [] on fresh device');

  const dummyQuizIds = ['QZH-1001', 'QZH-1002', 'QZH-1003'];
  const hasDummy = history.some(h => dummyQuizIds.includes(h.id));
  assert.strictEqual(hasDummy, false, 'No dummy quiz history should exist');
  console.log('   ✓ Zero dummy quiz history records found on fresh device initialization!');

  // Test 2: Two-way Cloud Merge Protection
  console.log('\n2. Testing Cloud Firestore Merge Protection for Quiz Questions & History...');
  const deletedHistoryIds = syncManager.getDeletedIds('vortex_quiz_history');
  assert.ok(deletedHistoryIds.has('QZH-1001'), 'Deleted history IDs must track QZH-1001');
  assert.ok(deletedHistoryIds.has('QZH-1002'), 'Deleted history IDs must track QZH-1002');
  assert.ok(deletedHistoryIds.has('QZH-1003'), 'Deleted history IDs must track QZH-1003');
  console.log('   ✓ Legacy demo quiz history IDs are permanently blacklisted in getDeletedIds');

  // Test 2b: isDummyItem identification
  assert.ok(syncManager.isDummyItem({ id: 'QZH-1001' }));
  assert.ok(syncManager.isDummyItem({ id: 'QZH-1003', userFullName: 'Budi Santoso, S.Kom' }));
  assert.ok(syncManager.isDummyItem({ userFullName: 'Siti Rahma' }));
  assert.strictEqual(syncManager.isDummyItem({ id: 'QZH-9999', userFullName: 'Sugeng Riyadi', userId: 'usr_1791919849049' }), false);
  console.log('   ✓ isDummyItem accurately distinguishes dummy quiz records from real agent records');

  // Test 2c: Authoritative Bank Soal Merging
  // Suppose cloud has 9 questions (admin intentionally deleted QZ-010)
  const remoteQuestions9 = questions.slice(0, 9);
  const localQuestions10 = [...questions]; // 10 questions from fresh device default
  const mergeResult = syncManager.mergeCollections('vortex_quiz_questions', localQuestions10, remoteQuestions9, new Set());
  assert.strictEqual(mergeResult.merged.length, 9, 'Cloud must remain authoritative: deleted QZ-010 must NOT be resurrected!');
  assert.strictEqual(mergeResult.hasLocalOverrides, false, 'Fresh device default questions must not trigger local overrides on cloud');
  console.log('   ✓ Deleted default questions on cloud are NEVER resurrected by new devices!');

  // Test 3: Admin Leaderboard Render & User Filter Roster
  console.log('\n3. Testing Quiz Leaderboard rendering for Admin...');
  state.currentUser = {
    id: 'usr_admin_1',
    username: 'admin',
    fullName: 'Admin Icon',
    role: 'admin',
    department: 'TEAM LEADER'
  };

  global.window.renderQuizLeaderboard();

  const userDropdown = docElements.filterQuizHistoryUser;
  console.log(`   User filter dropdown options HTML: ${userDropdown.innerHTML.substring(0, 100)}...`);
  
  // Verify that dummy names do not appear in options
  const dropHtml = userDropdown.innerHTML.toLowerCase();
  assert.ok(!dropHtml.includes('siti rahma'), 'Siti Rahma must not be in user dropdown');
  assert.ok(!dropHtml.includes('ahmad fauzi'), 'Ahmad Fauzi must not be in user dropdown');
  assert.ok(!dropHtml.includes('dewi lestari'), 'Dewi Lestari must not be in user dropdown');
  assert.ok(!dropHtml.includes('budi santoso'), 'Budi Santoso must not be in user dropdown');
  assert.ok(dropHtml.includes('admin icon'), 'Admin Icon must be in user dropdown');
  assert.ok(dropHtml.includes('sugeng riyadi'), 'Sugeng Riyadi must be in user dropdown');
  console.log('   ✓ Quiz history user dropdown contains ONLY updated active team members!');

  // Check stat cards
  assert.strictEqual(docElements.statQuizTotalPlayed.textContent, 0, 'Total sessions must be 0');
  console.log('   ✓ Admin stat cards correctly reflect clean team state (0 sessions)');

  // Test 4: Completing a Real Quiz Battle as Regular User
  console.log('\n4. Simulating Quiz Battle completion by real agent (sugeng.riyadi)...');
  state.currentUser = {
    id: 'usr_1791919849049',
    username: 'sugeng.riyadi',
    fullName: 'Sugeng Riyadi',
    role: 'user',
    department: 'CSO DIGILIVE CHAT - WA'
  };

  const currentHist = state.getQuizHistory();
  const newHistItem = {
    id: 'QZH-' + Date.now(),
    userId: state.currentUser.id,
    userFullName: state.currentUser.fullName,
    username: state.currentUser.username,
    department: state.currentUser.department,
    score: 100,
    correctCount: 10,
    totalQuestions: 10,
    outcome: 'sempurna',
    duration: '01:25',
    timestamp: '2026-10-17 03:30'
  };
  currentHist.unshift(newHistItem);
  state.saveQuizHistory(currentHist);

  // Render for regular user
  global.window.renderQuizLeaderboard();
  assert.strictEqual(docElements.statQuizTotalPlayed.textContent, 1, 'User sees their 1 session');
  assert.ok(docElements.statQuizMyBestScore.innerHTML.includes('100'), 'User sees their score of 100');
  console.log('   ✓ Regular user successfully records battle session in private mode');

  // Now render for Admin
  state.currentUser = {
    id: 'usr_admin_1',
    username: 'admin',
    fullName: 'Admin Icon',
    role: 'admin',
    department: 'TEAM LEADER'
  };
  global.window.renderQuizLeaderboard();
  assert.strictEqual(docElements.statQuizTotalPlayed.textContent, 1, 'Admin monitors 1 real session');
  assert.ok(docElements.statQuizMyBestStatus.textContent.includes('Sugeng Riyadi'), 'Top performer shows Sugeng Riyadi');
  console.log('   ✓ Admin monitor reflects real agent quiz result with accurate top performer!');

  console.log('\n=============================================');
  console.log('🎉 ALL TESTS PASSED: Quiz on new PC / device fully verified!');
  console.log('=============================================\n');
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
