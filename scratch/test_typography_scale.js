const fs = require('fs');

const css = fs.readFileSync('css/style.css', 'utf8');

// Regex to find font-size declarations:
// Matches: font-size: <value>; or font-size: <value> !important;
const regex = /font-size:\s*([0-9.]+)(rem|px)(\s*!important)?\s*;/g;

let count = 0;
const replaced = css.replace(regex, (match, val, unit, imp) => {
  count++;
  const important = imp ? ' ' + imp.trim() : '';
  return `font-size: calc(${val}${unit} * var(--content-font-scale, 1))${important};`;
});

console.log('Total matches replaced in style.css:', count);

// Check if any font-size remains unreplaced
const unreplaced = replaced.match(/font-size:\s*(?!calc)[^;]+;/g);
console.log('Unreplaced font-size declarations:', unreplaced);
