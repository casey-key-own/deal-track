# Deal Tracker — Setup Guide

## What You're Getting
- A web app your wife can open on iPhone (feels like a native app) and Mac
- All data syncs through a Google Sheet in real time
- Free forever — no subscriptions, no servers

---

## Step 1 — Set Up the Google Sheet & Backend

1. Go to **drive.google.com**
2. Click **New > Google Sheets** — name it "Deal Tracker"
3. Leave it open, then open a new tab
4. Go to **script.google.com**
5. Click **New Project** — name it "Deal Tracker API"
6. Delete everything in the Code.gs editor
7. Open the file `Code.gs` from this folder and paste the entire contents in
8. Click **Save** (floppy disk icon)

### Deploy the Script
9. Click **Deploy > New Deployment**
10. Click the gear icon next to "Type" and select **Web App**
11. Set these options:
    - Description: `Deal Tracker v1`
    - Execute as: **Me**
    - Who has access: **Anyone**
12. Click **Deploy**
13. Click **Authorize access** — sign in with your Google account, click "Allow"
14. **Copy the Web App URL** — it looks like:
    `https://script.google.com/macros/s/XXXXXXXXX/exec`

### Link the Sheet to the Script
15. Go back to your Google Sheet
16. Click **Extensions > Apps Script** — this opens the same script
17. This links them permanently

---

## Step 2 — Add Your URL to the App

1. Open `index.html` in a text editor
2. Find this line near the top of the `<script>` section:
   ```
   const GAS_URL = "YOUR_GAS_URL_HERE";
   ```
3. Replace `YOUR_GAS_URL_HERE` with the URL you copied
4. Save the file

---

## Step 3 — Host on GitHub Pages (Free)

1. Go to **github.com** and create a free account if you don't have one
2. Click **New Repository**
   - Name: `deal-tracker`
   - Set to **Public**
   - Click **Create Repository**
3. Upload `index.html` to the repository
4. Go to **Settings > Pages**
5. Under "Source" select **main branch**, click **Save**
6. Wait 2 minutes, then your app is live at:
   `https://YOURUSERNAME.github.io/deal-tracker`

---

## Step 4 — Add to iPhone Home Screen

1. Open Safari on iPhone (must be Safari, not Chrome)
2. Go to your GitHub Pages URL
3. Tap the **Share** button (box with arrow)
4. Scroll down and tap **Add to Home Screen**
5. Name it "Deals" and tap **Add**

It will appear on the home screen like a native app — no browser bar, fullscreen.

---

## Step 5 — Mac Access

Just bookmark the GitHub Pages URL in any browser. That's it.

---

## How Sync Works

- Every time a deal is saved, added, or changed, the app sends the full list to Google Sheets
- When the app opens, it loads from Google Sheets first
- If there's no internet, it falls back to local storage on that device
- The colored dot next to "Deals" in the app shows sync status:
  - 🟡 Yellow = syncing
  - 🟢 Green = synced
  - 🔴 Red = sync error (no internet)

---

## Viewing Data in the Sheet

Your wife (or you) can open the Google Sheet at any time and see all deals in a spreadsheet format. Do not manually edit the sheet — changes there won't sync back to the app. The sheet is a read-only mirror.

---

## Troubleshooting

**Sync not working:**
- Make sure the GAS_URL in index.html is correct
- Re-deploy the Apps Script (Deploy > Manage Deployments > Edit > New version)

**Changes on iPhone not showing on Mac:**
- Pull down to refresh the page on Mac
- The app loads from cloud on every open

**"Add to Home Screen" not appearing:**
- Must use Safari on iPhone, not Chrome
