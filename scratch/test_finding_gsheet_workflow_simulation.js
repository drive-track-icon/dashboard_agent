const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- WORKFLOW SIMULATION: Finding Google Spreadsheet Integration ---');

// Mock localStorage
const storage = {};
global.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; }
};

// Mock fetch
const fetchHistory = [];
global.fetch = async (url, options = {}) => {
  fetchHistory.push({ url, options });
  if (url.includes('action=ping')) {
    return {
      ok: true,
      json: async () => ({ success: true, message: 'Google Apps Script Finding siap terhubung!' })
    };
  }
  if (url.includes('action=get_all')) {
    return {
      ok: true,
      json: async () => ({
        success: true,
        count: 1,
        data: [
          {
            id: 'FND-2026-999',
            date: '2026-10-02',
            userFullName: 'Budi Santoso',
            department: 'CSO DIGILIVE CHAT - WA',
            findingType: 'Feedback Negatif',
            category: 'Informasi',
            deviationLevel: 'Reminder 1',
            desc: 'Salah informasi estimasi perbaikan jaringan',
            commitment: 'Konfirmasi tiket NOC sebelum memberi info waktu',
            actionPlan: 'Briefing SLA recovery',
            status: 'Open',
            createdAt: '2026-10-02T10:00:00.000Z'
          }
        ]
      })
    };
  }
  // POST response
  return {
    ok: true,
    json: async () => ({ success: true, message: 'Success' }),
    text: async () => 'OK'
  };
};

// 1. Verify Config Persistence
console.log('1. Testing Config storage & retrieval...');
const mockConfig = {
  webAppUrl: 'https://script.google.com/macros/s/AKfycb-finding-test/exec',
  sheetId: 'https://docs.google.com/spreadsheets/d/1FindingSpreadsheet123/edit',
  sheetName: 'Finding_Data',
  autoSync: true,
  lastSyncTime: '02/10/2026 23:00',
  lastSyncStatus: 'configured'
};

localStorage.setItem('vortex_finding_gsheet_config', JSON.stringify(mockConfig));
const saved = JSON.parse(localStorage.getItem('vortex_finding_gsheet_config'));
assert.strictEqual(saved.webAppUrl, mockConfig.webAppUrl);
assert.strictEqual(saved.sheetName, 'Finding_Data');
assert.strictEqual(saved.autoSync, true);
console.log('✔ Config persistence verified.');

// 2. Test Auto-Sync Trigger Payload Generation
console.log('2. Testing Auto-Sync actions...');
function simulateAutoSync(action, payload) {
  const cfg = JSON.parse(localStorage.getItem('vortex_finding_gsheet_config'));
  if (!cfg.webAppUrl || !cfg.autoSync) return;
  fetch(cfg.webAppUrl, {
    method: 'POST',
    body: JSON.stringify({ action, ...payload })
  });
}

// Save action
const sampleFinding = {
  id: 'FND-2026-001',
  date: '2026-10-02',
  userFullName: 'Agent Test',
  department: 'CSO INBOUND',
  findingType: 'Feedback Negatif',
  category: 'Keluhan',
  deviationLevel: 'Reminder 2',
  desc: 'Test desc',
  commitment: 'Test commitment',
  actionPlan: 'Test plan',
  status: 'Open'
};

simulateAutoSync('save', { finding: sampleFinding });
const lastPost = fetchHistory[fetchHistory.length - 1];
assert.strictEqual(lastPost.options.method, 'POST');
const sentBody = JSON.parse(lastPost.options.body);
assert.strictEqual(sentBody.action, 'save');
assert.strictEqual(sentBody.finding.id, 'FND-2026-001');
console.log('✔ Auto-sync save payload verified.');

// Delete action
simulateAutoSync('delete', { id: 'FND-2026-001' });
const deletePost = JSON.parse(fetchHistory[fetchHistory.length - 1].options.body);
assert.strictEqual(deletePost.action, 'delete');
assert.strictEqual(deletePost.id, 'FND-2026-001');
console.log('✔ Auto-sync delete payload verified.');

// Delete Month action
simulateAutoSync('delete_month', { month: '2026-10' });
const deleteMonthPost = JSON.parse(fetchHistory[fetchHistory.length - 1].options.body);
assert.strictEqual(deleteMonthPost.action, 'delete_month');
assert.strictEqual(deleteMonthPost.month, '2026-10');
console.log('✔ Auto-sync delete_month payload verified.');

// Delete Batch action
simulateAutoSync('delete_batch', { ids: ['FND-2026-001', 'FND-2026-002'] });
const deleteBatchPost = JSON.parse(fetchHistory[fetchHistory.length - 1].options.body);
assert.strictEqual(deleteBatchPost.action, 'delete_batch');
assert.strictEqual(deleteBatchPost.ids.length, 2);
console.log('✔ Auto-sync delete_batch payload verified.');

// 3. Test Pull action
console.log('3. Testing Pull from Google Apps Script...');
async function simulatePull() {
  const cfg = JSON.parse(localStorage.getItem('vortex_finding_gsheet_config'));
  const resp = await fetch(cfg.webAppUrl + '?action=get_all');
  const json = await resp.json();
  if (json.success && json.data) {
    localStorage.setItem('vortex_findings', JSON.stringify(json.data));
  }
}

simulatePull().then(() => {
  const currentFindings = JSON.parse(localStorage.getItem('vortex_findings'));
  assert.strictEqual(currentFindings.length, 1);
  assert.strictEqual(currentFindings[0].id, 'FND-2026-999');
  assert.strictEqual(currentFindings[0].userFullName, 'Budi Santoso');
  console.log('✔ Pull data simulation verified successfully.');

  console.log('\n======================================================');
  console.log('🎉 ALL FINDING GOOGLE SPREADSHEET WORKFLOW TESTS PASSED!');
  console.log('======================================================');
});
