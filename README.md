# Ayush Raj Chandel - Personal Developer Portfolio & AI Chatbot

> A high-performance, single-page developer portfolio redesigned in a distinctive **Contemporary Brutalist + Restrained Glassmorphism** visual style. Built with vanilla HTML5, CSS3, and JavaScript, featuring real-time project filtering, dual dark/light theme modes, and an integrated Google Gemini RAG AI Chatbot.

---

## 👤 Developer Profile

- **Full Name**: Ayush Raj Chandel
- **Roll Number**: 25BCON0781
- **Program**: B.Tech in Computer Science & Engineering (2025–2029)
- **Status**: Undergraduate
- **Field**: Computer Science Engineering
- **Institution**: JECRC University, Jaipur, Rajasthan (CSE Department)
- **Email**: [ayush.25bcon0781@jecrcu.edu.in](mailto:ayush.25bcon0781@jecrcu.edu.in)
- **LinkedIn**: [https://www.linkedin.com/in/ayush-raj-chandel-694575317/](https://www.linkedin.com/in/ayush-raj-chandel-694575317/)
- **GitHub**: [https://github.com/AyushCodes999](https://github.com/AyushCodes999)

---

## 🎨 Visual Identity: Contemporary Brutalism + Subtle Glassmorphism

- **Color Palette**:
  - Warm Pale Off-White (`#F4F0EA`) base canvas.
  - Deep High-Contrast Charcoal / Black (`#0A0A0A`) text and borders.
  - Electric Cobalt Blue (`#2563EB`) primary accent.
  - Acid Yellow (`#E2F144`) secondary accent for tags and active highlights.
- **Graphic Elements**:
  - Crisp `2.5px` and `3px` solid borders with hard offset box shadows (`3px`, `5px`, `8px`).
  - Tactile physical button and card hover translations (`translate(-2px, -2px)` with shadow expansion).
  - Restrained frosted glassmorphic elements (`backdrop-filter: blur(14px)`) applied to the floating navbar, search toolbar, API configuration modal, and floating chatbot launcher.
- **Typography System**:
  - Headings: `Space Grotesk` (bold grotesque display sans-serif).
  - Body: `Plus Jakarta Sans` (clean, highly legible modern sans-serif).
  - Monospace: `JetBrains Mono` for roll numbers, tech tags, and code tokens.

---

## 📂 Preserved Coursework & Practical Projects

All 5 core semester projects and their technical descriptions are preserved:

1. **Python Programs Collection**:
   - *Tech*: Python 3, Recursion, Data Structures, README Audit
   - *Description*: Core collection of clean Python scripts translated from C: Factorial with recursion & iteration bounds checking, Fibonacci sequence generator, and C-style Structure-to-Dictionary data converter, accompanied by a verified README audit.
   - *Status*: Repository destination pending user input.

2. **Messy Python Code Improvement**:
   - *Tech*: Python, AI Refactoring, PEP 8, Cursor AI
   - *Description*: Refactored an unmaintainable student grade calculation script using Cursor AI. Stripped unused dependencies, eliminated redundant loops via reusable mean functions, applied named constants, and preserved exact character-for-character output.
   - *Status*: Repository destination pending user input.

3. **Bug Fixing Using Cursor AI**:
   - *Tech*: Python, unittest, RED-FIX-GREEN, Cursor AI
   - *Description*: Practiced test-driven bug remediation (RED → FIX → GREEN). Identified and resolved 3 critical bugs: hardcoded length average calculation, inclusive passing mark boundary condition (≥40), and inverted letter grade condition ordering.
   - *Status*: Repository destination pending user input.

4. **Interactive Quiz Application**:
   - *Tech*: HTML5, CSS3, Vanilla JS, Test Matrix
   - *Description*: Client-side quiz web application created in Lecture 10. Features 5 verified web engineering questions, a progress indicator, theme toggle, and strict validation against the 6-row quiz test matrix (M1–M6) preventing duplicate score increments.
   - *Status*: Repository and Live Demo destinations pending user input.

5. **Book Reading List Application**:
   - *Tech*: HTML5, CSS3, Vanilla JS, LocalStorage
   - *Description*: Student reading tracker built in Lecture 11 via vibe-coding methodology. Implements book status transitions (Want to Read / Reading / Finished), live category filters, duplicate title guard, 60-character restriction, per-card deletion, and summary count metrics.
   - *Status*: Repository and Live Demo destinations pending user input.

---

## ⚡ Core Technical Features

1. **Interactive Real-Time Project Search & Categorization**:
   - Dynamic client-side search across titles, descriptions, and keywords.
   - Instant filtering (`All`, `Python`, `Web Apps / JS`, `AI & Debugging`) with live counter.
2. **Light / Dark Brutalist Theming**:
   - Instant toggle between light off-white and dark carbon brutalist modes.
   - Preference persisted via `localStorage`.
3. **Grounded AI Chatbot**:
   - Interactive terminal-style assistant answering questions about Ayush's background, skills, and projects.
   - Supports Google Gemini API integration with local key storage (never exposed in public code) alongside an embedded grounded fallback engine.

---

## 💻 How to Run Locally

### Option 1: Direct Browser Launch
Open `index.html` directly in any modern browser (Chrome, Edge, Firefox, Safari).

### Option 2: Using Python HTTP Server
```bash
python -m http.server 3000
```
Then navigate to `http://localhost:3000` in your web browser.
