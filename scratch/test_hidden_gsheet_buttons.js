const fs = require('fs');
const assert = require('assert');

const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('js/app.js', 'utf8');

const ids = [
  'btnOpenCaGoogleSheetsModal',
  'btnOpenTiketGoogleSheetsModal',
  'btnOpenAhtGoogleSheetsModal',
  'btnOpenArtGoogleSheetsModal',
  'btnOpenFindingGoogleSheetsModal'
];

ids.forEach(id => {
  const regex = new RegExp('<button[^>]*id="' + id + '"[^>]*>');
  const match = html.match(regex);
  assert(match, id + ' must exist in index.html');
  assert(match[0].includes('hidden'), id + ' in index.html must have the "hidden" class');
  
  const removeHidden = js.includes(id + ".classList.remove('hidden')");
  assert(!removeHidden, id + ' must not have classList.remove("hidden") in js/app.js');
  console.log('✔ ' + id + ' is confirmed hidden in HTML and JS');
});

console.log('\n🎉 ALL GSHEET HEADER BUTTONS CONFIRMED HIDDEN!');
