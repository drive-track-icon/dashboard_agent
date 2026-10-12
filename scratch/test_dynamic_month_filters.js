const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== TEST: VERIFY DYNAMIC MONTH FILTER ACROSS 7 MENUS ===\n');

// 1. Verify index.html contains all 7 dropdowns
const htmlContent = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const targetDropdowns = [
  { id: 'filterOverviewMonth', menu: 'Ringkasan' },
  { id: 'filterPaMonth', menu: 'Update PA' },
  { id: 'filterCaMonth', menu: 'CA' },
  { id: 'filterTiketMonth', menu: 'Tiket' },
  { id: 'filterAhtMonth', menu: 'AHT' },
  { id: 'filterArtMonth', menu: 'ART' },
  { id: 'filterFindingMonth', menu: 'Finding' }
];

console.log('1. Checking HTML dropdown definitions:');
targetDropdowns.forEach(t => {
  const hasId = htmlContent.includes(`id="${t.id}"`);
  assert(hasId, `Dropdown #${t.id} must exist in index.html for menu ${t.menu}`);
  console.log(`  [PASS] #${t.id} found in index.html (${t.menu})`);
});

// 2. Load and test logic from js/app.js in VM sandbox
const appJsContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'app.js'), 'utf8');

const vm = require('vm');

// Create mock DOM & environment
class MockOption {
  constructor(value, text) {
    this.value = value;
    this.textContent = text;
  }
}

class MockSelect {
  constructor(id) {
    this.id = id;
    this._value = '';
    this.options = [];
    this.classList = {
      add: () => {},
      remove: () => {},
      toggle: () => {},
      contains: () => false
    };
    this.listeners = {};
  }
  get value() {
    return this._value;
  }
  set value(val) {
    this._value = val;
  }
  set innerHTML(html) {
    // Parse <option value="...">...</option>
    this.options = [];
    const regex = /<option value="([^"]*)">([^<]*)<\/option>/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      this.options.push(new MockOption(match[1], match[2]));
    }
    if (!this._value && this.options.length > 0) {
      this._value = this.options[0].value;
    }
  }
  addEventListener(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
  }
}

const mockDoc = {
  elements: {},
  getElementById(id) {
    return this.elements[id] || null;
  },
  querySelector(sel) {
    if (sel.startsWith('#')) return this.getElementById(sel.slice(1));
    return null;
  },
  querySelectorAll() {
    return [];
  },
  addEventListener() {}
};

// Initialize elements
targetDropdowns.forEach(t => {
  mockDoc.elements[t.id] = new MockSelect(t.id);
});

const sandbox = {
  window: {},
  document: mockDoc,
  localStorage: {
    _data: {},
    getItem(k) { return this._data[k] || null; },
    setItem(k, v) { this._data[k] = String(v); },
    removeItem(k) { delete this._data[k]; },
    clear() { this._data = {}; }
  },
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval,
  Date: Date,
  Math: Math,
  Array: Array,
  Object: Object,
  String: String,
  Number: Number,
  parseInt: parseInt,
  parseFloat: parseFloat,
  JSON: JSON,
  navigator: { clipboard: {} }
};
sandbox.window = sandbox;

// Run script
vm.createContext(sandbox);

// Wrap app.js to prevent immediate DOMContentLoaded and load declarations
const testCode = `
${appJsContent}
`;

vm.runInContext(testCode, sandbox);

console.log('\n2. Testing INDO_MONTH_NAMES and formatMonthLabel:');
assert(typeof sandbox.formatMonthLabel === 'function', 'formatMonthLabel must be exposed');
assert.strictEqual(sandbox.formatMonthLabel('2026-10'), 'Oktober 2026');
assert.strictEqual(sandbox.formatMonthLabel('2026-09'), 'September 2026');
assert.strictEqual(sandbox.formatMonthLabel('2026-08'), 'Agustus 2026');
assert.strictEqual(sandbox.formatMonthLabel('2026-07'), 'Juli 2026');
assert.strictEqual(sandbox.formatMonthLabel('2026-11'), 'November 2026');
assert.strictEqual(sandbox.formatMonthLabel('2026-12'), 'Desember 2026');
assert.strictEqual(sandbox.formatMonthLabel('2027-01'), 'Januari 2027');
assert.strictEqual(sandbox.formatMonthLabel('ALL'), 'Semua Bulan');
console.log('  [PASS] formatMonthLabel correctly formats Indonesian month labels including ALL');

console.log('\n3. Testing getAvailableMonthList() with current date:');
assert(typeof sandbox.getAvailableMonthList === 'function', 'getAvailableMonthList must be exposed');
const currentList = sandbox.getAvailableMonthList();
console.log('  Current detected months:', currentList);
assert(currentList.includes('2026-07'), 'Should include baseline 2026-07');
assert(currentList.includes('2026-08'), 'Should include baseline 2026-08');
assert(currentList.includes('2026-09'), 'Should include baseline 2026-09');
assert(currentList.includes('2026-10'), 'Should include 2026-10 (current system date)');
assert.strictEqual(currentList[0], '2026-10', 'First month should be latest month (2026-10)');
console.log('  [PASS] getAvailableMonthList returned expected descending sorted months');

console.log('\n4. Testing automatic update to future months when calendar advances:');
// Simulate time progression to November 2026
const RealDate = sandbox.Date;
sandbox.Date = class extends RealDate {
  constructor(...args) {
    if (args.length === 0) {
      super(2026, 10, 15); // Month 10 is November in JS 0-indexed
    } else {
      super(...args);
    }
  }
  static now() {
    return new Date(2026, 10, 15).getTime();
  }
};

const novList = sandbox.getAvailableMonthList();
console.log('  Simulated November 2026 detected months:', novList);
assert(novList.includes('2026-11'), 'Should dynamically include 2026-11');
assert.strictEqual(novList[0], '2026-11', 'Latest month in list should be 2026-11');
assert.strictEqual(sandbox.formatMonthLabel(novList[0]), 'November 2026');
console.log('  [PASS] Automatic inclusion of 2026-11 verified without any code modification');

// Simulate time progression to March 2027
sandbox.Date = class extends RealDate {
  constructor(...args) {
    if (args.length === 0) {
      super(2027, 2, 10); // March 2027
    } else {
      super(...args);
    }
  }
  static now() {
    return new Date(2027, 2, 10).getTime();
  }
};

const mar2027List = sandbox.getAvailableMonthList();
console.log('  Simulated March 2027 list length:', mar2027List.length, 'Latest:', mar2027List[0]);
assert(mar2027List.includes('2027-03'), 'Should dynamically include 2027-03');
assert(mar2027List.includes('2027-02'), 'Should dynamically include 2027-02');
assert(mar2027List.includes('2027-01'), 'Should dynamically include 2027-01');
assert(mar2027List.includes('2026-12'), 'Should dynamically include 2026-12');
assert(mar2027List.includes('2026-11'), 'Should dynamically include 2026-11');
assert.strictEqual(mar2027List[0], '2027-03');
assert.strictEqual(sandbox.formatMonthLabel(mar2027List[0]), 'Maret 2027');
console.log('  [PASS] Automatic progression to 2027-03 verified');

// Restore original Date
sandbox.Date = RealDate;

console.log('\n5. Testing updateDynamicMonthDropdowns across all 7 dropdowns:');
assert(typeof sandbox.updateDynamicMonthDropdowns === 'function', 'updateDynamicMonthDropdowns must be exposed');
sandbox.updateDynamicMonthDropdowns();

targetDropdowns.forEach(t => {
  const el = mockDoc.elements[t.id];
  assert(el, `Element #${t.id} must be in document`);
  const values = el.options.map(o => o.value);
  const labels = el.options.map(o => o.textContent);
  
  assert(values.includes('ALL'), `${t.menu} (#${t.id}) must contain ALL option`);
  assert(values.includes('2026-10'), `${t.menu} (#${t.id}) must contain 2026-10`);
  assert(values.includes('2026-09'), `${t.menu} (#${t.id}) must contain 2026-09`);
  assert(values.includes('2026-08'), `${t.menu} (#${t.id}) must contain 2026-08`);
  assert(values.includes('2026-07'), `${t.menu} (#${t.id}) must contain 2026-07`);
  
  assert(labels.includes('Semua Bulan'), `${t.menu} (#${t.id}) label for ALL must be 'Semua Bulan'`);
  assert(labels.includes('Oktober 2026'), `${t.menu} (#${t.id}) label for 2026-10 must be 'Oktober 2026'`);
  assert(labels.includes('September 2026'), `${t.menu} (#${t.id}) label for 2026-09 must be 'September 2026'`);
  
  console.log(`  [PASS] #${t.id} (${t.menu}) options: [${values.join(', ')}] with proper Indonesian labels`);
});

console.log('\n6. Testing selection retention when updateDynamicMonthDropdowns runs again:');
// User selects August 2026 on Ringkasan and July 2026 on Update PA
mockDoc.elements.filterOverviewMonth.value = '2026-08';
mockDoc.elements.filterPaMonth.value = '2026-07';
mockDoc.elements.filterTiketMonth.value = 'ALL';

sandbox.updateDynamicMonthDropdowns();

assert.strictEqual(mockDoc.elements.filterOverviewMonth.value, '2026-08', 'filterOverviewMonth must preserve user selection');
assert.strictEqual(mockDoc.elements.filterPaMonth.value, '2026-07', 'filterPaMonth must preserve user selection');
assert.strictEqual(mockDoc.elements.filterTiketMonth.value, 'ALL', 'filterTiketMonth must preserve user selection');
console.log('  [PASS] User selections preserved perfectly without reset');

console.log('\n=== ALL DYNAMIC MONTH FILTER TESTS PASSED 100%! ===');
