# Deployment & Incognito Testing Guide

This guide provides end-to-step instructions for deploying your **Obsidian Radium Developer Portfolio** to GitHub Pages, Vercel, or Netlify, and conducting a rigorous **Incognito Mode Test** to guarantee public access without authentication barriers.

---

## 🛠️ Step 1: Deploying to GitHub & GitHub Pages

### 1.1 Initialize Local Git Repository
Open PowerShell or your terminal in the portfolio project directory:

```powershell
# Navigate to the project directory
cd "C:\Users\Deva Darshini\.gemini\antigravity\scratch\developer-portfolio"

# Initialize git repository
git init

# Add all project files
git add .

# Create the initial commit
git commit -m "feat: complete deployment-ready Obsidian Radium portfolio"
```

### 1.2 Create a Public GitHub Repository
1. Open your web browser and navigate to [https://github.com/new](https://github.com/new).
2. Set the **Repository name**: `adithya-developer-portfolio` (or your preferred name).
3. **CRITICAL STEP:** Select **Public** as the repository visibility:
   - 🔘 **Public** *(Anyone on the internet can see this repository. You choose who can commit.)*
   - ❌ **Private** *(Will cause 404 errors for evaluators!)*
4. Leave **"Initialize this repository with:"** unchecked (do not check README, .gitignore, or license as they already exist in this project).
5. Click **Create repository**.

### 1.3 Link and Push Code
Copy the commands shown on GitHub or run the following:

```powershell
# Replace <YOUR_GITHUB_USERNAME> with your actual GitHub username
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/adithya-developer-portfolio.git
git branch -M main
git push -u origin main
```

---

## 🚀 Step 2: Activating GitHub Pages

### Method A: Automated GitHub Actions (Included!)
Because `.github/workflows/deploy.yml` is already included in your project, GitHub will automatically trigger the deployment pipeline:
1. Go to your repository on GitHub.
2. Click the **Actions** tab.
3. You will see the **Deploy to GitHub Pages** workflow running. Once it turns green (approx. 30–60 seconds), your site is live!

### Method B: Standard GitHub Pages Branch Configuration
If you prefer standard branch deployment:
1. Go to your repository on GitHub.
2. Click **Settings** (gear icon in the top repository navigation).
3. Click **Pages** in the left sidebar menu (under "Code and automation").
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`
   - **Branch**: Select `main`
   - **Folder**: Select `/ (root)`
5. Click **Save**.
6. Refresh the page after 1 minute; GitHub will display:
   > *"Your site is live at https://<YOUR_GITHUB_USERNAME>.github.io/adithya-developer-portfolio/"*

---

## ⚡ Alternative Deployment Options

### Option 2: Deploy to Vercel (Instant 1-Click)
1. Navigate to [https://vercel.com/new](https://vercel.com/new).
2. Connect your GitHub account and select `adithya-developer-portfolio`.
3. Leave all default build settings as-is (the included `vercel.json` automatically configures routes).
4. Click **Deploy**.
5. Your custom URL will look like: `https://adithya-developer-portfolio.vercel.app`.

### Option 3: Deploy to Netlify
1. Navigate to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `developer-portfolio` directory directly into the browser window.
3. Netlify will deploy it instantly using the provided `netlify.toml` file!

---

## 🕵️ Step 3: Conducting the Incognito Mode Test

Evaluators, hiring managers, and course platforms test submissions in **Incognito / Private Browsing mode** to verify that projects are accessible to any external user without requiring team permissions or login credentials.

### 3.1 Launch a Private/Incognito Session
- **Google Chrome / Microsoft Edge / Brave:** Press `Ctrl + Shift + N` (Windows) or `Cmd + Shift + N` (Mac).
- **Mozilla Firefox:** Press `Ctrl + Shift + P` (Windows) or `Cmd + Shift + P` (Mac).
- **Safari:** Choose `File` > `New Private Window`.

---

### 3.2 Test 1: Deployed Portfolio Live URL Verification
Paste your live deployed URL into the Incognito window:
`https://<YOUR_GITHUB_USERNAME>.github.io/adithya-developer-portfolio/`

#### Verification Checklist:
- [ ] **No Login Wall:** Does the page load immediately without asking to sign in to GitHub, Google, or any platform?
- [ ] **Homepage & HUD:** Does the overview page display the glowing Radium header, the pulsing green `SYSTEM ONLINE` orb, and the developer avatar?
- [ ] **Interactive Canvas:** Are the green/cyan floating particles moving smoothly in the background and reacting to your mouse movements?
- [ ] **Cross-Page Navigation:**
  - Click **About Me** -> verify it opens `about.html` without 404 errors.
  - Click **Skills Arsenal** -> verify it opens `skills.html`.
  - Click **Projects & Work** -> verify it opens `projects.html`.
  - Click **Milestones & Journey** -> verify it opens `milestones.html`.
  - Click **Contact** -> verify it opens `contact.html`.
- [ ] **3D Flashcards:** On `skills.html`, click any card or the `[INSPECT DEEP CODE]` button -> does the card smoothly flip 180 degrees in 3D?
- [ ] **Audio Synthesizer:** Click the speaker icon in the top right -> does it toggle sound effects without console errors?
- [ ] **Diagnostic Terminal:** Click `SYS_DIAGNOSTIC` on the home page -> type `skills` and press Enter -> does the CLI print your stack? Type `matrix` -> does the digital green rain appear?
- [ ] **Contact Form:** Go to `contact.html` -> submit a test message -> does the glowing toast appear with confirmation?

---

### 3.3 Test 2: GitHub Repository Public Access Verification
In the same Incognito window, paste your GitHub repository link:
`https://github.com/<YOUR_GITHUB_USERNAME>/adithya-developer-portfolio`

#### Verification Checklist:
- [ ] **Public Badge:** Does the page load directly without asking you to sign in to GitHub?
- [ ] **Code Visible:** Can you see the file tree (`index.html`, `skills.html`, `assets/`, `README.md`)?
- [ ] **Public Indicator:** Next to the repository name at the top, does it say **Public** (not Private)?

---

## ⚠️ Troubleshooting & Fixes

### Problem 1: GitHub shows "404 Not Found" when visiting the repository in Incognito
- **Cause:** Your repository is set to **Private**.
- **Fix:**
  1. Open GitHub in your regular (logged-in) browser window.
  2. Navigate to your repository.
  3. Click **Settings** > scroll to the very bottom to the **Danger Zone**.
  4. Under **Change repository visibility**, click **Change visibility** > select **Make public**.
  5. Confirm by typing the repository name.
  6. Re-test the link in Incognito mode.

### Problem 2: GitHub Pages shows "404 There isn't a GitHub Pages site here."
- **Cause:** GitHub Pages hasn't completed building yet, or the branch is misconfigured.
- **Fix:**
  1. Go to **Settings** > **Pages**.
  2. Confirm **Source** is set to `Deploy from a branch`, **Branch** is `main`, and folder is `/ (root)`.
  3. Wait 60 seconds and refresh the page.
  4. Check the **Actions** tab to confirm the workflow ran successfully.

### Problem 3: Broken CSS or Images on GitHub Pages
- **Cause:** Using absolute root paths (`/assets/...`) instead of relative paths (`assets/...`).
- **Fix:**
  - All files in this project have been carefully linked with clean relative paths (`assets/css/styles.css`, `assets/js/cyber-core.js`), ensuring 100% path compatibility with custom subpath hosting on `username.github.io/repository-name/`.

---

## 🏆 Submission Deliverables Summary

When submitting your completed assignment or sharing your project, provide:
1. **Live Deployed Portfolio URL:**
   `https://<YOUR_GITHUB_USERNAME>.github.io/adithya-developer-portfolio/`
2. **Public GitHub Repository URL:**
   `https://github.com/<YOUR_GITHUB_USERNAME>/adithya-developer-portfolio`
3. **Tech Stack & Feature Documentation:**
   Reference `TECH_STACK.md` and `README.md`.
