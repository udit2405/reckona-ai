/* Yukti — lead capture backend.
   Deploy this as a Google Apps Script Web App bound to a Google Sheet
   (see README section "Connecting lead capture" for setup steps).
   Each form submission from index.html POSTs a JSON body here with a
   `type` field ("audit_request" | "booking" | "newsletter") and is
   appended as a row to the matching tab, creating the tab + header
   row on first use. */

const SHEETS = {
  audit_request: {
    tab: 'Audit Requests',
    headers: ['Timestamp', 'Page', 'Name', 'Email', 'Website', 'WhatsApp', 'Audit Type', 'Goal']
  },
  booking: {
    tab: 'Bookings',
    headers: ['Timestamp', 'Page', 'Name', 'Email', 'Company', 'Prep For', 'Preferred Time']
  },
  newsletter: {
    tab: 'Newsletter',
    headers: ['Timestamp', 'Page', 'Email']
  }
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const config = SHEETS[data.type];
    if (!config) return ContentService.createTextOutput('ignored');

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(config.tab);
    if (!sheet) {
      sheet = ss.insertSheet(config.tab);
      sheet.appendRow(config.headers);
    }

    let row;
    if (data.type === 'audit_request') {
      row = [data.ts, data.page, data.name, data.email, data.website, data.whatsapp, data.auditType, data.goal];
    } else if (data.type === 'booking') {
      row = [data.ts, data.page, data.name, data.email, data.company, data.prepFor, data.preferredTime];
    } else if (data.type === 'newsletter') {
      row = [data.ts, data.page, data.email];
    }
    sheet.appendRow(row);

    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('error: ' + err.message);
  }
}
