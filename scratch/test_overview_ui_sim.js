const fs = require('fs');

console.log('Testing overview UI rendering simulation...');

// Mock Minimal DOM
class ElementMock {
  constructor(id = '', tag = 'div') {
    this.id = id;
    this.tagName = tag.toUpperCase();
    this.classList = {
      classes: new Set(),
      add: (c) => this.classList.classes.add(c),
      remove: (c) => this.classList.classes.delete(c),
      toggle: (c, force) => {
        if (force === undefined) {
          if (this.classList.classes.has(c)) this.classList.classes.delete(c);
          else this.classList.classes.add(c);
        } else if (force) {
          this.classList.classes.add(c);
        } else {
          this.classList.classes.delete(c);
        }
      },
      contains: (c) => this.classList.classes.has(c)
    };
    this.innerHTML = '';
    this.textContent = '';
    this.children = [];
    this.value = '';
    this.style = {};
    this.listeners = {};
    this.attributes = {};
  }
  appendChild(child) {
    this.children.push(child);
  }
  setAttribute(k, v) {
    this.attributes[k] = v;
  }
  getAttribute(k) {
    return this.attributes[k] || null;
  }
  addEventListener(event, handler) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(handler);
  }
  querySelectorAll(sel) {
    return [];
  }
}

const elements = {};
function getOrCreate(id) {
  if (!elements[id]) elements[id] = new ElementMock(id);
  return elements[id];
}

global.document = {
  getElementById: (id) => getOrCreate(id),
  querySelector: (sel) => new ElementMock(),
  querySelectorAll: (sel) => [],
  createElement: (tag) => new ElementMock('', tag)
};

// Mock state
global.state = {
  getUsers: () => [
    { id: 'u1', fullName: 'Siti Rahma', username: 'siti', role: 'user', department: 'CSO DIGILIVE CHAT - WA' },
    { id: 'u2', fullName: 'Budi Santoso, S.Kom', username: 'budi', role: 'user', department: 'CSO INBOUND' },
    { id: 'u3', fullName: 'Dewi Lestari, M.T.', username: 'dewi', role: 'admin', department: 'TEAM LEADER' },
    { id: 'u4', fullName: 'Ahmad Fauzi', username: 'ahmad', role: 'user', department: 'CSO BACK OFFICE' }
  ],
  getCaLogs: () => [
    { userId: 'u1', userFullName: 'Siti Rahma', score: 96.5 },
    { userId: 'u2', userFullName: 'Budi Santoso, S.Kom', score: 88.0 },
    { userId: 'u3', userFullName: 'Dewi Lestari, M.T.', score: 95.0 },
    { userId: 'u4', userFullName: 'Ahmad Fauzi', score: 78.0 }
  ],
  getTikets: () => [
    { userId: 'u1', userFullName: 'Siti Rahma', ticketCount: 1345 },
    { userId: 'u2', userFullName: 'Budi Santoso, S.Kom', ticketCount: 1328 },
    { userId: 'u3', userFullName: 'Dewi Lestari, M.T.', ticketCount: 1310 },
    { userId: 'u4', userFullName: 'Ahmad Fauzi', ticketCount: 1265 }
  ],
  getArtLogs: () => [
    { userId: 'u1', userFullName: 'Siti Rahma', avgResponseSeconds: 12.8, interactionCount: 100 },
    { userId: 'u2', userFullName: 'Budi Santoso, S.Kom', avgResponseSeconds: 22.5, interactionCount: 80 },
    { userId: 'u3', userFullName: 'Dewi Lestari, M.T.', avgResponseSeconds: 14.2, interactionCount: 50 },
    { userId: 'u4', userFullName: 'Ahmad Fauzi', avgResponseSeconds: 32.4, interactionCount: 70 }
  ]
};

// Load code
const jsCode = fs.readFileSync('./js/app.js', 'utf8');

// Evaluate the functions
const vm = require('vm');
const context = {
  document: global.document,
  state: global.state,
  console: console,
  UI: {}
};
vm.createContext(context);

// Extract section 7 exactly
const startIdx = jsCode.indexOf('// 7. OVERVIEW PAGE: REKAPITULASI KINERJA USER');
const endIdx = jsCode.indexOf('function getStockBadge');
if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find boundaries of Section 7 in app.js');
  process.exit(1);
}
const sec7Code = jsCode.substring(startIdx, endIdx);

vm.runInContext(sec7Code, context);

// Test 1: Combined data calculation
const combinedData = context.calculateOverviewCombinedData();
console.log('Combined Data Count:', combinedData.length);
if (combinedData.length !== 4) throw new Error('Expected 4 users in combined data');

const siti = combinedData.find(d => d.fullName === 'Siti Rahma');
console.log('Siti Rahma CA:', siti.caAvg, '%', siti.caColor.grade, 'Hue:', siti.caColor.hue);
console.log('Siti Rahma Tiket:', siti.tiketCount, siti.tiketColor.grade, 'Hue:', siti.tiketColor.hue);
console.log('Siti Rahma ART:', siti.avgArtSec, 's', siti.artColor.grade, 'Hue:', siti.artColor.hue);

if (siti.caAvg !== 96.5 || siti.caColor.hue < 100) throw new Error('Siti CA score or green hue incorrect');
if (siti.tiketCount !== 1345 || siti.tiketColor.hue < 100) throw new Error('Siti Tiket or green hue incorrect');
if (siti.avgArtSec !== 12.8 || siti.artColor.hue < 100) throw new Error('Siti ART or green hue incorrect');

// Test 2: Ahmad Fauzi (Lower scores)
const ahmad = combinedData.find(d => d.fullName === 'Ahmad Fauzi');
console.log('Ahmad Fauzi CA:', ahmad.caAvg, '%', ahmad.caColor.grade, 'Hue:', ahmad.caColor.hue);
console.log('Ahmad Fauzi Tiket:', ahmad.tiketCount, ahmad.tiketColor.grade, 'Hue:', ahmad.tiketColor.hue);
console.log('Ahmad Fauzi ART:', ahmad.avgArtSec, 's', ahmad.artColor.grade, 'Hue:', ahmad.artColor.hue);

if (ahmad.caColor.hue > 45) throw new Error('Ahmad CA hue expected <= 45');
if (ahmad.artColor.grade !== 'Over SLA') throw new Error('Ahmad ART grade expected Over SLA');

// Test 3: renderOverviewPage with Category ALL
context.overviewActiveCategory = 'ALL';
context.overviewSortOrder = 'DESC';
context.renderOverviewPage();

const tbody = elements['tbodyOverviewCa'];
console.log('Rendered rows in tbody (ALL):', tbody.children.length);
if (tbody.children.length !== 4) throw new Error('Expected 4 rows rendered in tbody');

// Test 4: renderOverviewPage with Category CA
context.overviewActiveCategory = 'CA';
context.overviewSortOrder = 'DESC';
context.renderOverviewPage();
console.log('Rendered rows in tbody (CA):', tbody.children.length);

// Test 5: renderOverviewPage with Category TIKET
context.overviewActiveCategory = 'TIKET';
context.overviewSortOrder = 'ASC';
context.renderOverviewPage();
console.log('Rendered rows in tbody (TIKET):', tbody.children.length);

// Test 6: renderOverviewPage with Category ART
context.overviewActiveCategory = 'ART';
context.overviewSortOrder = 'ASC';
context.renderOverviewPage();
console.log('Rendered rows in tbody (ART):', tbody.children.length);

console.log('\n🎉 ALL DOM SIMULATION & INTEGRATION TESTS COMPLETED SUCCESSFULLY! 🎉');
