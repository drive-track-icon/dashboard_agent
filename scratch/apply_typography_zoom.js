const fs = require('fs');
const path = require('path');

// 1. Process css/style.css
console.log('--- Processing css/style.css ---');
let css = fs.readFileSync('css/style.css', 'utf8');

// Replace all var(--content-zoom-width, 100%) with 100%
const zoomWidthRegex = /var\(--content-zoom-width,\s*100%\)/g;
const zoomWidthMatches = (css.match(zoomWidthRegex) || []).length;
css = css.replace(zoomWidthRegex, '100%');
console.log(`Replaced ${zoomWidthMatches} occurrences of var(--content-zoom-width, 100%) with 100%`);

// Replace all font-size declarations:
// font-size:\s*([0-9.]+)(rem|px)(\s*!important)?\s*;
// Avoid double wrapping if already calc(
const fontSizeRegex = /font-size:\s*(?!calc\()([0-9.]+)(rem|px)(\s*!important)?\s*;/g;
let cssFontCount = 0;
css = css.replace(fontSizeRegex, (match, val, unit, imp) => {
  cssFontCount++;
  const important = imp ? ' ' + imp.trim() : '';
  return `font-size: calc(${val}${unit} * var(--content-font-scale, 1))${important};`;
});
console.log(`Replaced ${cssFontCount} font-size declarations in css/style.css`);

// Ensure :root has --content-font-scale: 1;
if (!css.includes('--content-font-scale: 1;')) {
  css = css.replace(':root {', ':root {\n  --content-font-scale: 1;');
}

// Add isolation rules for sidebar, topbar, modals, and mainContent base
const isolationStyles = `
/* ==========================================================================
   TYPOGRAPHY ZOOM & SCREEN BOUNDING SYSTEM
   Container TIDAK terpengaruh zoom (tetap 100% fluid mengikuti ukuran layar)
   Zoom in/out HANYA berpengaruh pada tulisan (font-size).
   ========================================================================== */
.sidebar {
  --content-font-scale: 1 !important;
}

.topbar {
  --content-font-scale: 1 !important;
}

.modal-backdrop,
.modal-dialog {
  --content-font-scale: 1 !important;
}

#mainContent {
  width: 100% !important;
  max-width: 100% !important;
  min-width: 0 !important;
  overflow-x: hidden !important;
  box-sizing: border-box !important;
  font-size: calc(1rem * var(--content-font-scale, 1));
}

.role-alert-banner {
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
  font-size: calc(0.85rem * var(--content-font-scale, 1));
}
`;

if (!css.includes('TYPOGRAPHY ZOOM & SCREEN BOUNDING SYSTEM')) {
  css += isolationStyles;
}

fs.writeFileSync('css/style.css', css, 'utf8');
console.log('Saved updated css/style.css');

// 2. Process index.html inline font-size styles
console.log('--- Processing index.html ---');
let html = fs.readFileSync('index.html', 'utf8');
const inlineFontRegex = /font-size:\s*(?!calc\()([0-9.]+)(rem|px)(\s*!important)?/g;
let htmlFontCount = 0;
html = html.replace(inlineFontRegex, (match, val, unit, imp) => {
  htmlFontCount++;
  const important = imp ? ' ' + imp.trim() : '';
  return `font-size: calc(${val}${unit} * var(--content-font-scale, 1))${important}`;
});
console.log(`Replaced ${htmlFontCount} inline font-size styles in index.html`);
fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved updated index.html');

console.log('--- Completed style.css and index.html processing ---');
