/**
 * Google Apps Script for Sri Sadguru Aadhar Foundation
 * 
 * Features:
 * 1. Appends new website contact form submissions to the active Google Sheet.
 * 2. Automatically sends an instant Email Notification to the foundation's admin email.
 * 3. Handles CORS and JSON/POST requests cleanly.
 * 
 * Setup Instructions:
 * 1. Open Google Sheets (https://sheets.google.com) and create a new sheet (e.g. "Website Enquiries").
 * 2. In Google Sheets menu, click: Extensions -> Apps Script.
 * 3. Delete any code in the editor and paste this entire code.
 * 4. Update ADMIN_EMAIL below with the email address where you want to receive notifications.
 * 5. Click "Save" (disk icon), then click "Deploy" -> "New deployment".
 * 6. Under "Select type", choose "Web app".
 * 7. Set:
 *    - Description: "Website Contact Form Webhook"
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone" (crucial so the website can submit without login)
 * 8. Click "Deploy", grant permissions if prompted, and copy the Web App URL.
 * 9. Paste that URL into ContactForm.jsx or set it in window.GOOGLE_SHEET_SCRIPT_URL.
 */

const ADMIN_EMAIL = "srisadguruaadharfoundation26@gmail.com";
const SHEET_NAME = "Enquiries";

function doPost(e) {
  try {
    let data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    const firstName = data.firstName || "";
    const lastName = data.lastName || "";
    const fullName = data.fullName || (firstName + " " + lastName).trim();
    const mobile = data.mobile || "";
    const email = data.email || "";
    const message = data.message || "";
    const timestamp = data.submittedAt || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // Open or create sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Create header row
      sheet.appendRow(["Timestamp", "First Name", "Last Name", "Full Name", "Mobile Number", "Email", "Message"]);
      const headerRange = sheet.getRange(1, 1, 1, 7);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#0c2947");
      headerRange.setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }

    // Append the submission row
    sheet.appendRow([timestamp, firstName, lastName, fullName, mobile, email, message]);

    // Send Email Notification
    if (ADMIN_EMAIL && ADMIN_EMAIL !== "your-email@example.com") {
      const subject = `New Website Enquiry from ${fullName || mobile}`;
      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; color: #1e293b;">
          <h2 style="color: #0c2947; margin-top: 0; border-bottom: 2px solid #22c55e; padding-bottom: 8px;">
            Sri Sadguru Aadhar Foundation - New Enquiry
          </h2>
          <p style="font-size: 15px; color: #475569;">A new enquiry was submitted through the website contact form:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; font-weight: bold; width: 140px; border: 1px solid #e2e8f0;">Date & Time</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${timestamp}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Full Name</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${fullName}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Mobile Number</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="tel:${mobile}" style="color: #0284c7; text-decoration: none;">${mobile}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Email Address</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; font-weight: bold; vertical-align: top; border: 1px solid #e2e8f0;">Message / Notes</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${message || "No specific message provided."}</td>
            </tr>
          </table>
          <div style="margin-top: 24px;">
            <a href="https://wa.me/${mobile.replace(/\\D/g, '')}" style="display: inline-block; padding: 10px 18px; background-color: #22c55e; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">
              Reply on WhatsApp ↗
            </a>
          </div>
          <p style="font-size: 12px; color: #94a3b8; margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 12px;">
            This email was sent automatically from the Sri Sadguru Aadhar Foundation website contact form.
          </p>
        </div>
      `;

      MailApp.sendEmail({
        to: ADMIN_EMAIL,
        subject: subject,
        htmlBody: htmlBody,
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", message: "Enquiry recorded successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "active", message: "Sri Sadguru Aadhar Foundation Form Webhook is live." }))
    .setMimeType(ContentService.MimeType.JSON);
}
