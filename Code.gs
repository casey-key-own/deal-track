// ============================================================
// CASEY'S DEAL TRACKER — Google Apps Script Backend
// ============================================================
// SETUP INSTRUCTIONS:
// 1. Go to script.google.com
// 2. Create a new project, name it "Deal Tracker"
// 3. Paste this entire file into Code.gs
// 4. Click Deploy > New Deployment > Web App
// 5. Set "Who has access" to "Anyone"  (no sign-in needed since only your wife uses it)
// 6. Click Deploy, copy the Web App URL
// 7. Paste that URL into index.html where it says YOUR_GAS_URL_HERE
// ============================================================

const SHEET_NAME = "Deals";

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Write header row
    sheet.appendRow([
      "client","address","type","price","commission",
      "coop","loan","date","other","notes","color",
      "pending","em","inspection","closed",
      "titleCompany","netCommission","netLocked"
    ]);
  }
  return sheet;
}

// ── HANDLE GET (load deals) ──────────────────────────────
function doGet(e) {
  const action = e.parameter.action;
  if (action === "load") {
    return loadDeals();
  }
  return ContentService.createTextOutput(JSON.stringify({ error: "Unknown action" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── HANDLE POST (save deals) ─────────────────────────────
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    if (payload.action === "save") {
      saveDeals(payload.deals);
      return ContentService.createTextOutput(JSON.stringify({ ok: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── LOAD ─────────────────────────────────────────────────
function loadDeals() {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) {
    return ContentService.createTextOutput(JSON.stringify({ deals: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const headers = rows[0];
  const deals = rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => {
      // Convert boolean strings back
      if (row[i] === "TRUE" || row[i] === true) obj[h] = true;
      else if (row[i] === "FALSE" || row[i] === false) obj[h] = false;
      else obj[h] = row[i] === "" ? "" : row[i];
    });
    return obj;
  });

  return ContentService.createTextOutput(JSON.stringify({ deals }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── SAVE ─────────────────────────────────────────────────
function saveDeals(deals) {
  const sheet = getSheet();
  
  // Clear everything except header
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
  }

  // Write all deals
  const headers = [
    "client","address","type","price","commission",
    "coop","loan","date","other","notes","color",
    "pending","em","inspection","closed",
    "titleCompany","netCommission","netLocked"
  ];

  deals.forEach(deal => {
    const row = headers.map(h => {
      const val = deal[h];
      if (val === undefined || val === null) return "";
      return val;
    });
    sheet.appendRow(row);
  });
}
