<div align="center">
  
  <h1>MI4MedFM 2026</h1>
  <p><strong>Mechanistic Interpretability for Medical Foundation Models</strong><br>MICCAI 2026 Workshop Official Website</p>
  
  <p>
    <a href="#overview">Overview</a> •
    <a href="#key-features">Key Features</a> •
    <a href="#local-development">Local Setup</a> •
    <a href="#project-structure">Directory Structure</a>
  </p>
</div>

---

## 📌 Overview

This is the source code for the official website of the **MI4MedFM Workshop**, held in conjunction with **MICCAI 2026**. 

The workshop bridges the gap between deep learning robustness and ethical clinical translation by focusing on **Mechanistic Interpretability (MI)** applied specifically to Medical Foundation Models. The website serves as the primary hub for the call for papers, important dates, keynote speaker announcements, and workshop schedules.

## ✨ Key Features

The website is engineered to be lightweight, incredibly fast, and visually striking, requiring **no build system**. 

- **Static Architecture:** Pure HTML5, CSS3, and Vanilla JavaScript. No npm, Webpack, or Python dependencies required.
- **Premium Aesthetics:** Utilizes a modern "glassmorphism" design system, high-quality typography, smooth animations, and a cohesive pastel color palette.
- **Fully Responsive:** Grid and Flexbox layouts ensure perfect rendering across 4K monitors, laptops, tablets, and mobile devices.
- **Zero-Dependency Deployment:** Can be hosted for free on GitHub Pages, Netlify, or instantly served via a basic Python HTTP server.

## 🚀 Local Development

Since the project uses absolute basic web standards, running it locally is extremely fast.

### Prerequisites
You only need Python installed to run a local development server. 

### Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MI4MedFM/2026.git
   cd 2026
   ```

2. **Start a local HTTP server:**
   Using Python 3:
   ```bash
   python3 -m http.server 8898
   ```

3. **View the site:**
   Open your browser and navigate to `http://localhost:8898`.

## 📁 Project Structure

```text
├── index.html           # The main entry point and HTML structure of the site
├── styles.css           # Core styling, animations, and glassmorphism UI variables
├── script.js            # Interactivity, smooth scrolling, and dynamic elements
├── assets/
│   ├── images/          # Static assets including logos, speaker photos, and hero infographics
│   └── icons/           # SVGs and UI iconography
└── README.md            # Project documentation
```

## 🌐 Deployment

The site is designed for frictionless deployment on **GitHub Pages**.

1. Push your changes to the `main` branch.
2. In the GitHub repository settings, navigate to the **Pages** section.
3. Select `Deploy from a branch` and choose `main` as the source.
4. The site will automatically go live via GitHub Actions.
---
<div align="center">
  <i>Designed for MICCAI 2026 • Mechanistic Interpretability for Medical Foundation Models</i>
</div>
