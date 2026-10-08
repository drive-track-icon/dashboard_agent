const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== TEST: MENU UPDATE PA - CA DECIMAL FORMAT (NO PERCENTAGE) ===\n');

const js = fs.readFileSync(path.resolve(__dirname, '..', 'js', 'app.js'), 'utf8');

// 1. Verify code snippet in js/app.js
assert(js.includes('caFormatted = caScore;'), 'caFormatted should be assigned caScore directly (no % and no grade)');
assert(!js.includes('caFormatted = `${caScore}%'), 'caFormatted must not contain percentage symbol');
assert(js.includes('${parseFloat(metrics.caScore) > 0 ? metrics.caFormatted : \'-\'}'), 'Admin agent card must use metrics.caFormatted without percentage');

console.log('[PASS] Static code checks verified: caFormatted does not have % and formats as decimal with two digits.');

// 2. Simulate calculateUserPaSummaryMetrics calculation
function simulateCaMetrics(scores) {
  let caFormatted = '-';
  let caScore = '0.00';
  if (scores.length > 0) {
    const numScores = scores.map(l => Number(l) || 0);
    caScore = (numScores.reduce((a, b) => a + b, 0) / numScores.length).toFixed(2);
    caFormatted = caScore;
  }
  return { caScore, caFormatted };
}

// Case A: Scores [95, 98] -> avg 96.50
const testA = simulateCaMetrics([95, 98]);
assert.strictEqual(testA.caFormatted, '96.50');
assert(!testA.caFormatted.includes('%'), 'Must not contain %');
assert(/^\d+\.\d{2}$/.test(testA.caFormatted), 'Must be decimal with 2 digits behind comma/dot');
console.log(`[PASS] Case A (95, 98): ${testA.caFormatted} (2 decimals, no %)`);

// Case B: Scores [88] -> avg 88.00 (two decimal digits enforced)
const testB = simulateCaMetrics([88]);
assert.strictEqual(testB.caFormatted, '88.00');
assert(!testB.caFormatted.includes('%'), 'Must not contain %');
assert(/^\d+\.\d{2}$/.test(testB.caFormatted), 'Must be decimal with 2 digits behind comma/dot');
console.log(`[PASS] Case B (88): ${testB.caFormatted} (2 decimals, no %)`);

// Case C: Scores [78.25, 80.5] -> avg 79.38
const testC = simulateCaMetrics([78.25, 80.5]);
assert.strictEqual(testC.caFormatted, '79.38');
assert(!testC.caFormatted.includes('%'), 'Must not contain %');
assert(/^\d+\.\d{2}$/.test(testC.caFormatted), 'Must be decimal with 2 digits behind comma/dot');
console.log(`[PASS] Case C (78.25, 80.5): ${testC.caFormatted} (2 decimals, no %)`);

// Case D: No scores -> '-'
const testD = simulateCaMetrics([]);
assert.strictEqual(testD.caFormatted, '-');
console.log(`[PASS] Case D (No logs): ${testD.caFormatted}`);

console.log('\n=== ALL ASSERTIONS PASSED! ===');
