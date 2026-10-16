/**
 * Test Suite: Navbar Clock Dropdown Popup & Floating Window
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- STARTING NAVBAR CLOCK POPUP VERIFICATION ---');

// 1. Verify HTML Structure
const htmlPath = path.join(__dirname, '..', 'index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

assert(htmlContent.includes('id="clockDropdownContainer"'), 'Must have clockDropdownContainer');
assert(htmlContent.includes('id="realtimeClock"'), 'Must have realtimeClock button');
assert(htmlContent.includes('id="realtimeClockText"'), 'Must have realtimeClockText');
assert(htmlContent.includes('id="clockCaret"'), 'Must have clockCaret');
assert(htmlContent.includes('id="clockDropdownMenu"'), 'Must have clockDropdownMenu');
assert(htmlContent.includes('id="clockPopupMainTime"'), 'Must have clockPopupMainTime');
assert(htmlContent.includes('id="clockPopupMainDate"'), 'Must have clockPopupMainDate');
assert(htmlContent.includes('id="tzTimeWIB"'), 'Must have tzTimeWIB');
assert(htmlContent.includes('id="tzTimeWITA"'), 'Must have tzTimeWITA');
assert(htmlContent.includes('id="tzTimeWIT"'), 'Must have tzTimeWIT');
assert(htmlContent.includes('id="tzTimeUTC"'), 'Must have tzTimeUTC');
assert(htmlContent.includes('id="calendarCurrentMonthYear"'), 'Must have calendarCurrentMonthYear');
assert(htmlContent.includes('id="calendarDaysGrid"'), 'Must have calendarDaysGrid');
assert(htmlContent.includes('id="btnCalPrevMonth"'), 'Must have btnCalPrevMonth');
assert(htmlContent.includes('id="btnCalNextMonth"'), 'Must have btnCalNextMonth');
assert(htmlContent.includes('id="btnCalToday"'), 'Must have btnCalToday');
assert(htmlContent.includes('id="clockSessionLoginTime"'), 'Must have clockSessionLoginTime');
assert(htmlContent.includes('id="clockSessionDuration"'), 'Must have clockSessionDuration');
assert(htmlContent.includes('id="btnPopoutClockWindow"'), 'Must have btnPopoutClockWindow');
assert(htmlContent.includes('id="btnFloatingClockFooter"'), 'Must have btnFloatingClockFooter');
assert(htmlContent.includes('id="btnGoToTimerPage"'), 'Must have btnGoToTimerPage');

console.log('✓ All HTML elements for clock popup and calendar verified');

// 2. Verify CSS rules
const cssPath = path.join(__dirname, '..', 'css', 'style.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

assert(cssContent.includes('.clock-dropdown-container'), 'CSS must define .clock-dropdown-container');
assert(cssContent.includes('.clock-dropdown'), 'CSS must define .clock-dropdown');
assert(cssContent.includes('.clock-main-time'), 'CSS must define .clock-main-time');
assert(cssContent.includes('.clock-tz-grid'), 'CSS must define .clock-tz-grid');
assert(cssContent.includes('.clock-calendar-section'), 'CSS must define .clock-calendar-section');
assert(cssContent.includes('.clock-session-card'), 'CSS must define .clock-session-card');
assert(cssContent.includes('body.theme-light .clock-dropdown'), 'CSS must define light theme clock dropdown');

console.log('✓ All CSS styles and light/dark theme rules verified');

// 3. Mock DOM environment and test JS logic
function createMockEl(id, tagName = 'div') {
  const el = {
    id,
    tagName: tagName.toUpperCase(),
    textContent: '',
    innerHTML: '',
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
    appendChild() {},
    listeners: {},
    addEventListener(event, fn) {
      if (!this.listeners[event]) this.listeners[event] = [];
      this.listeners[event].push(fn);
    },
    click() {
      if (this.listeners['click']) {
        this.listeners['click'].forEach(fn => fn({ stopPropagation: () => {} }));
      }
    }
  };
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
  createElement(tag) { return createMockEl('dynamic_' + tag, tag); },
  addEventListener: (event, fn) => {
    if (!document._docListeners) document._docListeners = {};
    if (!document._docListeners[event]) document._docListeners[event] = [];
    document._docListeners[event].push(fn);
  },
  trigger(event) {
    if (document._docListeners && document._docListeners[event]) {
      document._docListeners[event].forEach(fn => fn({ stopPropagation: () => {} }));
    }
  },
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

// Mock state and UI
global.state = {
  currentUser: { id: 'usr_admin', fullName: 'Admin Icon', role: 'admin' },
  isAdmin: () => true
};

eval(appJsContent);
initEvents();

console.log('✓ Successfully evaluated app.js and wired event listeners');

// 4. Test calendar rendering
const mockGrid = document.getElementById('calendarDaysGrid');
const mockHeader = document.getElementById('calendarCurrentMonthYear');
UI.calendarDaysGrid = mockGrid;
UI.calendarCurrentMonthYear = mockHeader;

const testDate = new Date(2026, 9, 17); // October 17, 2026
renderClockCalendar(testDate);

assert(mockHeader.textContent.includes('Oktober 2026'), 'Calendar header must show Oktober 2026');
assert(mockGrid.innerHTML.includes('cal-day-cell'), 'Calendar grid must contain day cells');
assert(mockGrid.innerHTML.includes('17'), 'Calendar grid must contain day 17');
console.log('✓ renderClockCalendar renders October 2026 with valid cells');

// Test month navigation
currentClockCalDate.setMonth(currentClockCalDate.getMonth() + 1); // November
renderClockCalendar(currentClockCalDate);
assert(mockHeader.textContent.includes('November 2026'), 'Calendar header must update to November 2026');
console.log('✓ Calendar month navigation correctly advances to November 2026');

// 5. Test Live Clock Dropdown Updates
const mockMainTime = document.getElementById('clockPopupMainTime');
const mockMainDate = document.getElementById('clockPopupMainDate');
const mockTzWib = document.getElementById('tzTimeWIB');
const mockTzWita = document.getElementById('tzTimeWITA');
const mockTzWit = document.getElementById('tzTimeWIT');
const mockTzUtc = document.getElementById('tzTimeUTC');
const mockSessLogin = document.getElementById('clockSessionLoginTime');
const mockSessDur = document.getElementById('clockSessionDuration');
const mockSessBar = document.getElementById('clockSessionProgressBar');
const mockClockMenu = document.getElementById('clockDropdownMenu');

UI.clockPopupMainTime = mockMainTime;
UI.clockPopupMainDate = mockMainDate;
UI.tzTimeWIB = mockTzWib;
UI.tzTimeWITA = mockTzWita;
UI.tzTimeWIT = mockTzWit;
UI.tzTimeUTC = mockTzUtc;
UI.clockSessionLoginTime = mockSessLogin;
UI.clockSessionDuration = mockSessDur;
UI.clockSessionProgressBar = mockSessBar;
UI.clockDropdownMenu = mockClockMenu;

// Menu must not be hidden for updateClockDropdownLive
mockClockMenu.classList.remove('hidden');

// Set a login time: 2 hours ago
const simulatedNow = new Date('2026-10-17T14:30:00Z');
const loginTime = simulatedNow.getTime() - (2 * 60 * 60 * 1000 + 15 * 60 * 1000); // 2h 15m ago
localStorage.setItem('vortex_session_login_time', String(loginTime));

updateClockDropdownLive(simulatedNow);

assert(mockMainTime.textContent.length > 0, 'Main time must be populated');
assert(mockMainDate.textContent.length > 0, 'Main date must be populated');
assert(mockTzWib.textContent.length > 0, 'WIB time must be populated');
assert(mockTzWita.textContent.length > 0, 'WITA time must be populated');
assert(mockTzWit.textContent.length > 0, 'WIT time must be populated');
assert(mockTzUtc.textContent.length > 0, 'UTC time must be populated');
assert(mockSessDur.textContent.includes('2 jam 15 menit'), 'Session duration must reflect 2 jam 15 menit');

console.log('✓ updateClockDropdownLive accurately updates time, timezones, and session duration');

// 6. Test Dropdown Toggle & Click Outside
const mockBtnClock = document.getElementById('realtimeClock');
const mockCaret = document.getElementById('clockCaret');
UI.realtimeClock = mockBtnClock;
UI.clockCaret = mockCaret;

// Start with menu hidden
mockClockMenu.classList.add('hidden');

// Click clock button -> opens
mockBtnClock.click();
assert(!mockClockMenu.classList.contains('hidden'), 'Menu should be visible after click');
assert.strictEqual(mockCaret.style.transform, 'rotate(180deg)', 'Caret should rotate 180deg when open');

// Click outside -> closes
document.trigger('click');
assert(mockClockMenu.classList.contains('hidden'), 'Menu should be hidden after outside click');
assert.strictEqual(mockCaret.style.transform, 'rotate(0deg)', 'Caret should rotate back to 0deg');

console.log('✓ Dropdown toggle and outside-click close behavior verified');

// 7. Test Floating Window Support
assert(typeof window.openFloatingClockWindow === 'function', 'openFloatingClockWindow function must exist');
assert(typeof window.closeFloatingClockWindow === 'function', 'closeFloatingClockWindow function must exist');

// Test detached window creation fallback
let openedWinDoc = {
  head: { innerHTML: '' },
  body: { innerHTML: '' },
  getElementById: (id) => createMockEl(id)
};
window.open = (url, name, specs) => {
  return {
    document: openedWinDoc,
    closed: false,
    focus: () => {},
    addEventListener: () => {}
  };
};

window.openFloatingClockWindow();
assert(window.vortexFloatingClockWindow !== null, 'vortexFloatingClockWindow must be instantiated');
assert(openedWinDoc.body.innerHTML.includes('floatingClockTime'), 'Floating DOM must have floatingClockTime');
assert(openedWinDoc.body.innerHTML.includes('floatingTzWITA'), 'Floating DOM must have floatingTzWITA');

window.closeFloatingClockWindow();
assert.strictEqual(window.vortexFloatingClockWindow, null, 'Floating window should be cleared on close');
console.log('✓ Floating Pop-up Window initialization and teardown verified');

console.log('--- ALL NAVBAR CLOCK POPUP TESTS PASSED (100%) ---');
