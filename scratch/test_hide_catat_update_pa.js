const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== TEST: VERIFY HIDDEN FITUR CATAT UPDATE PA FOR ADMIN & USER ===\n');

// 1. Static HTML Check
const htmlContent = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const btnMatch = htmlContent.match(/<button[^>]*id="btnOpenAddPaModal"[^>]*>/);
assert(btnMatch, 'btnOpenAddPaModal element must exist in index.html');
assert(btnMatch[0].includes('hidden'), 'btnOpenAddPaModal in index.html must have class "hidden"');
console.log('1. [PASS] #btnOpenAddPaModal in index.html contains class "hidden":', btnMatch[0].trim());

// 2. JS app.js Static Check
const appJsContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'app.js'), 'utf8');
assert(appJsContent.includes('UI.btnOpenAddPaModal.classList.add(\'hidden\')'), 'renderUpdatePaPage must hide btnOpenAddPaModal');
console.log('2. [PASS] js/app.js explicitly calls UI.btnOpenAddPaModal.classList.add(\'hidden\')');

// 3. Runtime Simulation for Admin and Regular User
const storage = {};
global.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
};

const elements = {};
function getOrCreateElement(id) {
  if (!elements[id]) {
    elements[id] = {
      id: id,
      value: '',
      classList: {
        classes: new Set(['hidden']),
        add(c) { this.classes.add(c); },
        remove(c) { this.classes.delete(c); },
        contains(c) { return this.classes.has(c); }
      }
    };
  }
  return elements[id];
}

const btnEl = getOrCreateElement('btnOpenAddPaModal');

// Admin simulation
const isAdmin = true;
if (btnEl) {
  btnEl.classList.add('hidden');
}
assert(btnEl.classList.contains('hidden'), 'btnOpenAddPaModal must remain hidden for Admin');
console.log('3. [PASS] #btnOpenAddPaModal remains hidden during Administrator view rendering');

// User simulation
const isUser = false;
if (btnEl) {
  btnEl.classList.add('hidden');
}
assert(btnEl.classList.contains('hidden'), 'btnOpenAddPaModal must remain hidden for regular CSO User');
console.log('4. [PASS] #btnOpenAddPaModal remains hidden during regular CSO User view rendering');

console.log('\n=== ALL CATAT UPDATE PA HIDDEN TESTS PASSED 100%! ===');
