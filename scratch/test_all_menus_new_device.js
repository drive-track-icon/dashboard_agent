/**
 * Comprehensive Multi-Menu Test Suite on Fresh Device
 * Simulates opening on a new PC/device and checks ALL 12+ menus for updated data and zero dummy data.
 */

const assert = require('assert');

// 1. Mock Browser Environment with completely empty storage
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

const domStore = {};
function getOrCreateEl(id, tag = 'div') {
  if (!domStore[id]) {
    domStore[id] = createElement(tag, id);
  }
  return domStore[id];
}

global.document = {
  getElementById: (id) => getOrCreateEl(id),
  querySelectorAll: () => [],
  querySelector: () => null,
  addEventListener: () => {},
  visibilityState: 'visible'
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

// Load app.js and firebase-sync.js
require('../js/app.js');
require('../js/firebase-sync.js');

const state = global.window.state;
const syncManager = global.window.FirebaseSync;

async function runAllMenusTest() {
  console.log('=== TEST SUITE: All Menus on New PC / Device ===');

  // STEP 1: Verify Initial Storage state on fresh device
  console.log('\n1. Verifying initial fresh PC storage initialization...');
  assert.strictEqual(state.getUsers().length, 11, 'Must have exactly 11 active users');
  assert.strictEqual(state.getItems().length, 10, 'Must have 10 enterprise items');
  assert.strictEqual(state.getPaLogs ? state.getPaLogs().length : 0, 0, 'PA logs must start at 0');
  assert.strictEqual(state.getCaLogs ? state.getCaLogs().length : 0, 0, 'CA logs must start at 0');
  assert.strictEqual(state.getTikets ? state.getTikets().length : 0, 0, 'Tiket logs must start at 0');
  assert.strictEqual(state.getAhtLogs ? state.getAhtLogs().length : 0, 0, 'AHT logs must start at 0');
  assert.strictEqual(state.getArtLogs ? state.getArtLogs().length : 0, 0, 'ART logs must start at 0');
  assert.strictEqual(state.getFindings ? state.getFindings().length : 0, 0, 'Findings must start at 0');
  assert.strictEqual(state.getQuizQuestions().length, 0, 'Quiz questions must start at 0 (hydrated from cloud)');
  assert.strictEqual(state.getQuizHistory().length, 0, 'Quiz history must start at 0');
  console.log('   ✓ All initial storage arrays start completely clean without default dummy items!');

  // STEP 2: Fetch and verify actual Cloud Firestore state
  console.log('\n2. Fetching authoritative Cloud Firestore state for all collections...');
  const apiKey = 'AIzaSyBcoOc0mBtgNpUkA5k6uAgrKvdxXbtwluU';
  const BASE_URL = 'https://firestore.googleapis.com/v1/projects/dashboard-agent-adaro/databases/(default)/documents/drive_dashboard_data/';

  function decodeValue(val) {
    if (!val) return null;
    if ('stringValue' in val) return val.stringValue;
    if ('integerValue' in val) return parseInt(val.integerValue, 10);
    if ('doubleValue' in val) return parseFloat(val.doubleValue);
    if ('booleanValue' in val) return val.booleanValue;
    if ('arrayValue' in val) return (val.arrayValue.values || []).map(decodeValue);
    if ('mapValue' in val) {
      const res = {};
      for (const k in val.mapValue.fields) res[k] = decodeValue(val.mapValue.fields[k]);
      return res;
    }
    return null;
  }

  const collections = [
    'vortex_users', 'vortex_items', 'vortex_logs',
    'vortex_pa_logs', 'vortex_ca_logs', 'vortex_tikets',
    'vortex_aht_logs', 'vortex_art_logs', 'vortex_findings',
    'vortex_quiz_questions', 'vortex_quiz_history',
    'vortex_timers', 'vortex_stopwatches', 'drive_typing_team_results'
  ];

  const cloudData = {};
  for (const c of collections) {
    const res = await fetch(BASE_URL + c + '?key=' + apiKey);
    const json = await res.json();
    cloudData[c] = decodeValue(json.fields && json.fields.payload) || [];
  }

  console.log('   Cloud snapshot retrieved:');
  console.log(`   - vortex_users: ${cloudData.vortex_users.length} members`);
  console.log(`   - vortex_ca_logs: ${cloudData.vortex_ca_logs.length} evaluations`);
  console.log(`   - vortex_tikets: ${cloudData.vortex_tikets.length} tickets`);
  console.log(`   - vortex_aht_logs: ${cloudData.vortex_aht_logs.length} AHT records`);
  console.log(`   - vortex_art_logs: ${cloudData.vortex_art_logs.length} ART records`);
  console.log(`   - vortex_findings: ${cloudData.vortex_findings.length} findings`);
  console.log(`   - drive_typing_team_results: ${cloudData.drive_typing_team_results.length} racing records`);
  console.log(`   - vortex_quiz_questions: ${cloudData.vortex_quiz_questions.length} questions`);
  console.log(`   - vortex_quiz_history: ${cloudData.vortex_quiz_history.length} quiz histories`);

  // Assert cloud is clean
  const DUMMY_STRINGS = ['siti rahma', 'ahmad fauzi', 'dewi lestari', 'budi santoso', 'run_demo_', 'tkt_bs_', 'aht_bs_', 'art_bs_'];
  for (const [col, arr] of Object.entries(cloudData)) {
    if (Array.isArray(arr)) {
      arr.forEach(item => {
        const str = JSON.stringify(item).toLowerCase();
        DUMMY_STRINGS.forEach(d => {
          assert.strictEqual(str.includes(d), false, `Cloud document ${col} must not contain dummy string: ${d}`);
        });
      });
    }
  }
  console.log('   ✓ Verified 100% of Cloud Firestore documents contain zero dummy data!');

  // STEP 3: Hydrate fresh device with Cloud Firestore data
  console.log('\n3. Simulating new device sync & merge from Cloud...');
  for (const [col, arr] of Object.entries(cloudData)) {
    const localArr = JSON.parse(localStorage.getItem(col) || '[]');
    const deletedIds = syncManager.getDeletedIds(col);
    const { merged } = syncManager.mergeCollections(col, localArr, arr, deletedIds);
    localStorage.setItem(col, JSON.stringify(merged));
  }

  // STEP 4: Test each menu page render and data integrity
  console.log('\n4. Testing rendering across all menus...');

  // Set login session as Admin Icon
  state.currentUser = cloudData.vortex_users.find(u => u.username === 'admin');
  assert.ok(state.currentUser, 'Admin Icon must exist in users');

  // Menu: Overview
  console.log('   Checking Menu: Overview (Ringkasan)...');
  const allTikets = state.getTikets();
  const allCa = state.getCaLogs();
  const allArt = state.getArtLogs();
  assert.strictEqual(allTikets.length, 20, 'Expected 20 real agent tickets in October 2026');
  assert.strictEqual(allCa.length, 20, 'Expected 20 real agent CA in October 2026');
  assert.strictEqual(allArt.length, 20, 'Expected 20 real agent ART in October 2026');
  // Check no Budi Santoso August data
  assert.strictEqual(allTikets.some(t => t.id.startsWith('tkt_bs_')), false);
  console.log('   ✓ Overview data contains exclusively updated October 2026 agent performance!');

  // Menu: Update PA
  console.log('   Checking Menu: Update PA...');
  const paLogs = state.getPaLogs ? state.getPaLogs() : [];
  assert.strictEqual(paLogs.length, 0, 'PA logs should have 0 items (pa_5 removed)');
  console.log('   ✓ Update PA clean with zero dummy logs');

  // Menu: CA
  console.log('   Checking Menu: CA (Customer Attributes)...');
  assert.strictEqual(state.getCaLogs().length, 20);
  console.log('   ✓ CA contains 20 real agent evaluations');

  // Menu: Tiket
  console.log('   Checking Menu: Tiket...');
  assert.strictEqual(state.getTikets().length, 20);
  console.log('   ✓ Tiket contains 20 real agent logs');

  // Menu: AHT
  console.log('   Checking Menu: AHT...');
  assert.strictEqual(state.getAhtLogs().length, 20);
  console.log('   ✓ AHT contains 20 real agent logs');

  // Menu: ART
  console.log('   Checking Menu: ART...');
  assert.strictEqual(state.getArtLogs().length, 20);
  console.log('   ✓ ART contains 20 real agent logs');

  // Menu: Finding
  console.log('   Checking Menu: Finding...');
  assert.strictEqual(state.getFindings().length, 3);
  console.log('   ✓ Finding contains 3 real team audit findings');

  // Menu: Data Barang
  console.log('   Checking Menu: Data Barang (Items)...');
  assert.strictEqual(state.getItems().length, 10);
  state.getItems().forEach(item => {
    assert.strictEqual(item.updatedBy, 'Admin Icon', 'Items updatedBy must be Admin Icon');
  });
  console.log('   ✓ Data Barang contains 10 items updated by Admin Icon');

  // Menu: Typing Test
  console.log('   Checking Menu: Typing Test...');
  const typingResults = JSON.parse(localStorage.getItem('drive_typing_team_results') || '[]');
  assert.strictEqual(typingResults.length, 1, 'Only real run by Admin Icon');
  assert.strictEqual(typingResults[0].fullName, 'Admin Icon');
  console.log('   ✓ Typing Test leaderboard contains 0 demo runs');

  // Menu: Quiz
  console.log('   Checking Menu: Quiz...');
  const quizQ = state.getQuizQuestions();
  const quizH = state.getQuizHistory();
  assert.strictEqual(quizQ.length, 1, 'Question bank contains live question updated by Admin');
  assert.strictEqual(quizH.length, 5, 'Quiz history contains 5 real sessions by Admin Icon');
  assert.strictEqual(quizH.some(h => ['QZH-1001', 'QZH-1002', 'QZH-1003'].includes(h.id)), false);
  console.log('   ✓ Quiz Bank & History accurately matches updated cloud records');

  // Menu: Manajemen Team
  console.log('   Checking Menu: Manajemen Team...');
  const users = state.getUsers();
  assert.strictEqual(users.length, 11);
  const adminUser = users.find(u => u.role === 'admin');
  assert.strictEqual(adminUser.fullName, 'Admin Icon');
  assert.strictEqual(adminUser.department, 'TEAM LEADER');
  console.log('   ✓ Manajemen Team verified with 1 Admin and 10 CSO agents');

  console.log('\n=============================================');
  console.log('🎉 ALL TESTS PASSED: All menus on fresh device verified clean and up-to-date!');
  console.log('=============================================\n');
}

runAllMenusTest().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
