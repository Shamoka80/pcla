# Google Forms Backend Setup for Poplar Christian Learning Academy Contact Form

## 1) Google Form setup steps

1. Open Google Forms: <https://forms.google.com>.
2. Click **Blank form**.
3. Set the form title to: **Poplar Christian Learning Academy Contact Form**.
4. Add the following questions in this exact order:
   1. **Parent/Guardian Name** → *Short answer* → **Required**.
   2. **Email Address** → *Short answer* → **Required**.
      - Click the 3-dot menu on this question → **Response validation**.
      - Set validation to **Text** → **Email address**.
   3. **Phone Number** → *Short answer* → **Required**.
   4. **Number of Children** → *Short answer* (or dropdown 1–10) → **Required**.
   5. **Children Information** → *Paragraph* → **Required**.
      - Website JS should combine child rows like `Child 1: Emma (Age 4); Child 2: Noah (Age 6)` and submit as one value.
   6. **Preferred Location** → *Multiple choice* → **Required**.
      - `Poplar Christian Learning Academy — Remount Rd.`
      - `Poplar Christian Learning Academy II — Nazarene Street`
      - `Not Sure`
   7. **Inquiry Type** → *Multiple choice* → **Required**.
      - `Enrollment Inquiry`
      - `Tour Information`
      - `Program Question`
      - `General Question`
   8. **Message** → *Paragraph* → **Required**.
5. In **Settings**:
   - Keep “Collect email addresses” **off** if your website already submits Email Address as a field.
   - Keep “Limit to 1 response” **off** (public website form use case).
   - Keep “Allow response editing” **off** unless explicitly needed.
6. Click **Send** and copy the form link for internal setup reference.

---

## 2) Google Sheet setup steps

1. In the Google Form, open the **Responses** tab.
2. Click the green **Create Spreadsheet** icon.
3. Choose **Create a new spreadsheet**.
4. Name it something like: `PCLA Contact Form Responses`.
5. Confirm the sheet has columns for all questions and timestamp.
6. Use this sheet as the source of truth for all incoming website contact submissions.

---

## 3) Apps Script email notification code

Open the linked response sheet, then:

1. Go to **Extensions → Apps Script**.
2. Replace `Code.gs` contents with this script.
3. Save project as `PCLA Contact Notifications`.

```javascript
/**
 * Trigger type: From spreadsheet -> On form submit
 * Sends formatted email to poplarcla@gmail.com for each new form response.
 */
function onFormSubmit(e) {
  const RECIPIENT = 'poplarcla@gmail.com';

  // Use named values for safer mapping by question label.
  const named = e.namedValues || {};

  const parentName = getSingle(named, 'Parent/Guardian Name');
  const email = getSingle(named, 'Email Address');
  const phone = getSingle(named, 'Phone Number');
  const numberOfChildren = getSingle(named, 'Number of Children');
  const childrenInfo = getSingle(named, 'Children Information');
  const preferredLocation = getSingle(named, 'Preferred Location');
  const inquiryType = getSingle(named, 'Inquiry Type');
  const message = getSingle(named, 'Message');

  const timestampRaw = e.range
    ? e.range.getSheet().getRange(e.range.getRow(), 1).getDisplayValue()
    : new Date();

  const subject = `New PCLA Contact Inquiry: ${inquiryType || 'General'}`;

  const textBody = [
    'A new contact form submission has been received.',
    '',
    `Submission timestamp: ${timestampRaw}`,
    `Parent/Guardian Name: ${parentName}`,
    `Email Address: ${email}`,
    `Phone Number: ${phone}`,
    `Number of Children: ${numberOfChildren}`,
    `Children Information: ${childrenInfo}`,
    `Preferred Location: ${preferredLocation}`,
    `Inquiry Type: ${inquiryType}`,
    'Message:',
    message,
    '',
    '— Poplar Christian Learning Academy Website Contact Backend'
  ].join('\n');

  const htmlBody = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#222;">
      <h2 style="margin-bottom:8px;">New Contact Form Submission</h2>
      <p style="margin-top:0;">A new inquiry was submitted from the website contact form.</p>
      <table cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse;border-color:#ddd;">
        <tr><td><strong>Submission timestamp</strong></td><td>${escapeHtml(String(timestampRaw))}</td></tr>
        <tr><td><strong>Parent/Guardian Name</strong></td><td>${escapeHtml(parentName)}</td></tr>
        <tr><td><strong>Email Address</strong></td><td>${escapeHtml(email)}</td></tr>
        <tr><td><strong>Phone Number</strong></td><td>${escapeHtml(phone)}</td></tr>
        <tr><td><strong>Number of Children</strong></td><td>${escapeHtml(numberOfChildren)}</td></tr>
        <tr><td><strong>Children Information</strong></td><td>${escapeHtml(childrenInfo)}</td></tr>
        <tr><td><strong>Preferred Location</strong></td><td>${escapeHtml(preferredLocation)}</td></tr>
        <tr><td><strong>Inquiry Type</strong></td><td>${escapeHtml(inquiryType)}</td></tr>
        <tr><td><strong>Message</strong></td><td>${escapeHtml(message).replace(/\n/g, '<br>')}</td></tr>
      </table>
    </div>
  `;

  MailApp.sendEmail({
    to: RECIPIENT,
    subject,
    body: textBody,
    htmlBody
  });
}

function getSingle(namedValues, key) {
  if (!namedValues[key] || !namedValues[key].length) return '';
  return String(namedValues[key][0] || '').trim();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
```

### Basic Google Forms notifications (if available)

Google Forms may offer built-in notifications in **Responses** menu (3 dots):

- **Get email notifications for new responses** (owner notifications).

If this option is unavailable or inconsistent for your account type, use the Apps Script trigger below (recommended) for reliable formatted notifications.

---

## 4) Apps Script trigger setup steps

1. In Apps Script editor, click **Triggers** (clock icon).
2. Click **+ Add Trigger**.
3. Configure:
   - **Choose which function to run:** `onFormSubmit`
   - **Choose which deployment should run:** `Head`
   - **Select event source:** `From spreadsheet`
   - **Select event type:** `On form submit`
4. Click **Save**.
5. Authorize requested permissions (Gmail send + spreadsheet access).
6. Confirm trigger appears in the trigger list.

---

## 5) Field ID extraction steps

You must extract these values for website integration:

- `GOOGLE_FORM_ACTION_URL`
- `ENTRY_PARENT_NAME`
- `ENTRY_EMAIL`
- `ENTRY_PHONE`
- `ENTRY_NUMBER_OF_CHILDREN`
- `ENTRY_CHILDREN_INFORMATION`
- `ENTRY_PREFERRED_LOCATION`
- `ENTRY_INQUIRY_TYPE`
- `ENTRY_MESSAGE`

### A) Get `GOOGLE_FORM_ACTION_URL`

1. Open the form’s **Send** dialog.
2. Copy the link (looks like `https://docs.google.com/forms/d/e/<FORM_ID>/viewform?...`).
3. Convert to POST endpoint:

`https://docs.google.com/forms/d/e/<FORM_ID>/formResponse`

That is your `GOOGLE_FORM_ACTION_URL`.

### B) Get each `entry.<id>` value using **Prefilled link** (recommended)

1. In Google Form, click 3-dot menu (top-right) → **Get pre-filled link**.
2. Fill sample values in every field.
3. Click **Get link** and copy URL.
4. In the URL, locate parameters like `entry.123456789=Sample`.
5. Map each `entry.<id>` to your field label by comparing sample values.

Example mapping format:

```txt
ENTRY_PARENT_NAME=entry.111111111
ENTRY_EMAIL=entry.222222222
ENTRY_PHONE=entry.333333333
ENTRY_NUMBER_OF_CHILDREN=entry.444444444
ENTRY_CHILDREN_INFORMATION=entry.555555555
ENTRY_PREFERRED_LOCATION=entry.666666666
ENTRY_INQUIRY_TYPE=entry.777777777
ENTRY_MESSAGE=entry.888888888
```

### C) Alternative: extract from page source

1. Open form `viewform` page in browser.
2. Right click → **View page source**.
3. Search for your field labels and nearby `entry.<id>` tokens.
4. Capture the matching `entry` IDs.
5. Validate by submitting a test request from local HTML form.

### D) Native website form wiring pattern (no iframe)

The live website implementation uses a native HTML contact form plus vanilla JavaScript in `assets/js/main.js`.

- Submission is sent with `fetch(...)` using `method: "POST"` and `mode: "no-cors"`.
- Google Forms field IDs are appended to a `FormData` payload.
- There is no visible Google Form iframe.
- There is no hidden iframe submission pattern.
- Child rows are combined into one `Children Information` value before submit.

Implementation-aligned example:

```javascript
const payload = new FormData();
payload.append('entry.1209008278', form.parentName.value.trim());
payload.append('entry.1662912245', form.email.value.trim());
payload.append('entry.972912350', form.phone.value.trim());
payload.append('entry.74903763', String(childCount));
payload.append('entry.1984705636', childrenInformation);
payload.append('entry.188894792', form.preferredLocation.value.trim());
payload.append('entry.1026874148', form.inquiryType.value.trim());
payload.append('entry.452556170', form.message.value.trim());

await fetch('https://docs.google.com/forms/d/e/1FAIpQLSeRxqGJbIOWbt7Z-Wb_sYaA6DTj1smxrAMXlcFZi53UfdmIyQ/formResponse', {
  method: 'POST',
  mode: 'no-cors',
  body: payload
});
```

---

## 6) Final integration checklist

- [ ] Form title exactly: **Poplar Christian Learning Academy Contact Form**.
- [ ] All required fields created with matching labels.
- [ ] Preferred Location options exactly match required values.
- [ ] Inquiry Type options exactly match required values.
- [ ] Response destination sheet connected.
- [ ] Apps Script code saved.
- [ ] Form-submit trigger installed and authorized.
- [ ] `GOOGLE_FORM_ACTION_URL` extracted.
- [ ] All `ENTRY_*` IDs mapped and inserted into HTML/JS.
- [ ] Child rows combined into single `Children Information` string before submit.
- [ ] Success message shown exactly as required.

---

## 7) Testing checklist

1. Submit a complete test inquiry from the website form.
2. Confirm the user sees exact success text:

> Thank you. Your message has been successfully submitted. If you do not receive a response from us within 48 hours by phone or email, please contact our office at (843) 225-1004.

3. Confirm a new row appears in linked Google Sheet.
4. Confirm all columns contain the expected values.
5. Confirm formatted notification email arrives at `poplarcla@gmail.com`.
6. Submit at least one test per Inquiry Type.
7. Submit with multiple children and verify `Children Information` formatting.
8. Validate that no visible embedded Google Form iframe is present on the contact page.
9. Re-test after any field label change (label changes can break `namedValues` key mapping).

