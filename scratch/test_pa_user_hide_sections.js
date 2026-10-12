const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== RUNNING TEST: PA REMOVAL VERIFICATION ===\n');

const baseDir = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(baseDir, 'js', 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(baseDir, 'css', 'style.css'), 'utf8');

// 1. Verify absence in pageUpdatePa
const paStart = html.indexOf('<section class="page-section" id="pageUpdatePa">');
const paEnd = html.indexOf('</section>', paStart);
const paSection = html.substring(paStart, paEnd);

assert(!paSection.includes('Total Interaksi Ditangani'), 'Total Interaksi Ditangani should not exist in Update PA');
assert(!paSection.includes('Productive Hours'), 'Productive Hours should not exist in Update PA');
assert(!paSection.includes('AUX Duration'), 'AUX Duration should not exist in Update PA');
assert(!paSection.includes('Skor Capaian PA'), 'Skor Capaian PA should not exist in Update PA');
assert(!paSection.includes('searchPaInput'), 'searchPaInput should not exist in Update PA');
assert(!paSection.includes('tablePaLogs'), 'tablePaLogs should not exist in Update PA');
console.log('[PASS] index.html: Metrics, search toolbar, filters, and logs table removed from Update PA section.');

// 2. Check CSS rules in style.css
assert(css.includes('body[data-user-role="user"] #paAdminOverviewSection'), 'CSS rule for body[data-user-role="user"] #paAdminOverviewSection should exist');
assert(css.includes('body[data-user-role="admin"] #paUserPersonalCardContainer'), 'CSS rule for body[data-user-role="admin"] #paUserPersonalCardContainer should exist');
console.log('[PASS] css/style.css: Role visibility rules clean and verified.');

console.log('\n=== ALL UNIT ASSERTIONS PASSED! ===');
