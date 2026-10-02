const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Regex to find font-size in inline styles:
// font-size:\s*([0-9.]+)(rem|px)
const regex = /font-size:\s*([0-9.]+)(rem|px)(\s*!important)?/g;

let count = 0;
const replaced = html.replace(regex, (match, val, unit, imp) => {
  count++;
  const important = imp ? ' ' + imp.trim() : '';
  return `font-size: calc(${val}${unit} * var(--content-font-scale, 1))${important}`;
});

console.log('Total inline matches replaced in index.html:', count);
