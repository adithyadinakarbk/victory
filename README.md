# Obsidian Radium // Cybernetic Developer Portfolio

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-39FF14.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=black)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript ESNext](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Web Audio API](https://img.shields.io/badge/Web_Audio_API-39FF14?style=for-the-badge&logo=audio&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Status](https://img.shields.io/badge/SYSTEM-ONLINE_v4.0-39FF14?style=for-the-badge)](https://github.com)

**A high-performance tactical cyber-terminal portfolio architected for student developers, creative technologists, and software engineers.**

[🌐 Live Demo](https://adithyadinakarbk.github.io/victory/) • [📑 Documentation](TECH_STACK.md) • [🚀 Deployment Guide](DEPLOYMENT_AND_TESTING_GUIDE.md)

</div>

---

## ⚡ Executive Summary

The **Obsidian Radium Developer Portfolio** is a tactical cyber-brutalist web application designed to showcase software engineering capability, interactive graphics, algorithmic systems, and creative technology. Engineered with deep obsidian foundations (`#13131B`), radioactive green luminescence (`#39FF14`), and desaturated cyber emerald tones (`#00FF88`), the portfolio delivers instantaneous visual impact and surgical precision.

### 🌐 Live Architecture & Page Manifest

| Route | Page | Core Purpose | Key Interactions |
| :--- | :--- | :--- | :--- |
| [`index.html`](index.html) | **Overview / Home** | Strategic landing nexus & biometric ID dossier | Hero particle canvas, live telemetry HUD, interactive terminal |
| [`about.html`](about.html) | **About Me** | Engineering philosophy, background & workstation rig | Holographic portrait, 4 core engineering pillars, hardware specs |
| [`skills.html`](skills.html) | **Skills Arsenal** | Technical mastery matrix & skill proficiency bars | **3D Flip Flashcards**, category filter array, real-time metrics |
| [`projects.html`](projects.html) | **Projects & Work** | Selected production deliverables & repositories | Bento showcase grid, category tabs, **Interactive Spec Modal** |
| [`milestones.html`](milestones.html) | **Milestones & Journey** | Chronological timeline of milestones & roadmap | Cyber chrono-stepper, hackathon badges, trajectory radar |
| [`contact.html`](contact.html) | **Contact & Uplink** | Direct communication gateway & transmission packet | Form validation, local dispatch simulation, one-click copy buttons |

---

## 🚀 Key Features

### 1. 🎛️ Tactical Web Audio Synthesizer
- Built using the native **Web Audio API** with zero external audio assets.
- Generates procedural sine, triangle, and sawtooth tones for button hover blips (880Hz), tactile clicks (1200Hz), terminal keystrokes, and transmission acknowledgments.
- Fully toggleable via the **audio speaker button** in the top navigation bar with persistent memory saved in `localStorage`.

### 2. 🌌 Interactive Canvas Particle Network
- Dedicated `<canvas id="cyber-particle-canvas">` running 60fps hardware-accelerated 2D particle physics.
- Ambient radioactive nodes gently float through space and dynamically link with proximity lines.
- **Cursor Proximity Repulsion:** Particles actively react and repel away when the user's cursor approaches.

### 3. 🃏 3D Perspective Flashcards
- Built on pure CSS 3D transforms (`perspective: 1000px`, `transform-style: preserve-3d`, `backface-visibility: hidden`).
- Users can click any card or the **[INSPECT DEEP CODE]** button to flip the card 180 degrees and inspect low-level architectural specifications.

### 4. 💻 Collapsible Diagnostic Terminal (`SYS_DIAGNOSTIC`)
- An interactive retro-futuristic developer CLI integrated directly into the HUD.
- Features command history navigation (Up/Down arrow keys) and responds to live interactive commands:
  - `help` — displays the complete list of available commands
  - `skills` — outputs categorized technical competencies
  - `projects` — lists active repository nodes and deployment states
  - `about` — prints biometric identity and mission parameters
  - `ping` — executes simulated latency probes to the AP-SOUTH cluster
  - `matrix` — triggers an authentic 5-second green phosphor digital rain cascade across the viewport
  - `clear` — flushes the terminal buffer

### 5. 🔍 Real-Time Category Filtering
- Instant filter controls on **Skills Arsenal** and **Projects & Work**.
- Smooth opacity and `translateY` CSS transitions to organize items by category without layout thrashing.

### 6. 📱 Responsive Tactical Navigation Drawer
- Full multi-breakpoint support from 4K ultra-wide monitors down to handheld mobile screens.
- Mobile screens feature an animated slide-over HUD navigation drawer with quick access to all pages and telemetry data.

### 7. 🛰️ Direct Transmission Gateway
- Interactive packet composer form with client-side field validation and simulated encryption dispatch.
- Successful submissions display a glowing cyber toast alert, emit confirmation audio, and persist locally to `localStorage`.

---

## 🛠️ Tech Stack & Architecture

- **Core Technologies:** HTML5, CSS3 Modern Flexbox & Grid, Vanilla JavaScript (ESNext).
- **Styling Engine:** Tailwind CSS with custom **Obsidian Radium** theme tokens.
- **Typography:**
  - **Syne** (`400`, `600`, `700`, `800`): Avant-garde geometric display typeface for headlines.
  - **Space Mono** (`400`, `700`): Mechanical monospace typeface for tabular telemetry, code chips, and running body copy.
- **Graphics & Sound:** HTML5 Canvas Context 2D, Web Audio API, Material Symbols Outlined.
- **Runtime & Tooling:** Node.js HTTP server (`server.js`), zero external runtime dependencies.

---

## 💻 Local Quickstart

### Prerequisites
- Node.js (v18.0.0 or higher recommended)

### 1. Launch Local Preview Server
```bash
# Start the local cyber server
node server.js
```
Open your browser and navigate to:
```
http://localhost:3000
```

### 2. Run Automated Verification Test Suite
```bash
npm test
# or
node test.js
```
*Executes 79 automated assertion tests verifying file manifests, cross-page navigation links, styles, and interactive scripts.*

---

## 🌐 Public Deployment Guide

This portfolio is completely static and zero-dependency, making it deployable on any modern hosting provider in seconds.

### Option A: GitHub Pages (Recommended)

1. **Initialize Git & Commit:**
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of Obsidian Radium developer portfolio"
   ```

2. **Create a Public GitHub Repository:**
   - Go to [GitHub New Repository](https://github.com/new).
   - Enter a name: `adithya-developer-portfolio`.
   - **Crucial:** Set repository visibility to **Public**.
   - Do NOT initialize with a README (one already exists).

3. **Link and Push:**
   ```bash
   git remote add origin https://github.com/adithyadinakarbk/victory.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages:**
   - Go to your repository on GitHub: `https://github.com/adithyadinakarbk/victory`
   - Click **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and folder `/ (root)`.
   - Click **Save**.
   - Your site will be published at: `https://adithyadinakarbk.github.io/victory/`

*(Note: An automated GitHub Actions workflow is also provided at `.github/workflows/deploy.yml` which will automatically deploy on every push!)*

---

### Option B: Vercel (Instant Deployment)

1. Push your code to GitHub.
2. Sign in to [Vercel](https://vercel.com).
3. Click **Add New...** > **Project** and select your GitHub repository.
4. Keep the default settings and click **Deploy**.
5. Your portfolio is live with SSL, global CDN, and clean URLs via `vercel.json`!

---

### Option C: Netlify

1. Sign in to [Netlify](https://www.netlify.com).
2. Drag and drop the portfolio folder directly into the Netlify dropzone, or import your GitHub repository.
3. The included `netlify.toml` automatically configures security headers and routes!

---

## 🕵️ Incognito Mode Testing Checklist

To ensure your deployed portfolio and repository are 100% accessible to evaluators, recruiters, and the public without login barriers:

1. **Open a Clean Incognito / Private Window:**
   - In Google Chrome or Microsoft Edge: Press `Ctrl + Shift + N` (or `Cmd + Shift + N` on macOS).
   - In Mozilla Firefox: Press `Ctrl + Shift + P`.

2. **Test the Deployed Portfolio Link:**
   - Paste your deployed URL (e.g., `https://<your-username>.github.io/adithya-developer-portfolio/`).
   - ✅ Verify the page loads without any Google/GitHub sign-in prompt.
   - ✅ Verify navigation links between Overview, About, Skills, Projects, Milestones, and Contact work smoothly.
   - ✅ Verify the interactive canvas particles and sound effects work.
   - ✅ Verify the 3D flashcards flip upon clicking on the Skills page.

3. **Test the GitHub Repository Link:**
   - Paste your GitHub repository URL (e.g., `https://github.com/<your-username>/adithya-developer-portfolio`).
   - ✅ Verify you can view the code and files without being asked to log in.
   - ⚠️ If you see a **404 Not Found**, your repository is set to **Private**! Go to `Settings` > `Change repository visibility` > select **Make public**.

---

## 📄 License & Attribution

Designed and engineered for **Adithya // The Creator**.  
Released under the [MIT License](LICENSE).  
Obsidian Radium Design Tokens © 2026.
