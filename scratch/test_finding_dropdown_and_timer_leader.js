/**
 * Test Suite:
 * 1. Finding Modal: "Petugas CSO" dropdown populated from Manajemen Team
 * 2. Timer & Stopwatch: "Layanan" dropdown includes "TEAM LEADER" / "TIME LIDER"
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- STARTING VERIFICATION: FINDING DROPDOWN & TIMER TEAM LEADER ---');

// 1. Verify HTML Structure
const htmlPath = path.join(__dirname, '..', 'index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Check Finding Modal has select for formFindingUser
assert(
  /<select\s+id="formFindingUser"/i.test(htmlContent),
  'formFindingUser in index.html must be a <select> dropdown element'
);
assert(
  !/<input[^>]+id="formFindingUser"/i.test(htmlContent),
  'formFindingUser must no longer be an <input> element'
);
console.log('✓ HTML: formFindingUser is now a <select> dropdown');

// Check formTimerCategory has TEAM LEADER and DOES NOT have TIME LIDER
const timerCategoryMatch = htmlContent.match(/<select\s+id="formTimerCategory"[^>]*>([\s\S]*?)<\/select>/i);
assert(timerCategoryMatch, 'formTimerCategory select must exist in index.html');
const timerOptions = timerCategoryMatch[1];
assert(timerOptions.includes('value="TEAM LEADER"'), 'formTimerCategory must have TEAM LEADER option');
assert(!timerOptions.includes('value="TIME LIDER"'), 'formTimerCategory must NOT have TIME LIDER option (removed)');
console.log('✓ HTML: formTimerCategory contains TEAM LEADER and does not contain TIME LIDER');

// Check formStopwatchDept has TEAM LEADER and DOES NOT have TIME LIDER
const swDeptMatch = htmlContent.match(/<select\s+id="formStopwatchDept"[^>]*>([\s\S]*?)<\/select>/i);
assert(swDeptMatch, 'formStopwatchDept select must exist in index.html');
const swOptions = swDeptMatch[1];
assert(swOptions.includes('value="TEAM LEADER"'), 'formStopwatchDept must have TEAM LEADER option');
assert(!swOptions.includes('value="TIME LIDER"'), 'formStopwatchDept must NOT have TIME LIDER option (removed)');
console.log('✓ HTML: formStopwatchDept contains TEAM LEADER and does not contain TIME LIDER');

// 2. Mock environment to test JS behavior
function createMockEl(id, tagName = 'div') {
  const el = {
    id,
    tagName: tagName.toUpperCase(),
    textContent: '',
    innerHTML: '',
    value: '',
    options: [],
    selectedIndex: 0,
    reset() { this.value = ''; },
    classList: {
      _classes: new Set(),
      add(c) { this._classes.add(c); },
      remove(c) { this._classes.delete(c); },
      toggle(c) {
        if (this._classes.has(c)) { this._classes.delete(c); return false; }
        else { this._classes.add(c); return true; }
      },
      contains(c) { return this._classes.has(c); }
    },
    style: {},
    attributes: {},
    setAttribute(k, v) { this.attributes[k] = String(v); },
    getAttribute(k) { return this.attributes[k] || null; },
    querySelector(sel) { return createMockEl('inner_' + sel); },
    querySelectorAll(sel) { return []; },
    appendChild(c) {},
    insertAdjacentHTML(pos, html) {
      this.innerHTML = html + this.innerHTML;
      this._parseOptions();
    },
    listeners: {},
    addEventListener(event, fn) {
      if (!this.listeners[event]) this.listeners[event] = [];
      this.listeners[event].push(fn);
    },
    trigger(event, data = {}) {
      if (this.listeners[event]) {
        this.listeners[event].forEach(fn => fn({ ...data, target: this, stopPropagation: () => {} }));
      }
    },
    _parseOptions() {
      // Very simple parser for mock options
      const matches = [...this.innerHTML.matchAll(/<option\s+value="([^"]*)"(?:\s+data-dept="([^"]*)")?(?:\s+(selected))?[^>]*>([^<]*)<\/option>/gi)];
      this.options = matches.map((m, idx) => {
        const opt = {
          value: m[1],
          text: m[4],
          getAttribute(attr) {
            if (attr === 'data-dept') return m[2] || '';
            return null;
          }
        };
        if (m[3]) {
          this.selectedIndex = idx;
          this.value = m[1];
        }
        return opt;
      });
      if (this.options.length > 0 && this.selectedIndex >= 0 && !this.value) {
        this.value = this.options[this.selectedIndex].value;
      }
    }
  };

  // Override innerHTML setter to parse mock options
  let _inner = '';
  Object.defineProperty(el, 'innerHTML', {
    get() { return _inner; },
    set(val) {
      _inner = val;
      el._parseOptions();
    }
  });

  return el;
}

global.window = global;
global.window.addEventListener = () => {};
global.document = {
  _elements: {},
  getElementById(id) {
    if (!this._elements[id]) {
      this._elements[id] = createMockEl(id);
    }
    return this._elements[id];
  },
  querySelectorAll(sel) { return []; },
  createElement(tag) { return createMockEl('dyn_' + tag, tag); },
  addEventListener: () => {},
  body: { classList: { contains: () => false } }
};
global.localStorage = {
  _store: {},
  getItem(k) { return this._store[k] || null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; }
};
global.navigator = { onLine: true };
global.showToast = (t, m, type) => {};

// Evaluate app.js
const appJsPath = path.join(__dirname, '..', 'js', 'app.js');
const appJsContent = fs.readFileSync(appJsPath, 'utf8');

// Mock state with Manajemen Team users
const mockTeamUsers = [
  { id: 'usr_1', fullName: 'Budi Santoso', username: 'budi', department: 'CSO INBOUND', role: 'user' },
  { id: 'usr_2', fullName: 'Siti Rahma', username: 'siti', department: 'CSO DIGILIVE CHAT - WA', role: 'user' },
  { id: 'usr_3', fullName: 'Agus Leader', username: 'agus', department: 'TEAM LEADER', role: 'admin' },
  { id: 'usr_4', fullName: 'Rian Time Lider', username: 'rian', department: 'TIME LIDER', role: 'admin' }
];

global.state = {
  currentUser: mockTeamUsers[2], // Agus Leader
  isAdmin: () => true,
  getUsers: () => mockTeamUsers,
  getFindings: () => [],
  saveFindings: () => {},
  getTimers: () => [],
  saveTimers: () => {},
  getStopwatches: () => [],
  saveStopwatches: () => {},
  addLog: () => {}
};

eval(appJsContent);
initEvents();

window.state.currentUser = mockTeamUsers[2];
window.state.getUsers = () => mockTeamUsers;
window.state.isAdmin = () => true;

console.log('✓ Successfully evaluated app.js and wired events');

// 3. Test openAddFindingModal
openAddFindingModal();

const findingUserSelect = document.getElementById('formFindingUser');
const findingDeptSelect = document.getElementById('formFindingDept');

assert(findingUserSelect.options.length === 4, 'formFindingUser should contain 4 users from Manajemen Team');
assert(findingUserSelect.innerHTML.includes('Budi Santoso'), 'formFindingUser must contain Budi Santoso');
assert(findingUserSelect.innerHTML.includes('Siti Rahma'), 'formFindingUser must contain Siti Rahma');
assert(findingUserSelect.innerHTML.includes('Agus Leader'), 'formFindingUser must contain Agus Leader');

// Agus Leader is currentUser, so selected
assert.strictEqual(findingUserSelect.value, 'Agus Leader', 'Default selection should be current logged in user (Agus Leader)');
assert.strictEqual(findingDeptSelect.value, 'TEAM LEADER', 'Default department should auto-fill to TEAM LEADER');
console.log('✓ openAddFindingModal populated all team users and auto-selected current user dept');

// Test switching user in dropdown
// Change to Siti Rahma (index 1)
findingUserSelect.selectedIndex = 1;
findingUserSelect.value = 'Siti Rahma';
findingUserSelect.trigger('change');

assert.strictEqual(findingDeptSelect.value, 'CSO DIGILIVE CHAT - WA', 'Selecting Siti Rahma must auto-update department to CSO DIGILIVE CHAT - WA');
console.log('✓ Changing formFindingUser correctly updates formFindingDept to selected user department');

// 4. Test openEditFindingModal
const mockFindingItem = {
  id: 'fnd_test_1',
  userFullName: 'Budi Santoso',
  department: 'CSO INBOUND',
  date: '2026-10-17',
  findingType: 'Feedback Negatif',
  category: 'Informasi',
  deviationLevel: 'Reminder 1',
  desc: 'Salah memberikan panduan SOP',
  commitment: 'Akan lebih teliti',
  actionPlan: 'Review materi SOP',
  status: 'Open'
};

state.getFindings = () => [mockFindingItem];

openEditFindingModal('fnd_test_1');

assert.strictEqual(findingUserSelect.value, 'Budi Santoso', 'Edit modal should select Budi Santoso');
assert.strictEqual(findingDeptSelect.value, 'CSO INBOUND', 'Edit modal should load CSO INBOUND department');
console.log('✓ openEditFindingModal properly populates and selects existing finding user');

// 5. Test Timer "Layanan" with TEAM LEADER & TIME LIDER
const timerCatSelect = document.getElementById('formTimerCategory');

// Current user is Agus Leader with dept 'TEAM LEADER'
openAddTimerModal();
assert.strictEqual(timerCatSelect.value, 'TEAM LEADER', 'openAddTimerModal must auto-select TEAM LEADER for Team Leader user');
console.log('✓ openAddTimerModal correctly selects TEAM LEADER for leadership user');

// Current user with dept 'TIME LIDER'
state.currentUser = mockTeamUsers[3]; // Rian Time Lider
openAddTimerModal();
assert.strictEqual(
  timerCatSelect.value,
  'TEAM LEADER',
  'openAddTimerModal must auto-normalize TIME LIDER to TEAM LEADER'
);
console.log('✓ openAddTimerModal correctly maps to TEAM LEADER');

// 6. Test Stopwatch "Layanan" with TEAM LEADER
const swDeptSelect = document.getElementById('formStopwatchDept');

state.currentUser = mockTeamUsers[2]; // Agus Leader (dept: TEAM LEADER)
openAddStopwatchModal();
assert.strictEqual(swDeptSelect.value, 'TEAM LEADER', 'openAddStopwatchModal must auto-select TEAM LEADER');
console.log('✓ openAddStopwatchModal correctly selects TEAM LEADER');

state.currentUser = mockTeamUsers[3]; // Rian Time Lider (dept: TIME LIDER)
openAddStopwatchModal();
assert.strictEqual(
  swDeptSelect.value,
  'TEAM LEADER',
  'openAddStopwatchModal must auto-normalize TIME LIDER to TEAM LEADER'
);
console.log('✓ openAddStopwatchModal correctly maps to TEAM LEADER');

console.log('--- ALL TESTS PASSED SUCCESSFULLY (100%) ---');
