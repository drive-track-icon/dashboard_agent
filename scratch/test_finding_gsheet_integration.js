const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- TEST 1: Verifying HTML Elements for Finding Google Spreadsheet ---');
const htmlContent = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
assert(htmlContent.includes('id="btnOpenFindingGoogleSheetsModal"'), 'index.html must contain #btnOpenFindingGoogleSheetsModal');
assert(htmlContent.includes('id="findingGSheetHeaderBadge"'), 'index.html must contain #findingGSheetHeaderBadge');
assert(htmlContent.includes('id="findingGSheetSyncBar"'), 'index.html must contain #findingGSheetSyncBar');
assert(htmlContent.includes('id="findingGSheetStatusBadge"'), 'index.html must contain #findingGSheetStatusBadge');
assert(htmlContent.includes('id="findingGSheetStatusInfo"'), 'index.html must contain #findingGSheetStatusInfo');
assert(htmlContent.includes('id="btnFindingGSheetOpenLink"'), 'index.html must contain #btnFindingGSheetOpenLink');
assert(htmlContent.includes('id="btnFindingGSheetPull"'), 'index.html must contain #btnFindingGSheetPull');
assert(htmlContent.includes('id="btnFindingGSheetPush"'), 'index.html must contain #btnFindingGSheetPush');
assert(htmlContent.includes('id="btnFindingGSheetConfig"'), 'index.html must contain #btnFindingGSheetConfig');
assert(htmlContent.includes('id="modalFindingGoogleSheets"'), 'index.html must contain #modalFindingGoogleSheets');
assert(htmlContent.includes('id="inputFindingGSheetWebAppUrl"'), 'index.html must contain #inputFindingGSheetWebAppUrl');
assert(htmlContent.includes('id="inputFindingGSheetUrl"'), 'index.html must contain #inputFindingGSheetUrl');
assert(htmlContent.includes('id="checkFindingGSheetAutoSync"'), 'index.html must contain #checkFindingGSheetAutoSync');
assert(htmlContent.includes('id="btnCopyFindingAppsScript"'), 'index.html must contain #btnCopyFindingAppsScript');
console.log('✔ HTML elements verified successfully.');

console.log('--- TEST 2: Verifying Standalone Google Apps Script File for Finding ---');
const gasPath = path.join(__dirname, '..', 'google_apps_script_finding.js');
assert(fs.existsSync(gasPath), 'google_apps_script_finding.js must exist in root');
const gasContent = fs.readFileSync(gasPath, 'utf8');
assert(gasContent.includes('function doGet(e)'), 'Apps Script must contain doGet');
assert(gasContent.includes('function doPost(e)'), 'Apps Script must contain doPost');
assert(gasContent.includes('action === \'sync_all\''), 'Apps Script must handle sync_all');
assert(gasContent.includes('action === \'save\''), 'Apps Script must handle save');
assert(gasContent.includes('action === \'delete\''), 'Apps Script must handle delete');
assert(gasContent.includes('action === \'delete_month\''), 'Apps Script must handle delete_month');
assert(gasContent.includes('action === \'delete_batch\''), 'Apps Script must handle delete_batch');
console.log('✔ Google Apps Script file for Finding verified successfully.');

console.log('--- TEST 3: Verifying js/app.js Implementation for Finding GSheet ---');
const appContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'app.js'), 'utf8');
assert(appContent.includes('getFindingGSheetConfig()'), 'State must have getFindingGSheetConfig');
assert(appContent.includes('saveFindingGSheetConfig(cfg)'), 'State must have saveFindingGSheetConfig');
assert(appContent.includes('btnOpenFindingGoogleSheetsModal: document.getElementById(\'btnOpenFindingGoogleSheetsModal\')'), 'UI must cache btnOpenFindingGoogleSheetsModal');
assert(appContent.includes('function renderFindingGSheetBar()'), 'renderFindingGSheetBar function must exist');
assert(appContent.includes('function openFindingGSheetModal()'), 'openFindingGSheetModal function must exist');
assert(appContent.includes('function pushFindingToGoogleSheets()'), 'pushFindingToGoogleSheets function must exist');
assert(appContent.includes('function pullFindingFromGoogleSheets()'), 'pullFindingFromGoogleSheets function must exist');
assert(appContent.includes('function autoSyncFindingAction('), 'autoSyncFindingAction function must exist');
assert(appContent.includes('autoSyncFindingAction(\'save\''), 'handleSaveFinding must call autoSyncFindingAction save');
assert(appContent.includes('autoSyncFindingAction(\'delete\''), 'promptConfirmDelete must call autoSyncFindingAction delete for finding');
assert(appContent.includes('autoSyncFindingAction(\'delete_month\''), 'promptConfirmDelete must call autoSyncFindingAction delete_month for finding');
assert(appContent.includes('autoSyncFindingAction(\'delete_batch\''), 'promptConfirmDelete must call autoSyncFindingAction delete_batch for finding');
assert(appContent.includes('renderFindingGSheetBar()'), 'renderFindingPage must call renderFindingGSheetBar');

// Event listener assertions
assert(appContent.includes('if (UI.btnOpenFindingGoogleSheetsModal) UI.btnOpenFindingGoogleSheetsModal.addEventListener'), 'btnOpenFindingGoogleSheetsModal click listener must exist');
assert(appContent.includes('if (UI.btnFindingGSheetConfig) UI.btnFindingGSheetConfig.addEventListener'), 'btnFindingGSheetConfig click listener must exist');
assert(appContent.includes('if (UI.btnCloseFindingGSheetModal) UI.btnCloseFindingGSheetModal.addEventListener'), 'btnCloseFindingGSheetModal click listener must exist');
assert(appContent.includes('if (UI.tabBtnFindingGSheetConfig) UI.tabBtnFindingGSheetConfig.addEventListener'), 'tabBtnFindingGSheetConfig click listener must exist');
assert(appContent.includes('if (UI.tabBtnFindingGSheetGuide) UI.tabBtnFindingGSheetGuide.addEventListener'), 'tabBtnFindingGSheetGuide click listener must exist');
assert(appContent.includes('if (UI.btnFindingGSheetSaveConfig) UI.btnFindingGSheetSaveConfig.addEventListener'), 'btnFindingGSheetSaveConfig click listener must exist');
assert(appContent.includes('if (UI.btnFindingGSheetTest) UI.btnFindingGSheetTest.addEventListener'), 'btnFindingGSheetTest click listener must exist');
assert(appContent.includes('if (UI.btnFindingGSheetPush) UI.btnFindingGSheetPush.addEventListener'), 'btnFindingGSheetPush click listener must exist');
assert(appContent.includes('if (UI.btnFindingGSheetPull) UI.btnFindingGSheetPull.addEventListener'), 'btnFindingGSheetPull click listener must exist');
assert(appContent.includes('if (UI.btnCopyFindingAppsScript) UI.btnCopyFindingAppsScript.addEventListener'), 'btnCopyFindingAppsScript click listener must exist');

console.log('✔ js/app.js functions, state, and event bindings verified successfully.');

console.log('\n========================================');
console.log('🎉 ALL FINDING GOOGLE SPREADSHEET TESTS PASSED!');
console.log('========================================');
