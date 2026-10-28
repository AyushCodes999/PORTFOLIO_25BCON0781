/**
 * Portfolio Interactive Scripts: Ayush Raj Chandel (25BCON0781)
 * Contemporary Brutalist Portfolio & AI Assistant
 * Features:
 * 1. Dark/Light Brutalist Mode Toggle with LocalStorage persistence
 * 2. Real-time Project Search & Category Filter (Task 3)
 * 3. Mobile Navigation Menu
 * 4. Grounded AI Chatbot with Google Gemini API & Local RAG Fallback (Task 6)
 * 5. Interactive Contact Form with Validation
 * 6. Rough Notation Hand-Drawn Sketch Annotations
 */

// =============================================================================
// 1. THEME SWITCHER (Dark / Light Brutalist Mode)
// =============================================================================
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');

function initializeTheme() {
    const savedTheme = localStorage.getItem('portfolio_theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio_theme', newTheme);
        updateThemeIcon(newTheme);
        refreshAnnotationColors();
    });
}

// =============================================================================
// 2. MOBILE NAVIGATION
// =============================================================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });
}

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

        if (correspondingLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                correspondingLink.classList.add('active');
            } else {
                correspondingLink.classList.remove('active');
            }
        }
    });
});

// =============================================================================
// 3. PROJECT SEARCH & FILTER (Task 3)
// =============================================================================
const projectSearchInput = document.getElementById('projectSearchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const filterPills = document.getElementById('filterPills');
const projectsGrid = document.getElementById('projectsGrid');
const projectCards = document.querySelectorAll('.project-card');
const projectCountDisplay = document.getElementById('projectCountDisplay');
const noProjectsMessage = document.getElementById('noProjectsMessage');
const resetSearchBtn = document.getElementById('resetSearchBtn');

let activeFilter = 'all';

function filterProjects() {
    const searchTerm = (projectSearchInput ? projectSearchInput.value : '').trim().toLowerCase();

    // Toggle clear button
    if (clearSearchBtn) {
        clearSearchBtn.classList.toggle('hidden', searchTerm.length === 0);
    }

    let visibleCount = 0;

    projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').toLowerCase().split(' ');
        const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
        const title = (card.querySelector('.project-title')?.textContent || '').toLowerCase();
        const desc = (card.querySelector('.project-desc')?.textContent || '').toLowerCase();

        // Check category match
        const matchesCategory = activeFilter === 'all' || categories.includes(activeFilter);

        // Check search match
        const combinedText = `${title} ${desc} ${keywords}`;
        const matchesSearch = !searchTerm || combinedText.includes(searchTerm);

        if (matchesCategory && matchesSearch) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    // Update count display
    if (projectCountDisplay) {
        if (searchTerm || activeFilter !== 'all') {
            projectCountDisplay.textContent = `Showing ${visibleCount} of ${projectCards.length} projects`;
        } else {
            projectCountDisplay.textContent = `Showing all ${projectCards.length} projects`;
        }
    }

    // Toggle no results state
    if (noProjectsMessage) {
        noProjectsMessage.classList.toggle('hidden', visibleCount > 0);
    }
}

if (projectSearchInput) {
    projectSearchInput.addEventListener('input', filterProjects);
}

if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
        projectSearchInput.value = '';
        filterProjects();
        projectSearchInput.focus();
    });
}

if (filterPills) {
    filterPills.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-pill');
        if (!btn) return;

        filterPills.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        activeFilter = btn.getAttribute('data-filter') || 'all';
        filterProjects();
    });
}

if (resetSearchBtn) {
    resetSearchBtn.addEventListener('click', () => {
        if (projectSearchInput) projectSearchInput.value = '';
        activeFilter = 'all';
        if (filterPills) {
            filterPills.querySelectorAll('.filter-pill').forEach(b => {
                b.classList.toggle('active', b.getAttribute('data-filter') === 'all');
            });
        }
        filterProjects();
    });
}

// =============================================================================
// 4. PORTFOLIO KNOWLEDGE BASE & GROUNDED AI CHATBOT (Task 6)
// =============================================================================

// Comprehensive RAG Grounding Information for Ayush Raj Chandel
const PORTFOLIO_KNOWLEDGE = {
    student: {
        name: "Ayush Raj Chandel",
        rollNumber: "25BCON0781",
        program: "B.Tech in Computer Science & Engineering",
        academicYears: "2025–2029",
        institution: "JECRC University, Jaipur, Rajasthan",
        department: "CSE Department",
        educationLevel: "Undergraduate",
        field: "Computer Science Engineering",
        location: "CSE Department, JECRC University, Jaipur, Rajasthan",
        email: "ayush.25bcon0781@jecrcu.edu.in",
        githubUrl: "https://github.com/AyushCodes999",
        linkedinUrl: "https://www.linkedin.com/in/ayush-raj-chandel-694575317/",
        focus: "Full-Stack Web Engineering, AI & Prompt Engineering, Algorithmic Optimization, TDD, Clean Code"
    },
    skills: [
        "Programming Languages: Python 3, JavaScript (ES6+), C Programming, HTML5, CSS3",
        "Frontend & Architecture: Responsive Design, DOM Manipulation, CSS Variables & Theming, LocalStorage",
        "AI & Tooling: Google Gemini API REST Integration, 3-Step Chain Prompting, Reverse Prompting, Cursor AI",
        "Developer Workflows: Git, GitHub, Python unittest, TDD (RED-FIX-GREEN), Chrome DevTools, Vercel"
    ],
    projects: [
        {
            number: 1,
            title: "Python Programs Collection",
            summary: "Core collection of clean Python scripts translated from C: Factorial with recursion & iteration bounds checking, Fibonacci sequence generator, and C-style Structure-to-Dictionary data converter, accompanied by a verified README audit.",
            features: "Robust input validation, zero unverified claims in README audit.",
            tech: "Python 3, Recursion, Data Structures, README Audit",
            repoUrl: "https://github.com/AyushCodes999/python-basics-25BCON0781-factorial",
            extraRepos: [
                { name: "Factorial", url: "https://github.com/AyushCodes999/python-basics-25BCON0781-factorial" },
                { name: "Fibonacci", url: "https://github.com/AyushCodes999/python-basics-25BCON0781-fibonacci" },
                { name: "Struct to Dict", url: "https://github.com/AyushCodes999/python-basics-25BCON0781-struct-to-dict" }
            ]
        },
        {
            number: 2,
            title: "Messy Python Code Improvement",
            summary: "Refactored an unmaintainable student grade calculation script using Cursor AI. Stripped unused dependencies, eliminated redundant loops via reusable mean functions, applied named constants, and preserved exact character-for-character output.",
            features: "Strict output fidelity check, added above-average student counter.",
            tech: "Python, AI Refactoring, PEP 8, Cursor AI",
            repoUrl: "https://github.com/AyushCodes999/Messy_code_25bcon0781"
        },
        {
            number: 3,
            title: "Bug Fixing Using Cursor AI",
            summary: "Practiced test-driven bug remediation (RED -> FIX -> GREEN). Identified and resolved 3 critical bugs: hardcoded length average calculation, inclusive passing mark boundary condition (>=40), and inverted letter grade condition ordering.",
            features: "9/9 automated unit tests passing, Systematic Bug Observation Table.",
            tech: "Python, unittest, RED-FIX-GREEN, Cursor AI",
            repoUrl: "https://github.com/AyushCodes999/Bug-fixing_25bcon0781"
        },
        {
            number: 4,
            title: "Interactive Quiz Application",
            summary: "Client-side quiz web application created in Lecture 10. Features 5 verified web engineering questions, a progress indicator, theme toggle, and strictly validated against the 6-row quiz test matrix (M1–M6) preventing duplicate score increments.",
            features: "Verified 6-row test matrix compliance, Pure Vanilla JS DOM state management.",
            tech: "HTML5, CSS3, Vanilla JS, Test Matrix",
            repoUrl: "https://github.com/AyushCodes999/Quiz_app_PE_25BC0N0781",
            liveUrl: "Pending deployment URL"
        },
        {
            number: 5,
            title: "Book Reading List Application",
            summary: "Student reading tracker built in Lecture 11 via vibe-coding methodology. Implements book status transitions (Want to Read / Reading / Finished), live category filters, duplicate title guard, 60-character restriction, per-card deletion, and summary count metrics.",
            features: "Defect prevention: Case/space duplicates & 60 char limit, real-time status counters & local persistence.",
            tech: "HTML5, CSS3, Vanilla JS, LocalStorage",
            repoUrl: "https://github.com/AyushCodes999/Reading-list-app_PE_25BCON0781",
            liveUrl: "Pending deployment URL"
        }
    ]
};

// Chat Elements
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const clearChatBtn = document.getElementById('clearChatBtn');
const configKeyBtn = document.getElementById('configKeyBtn');
const apiKeyModal = document.getElementById('apiKeyModal');
const closeApiModalBtn = document.getElementById('closeApiModalBtn');
const customApiKeyInput = document.getElementById('customApiKeyInput');
const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
const apiKeyStatusMessage = document.getElementById('apiKeyStatusMessage');
const suggestedPills = document.querySelectorAll('.chat-pill');

// API Key Management (stored in browser only, never committed to git)
const GEMINI_STORAGE_KEY = 'user_custom_gemini_api_key';

function getStoredApiKey() {
    return sessionStorage.getItem(GEMINI_STORAGE_KEY) || localStorage.getItem(GEMINI_STORAGE_KEY) || '';
}

function updateApiKeyStatus() {
    const key = getStoredApiKey();
    if (customApiKeyInput) customApiKeyInput.value = key;
    if (apiKeyStatusMessage) {
        if (key) {
            apiKeyStatusMessage.innerHTML = '<strong>Custom Gemini API Key active!</strong> Real-time Google API calls enabled.';
            apiKeyStatusMessage.style.color = 'var(--accent-emerald)';
        } else {
            apiKeyStatusMessage.innerHTML = '<em>Using built-in grounded knowledge engine (Real-time fallback enabled).</em>';
            apiKeyStatusMessage.style.color = 'var(--text-muted)';
        }
    }
}

// Modal Toggle
if (configKeyBtn && apiKeyModal) {
    configKeyBtn.addEventListener('click', () => {
        updateApiKeyStatus();
        apiKeyModal.classList.remove('hidden');
    });
}

if (closeApiModalBtn && apiKeyModal) {
    closeApiModalBtn.addEventListener('click', () => {
        apiKeyModal.classList.add('hidden');
    });
}

if (saveApiKeyBtn && customApiKeyInput) {
    saveApiKeyBtn.addEventListener('click', () => {
        const key = customApiKeyInput.value.trim();
        if (key) {
            sessionStorage.setItem(GEMINI_STORAGE_KEY, key);
        } else {
            sessionStorage.removeItem(GEMINI_STORAGE_KEY);
            localStorage.removeItem(GEMINI_STORAGE_KEY);
        }
        updateApiKeyStatus();
        apiKeyModal.classList.add('hidden');
        appendBotMessage("Your Gemini API Key configuration has been updated. I'm ready to answer any questions about Ayush's portfolio!");
    });
}

// Append Chat Messages
function appendUserMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg user-msg';
    msgDiv.innerHTML = `
        <div class="msg-avatar">👤</div>
        <div class="msg-bubble">
            <p>${escapeHtml(text)}</p>
        </div>
    `;
    chatMessages.appendChild(msgDiv);
    scrollChatToBottom();
}

function appendBotMessage(htmlContent) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg bot-msg';
    msgDiv.innerHTML = `
        <div class="msg-avatar">🤖</div>
        <div class="msg-bubble">${htmlContent}</div>
    `;
    chatMessages.appendChild(msgDiv);
    scrollChatToBottom();
}

function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'chat-msg bot-msg';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = `
        <div class="msg-avatar">🤖</div>
        <div class="msg-bubble typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    chatMessages.appendChild(indicator);
    scrollChatToBottom();
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function scrollChatToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function escapeHtml(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
}

// Fallback Grounded RAG Knowledge Matcher
function generateGroundedAnswer(query) {
    const q = query.toLowerCase();

    // 1. Who are you / Identity
    if (q.includes('who are you') || q.includes('about you') || q.includes('who is') || q.includes('introduce') || q.includes('ayush')) {
        return `
            <p>I am the AI assistant representing <strong>${PORTFOLIO_KNOWLEDGE.student.name}</strong> (Roll No: <strong>${PORTFOLIO_KNOWLEDGE.student.rollNumber}</strong>), an undergraduate student pursuing <strong>${PORTFOLIO_KNOWLEDGE.student.program}</strong> at <strong>${PORTFOLIO_KNOWLEDGE.student.institution}</strong>.</p>
            <p>Ayush specializes in ${PORTFOLIO_KNOWLEDGE.student.focus}.</p>
        `;
    }

    // 2. Skills
    if (q.includes('skill') || q.includes('tech stack') || q.includes('technologies') || q.includes('languages')) {
        return `
            <p><strong>Ayush's Core Technical Skills:</strong></p>
            <ul>
                ${PORTFOLIO_KNOWLEDGE.skills.map(s => `<li>${s}</li>`).join('')}
            </ul>
        `;
    }

    // 3. Projects general
    if (q.includes('what projects') || q.includes('all projects') || q.includes('completed projects') || q.includes('list projects')) {
        return `
            <p>Here are the 5 practical projects completed by Ayush this semester:</p>
            <ol>
                ${PORTFOLIO_KNOWLEDGE.projects.map(p => `<li><strong>${p.title}:</strong> ${p.summary}</li>`).join('')}
            </ol>
            <p>You can inspect and filter all of these in the <a href="#projects">My Projects</a> section above!</p>
        `;
    }

    // 4. Project 1 / Python Programs
    if (q.includes('project 1') || q.includes('python program') || q.includes('factorial') || q.includes('fibonacci') || q.includes('struct')) {
        const p1 = PORTFOLIO_KNOWLEDGE.projects[0];
        return `
            <p><strong>${p1.title}:</strong></p>
            <p>${p1.summary}</p>
            <p><strong>Highlights:</strong> ${p1.features}</p>
            <p><strong>Tech Stack:</strong> ${p1.tech}</p>
            <p><strong>Repositories:</strong></p>
            <ul>
                <li><a href="https://github.com/AyushCodes999/python-basics-25BCON0781-factorial" target="_blank" rel="noopener">Factorial Program Repo</a></li>
                <li><a href="https://github.com/AyushCodes999/python-basics-25BCON0781-fibonacci" target="_blank" rel="noopener">Fibonacci Generator Repo</a></li>
                <li><a href="https://github.com/AyushCodes999/python-basics-25BCON0781-struct-to-dict" target="_blank" rel="noopener">Struct-to-Dict Converter Repo</a></li>
            </ul>
        `;
    }

    // 5. Project 2 / Refactoring / Messy code
    if (q.includes('project 2') || q.includes('messy') || q.includes('refactor') || q.includes('clean code')) {
        const p2 = PORTFOLIO_KNOWLEDGE.projects[1];
        return `
            <p><strong>${p2.title}:</strong></p>
            <p>${p2.summary}</p>
            <p><strong>Highlights:</strong> ${p2.features}</p>
            <p><strong>Tech Stack:</strong> ${p2.tech}</p>
            <p><strong>Repository:</strong> <a href="${p2.repoUrl}" target="_blank" rel="noopener">${p2.repoUrl}</a></p>
        `;
    }

    // 6. Project 3 / Bug fixing / Testing
    if (q.includes('project 3') || q.includes('buggy') || q.includes('bug fix') || q.includes('unittest') || q.includes('testing') || q.includes('cursor')) {
        const p3 = PORTFOLIO_KNOWLEDGE.projects[2];
        return `
            <p><strong>${p3.title}:</strong></p>
            <p>${p3.summary}</p>
            <p><strong>Highlights:</strong> ${p3.features}</p>
            <p><strong>Tech Stack:</strong> ${p3.tech}</p>
            <p><strong>Repository:</strong> <a href="${p3.repoUrl}" target="_blank" rel="noopener">${p3.repoUrl}</a></p>
        `;
    }

    // 7. Project 4 / Quiz app / Web app
    if (q.includes('project 4') || q.includes('quiz') || q.includes('test matrix') || q.includes('interactive web')) {
        const p4 = PORTFOLIO_KNOWLEDGE.projects[3];
        return `
            <p><strong>${p4.title}:</strong></p>
            <p>${p4.summary}</p>
            <p><strong>Highlights:</strong> ${p4.features}</p>
            <p><strong>Tech Stack:</strong> ${p4.tech}</p>
            <p><strong>Repository:</strong> <a href="${p4.repoUrl}" target="_blank" rel="noopener">${p4.repoUrl}</a></p>
        `;
    }

    // 8. Project 5 / Reading list app
    if (q.includes('project 5') || q.includes('reading list') || q.includes('book') || q.includes('localstorage')) {
        const p5 = PORTFOLIO_KNOWLEDGE.projects[4];
        return `
            <p><strong>${p5.title}:</strong></p>
            <p>${p5.summary}</p>
            <p><strong>Highlights:</strong> ${p5.features}</p>
            <p><strong>Tech Stack:</strong> ${p5.tech}</p>
            <p><strong>Repository:</strong> <a href="${p5.repoUrl}" target="_blank" rel="noopener">${p5.repoUrl}</a></p>
        `;
    }

    // 9. Contact / Links
    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('message')) {
        return `
            <p>You can get in touch with Ayush directly:</p>
            <ul>
                <li><strong>Email:</strong> <a href="mailto:${PORTFOLIO_KNOWLEDGE.student.email}">${PORTFOLIO_KNOWLEDGE.student.email}</a></li>
                <li><strong>LinkedIn:</strong> <a href="${PORTFOLIO_KNOWLEDGE.student.linkedinUrl}" target="_blank" rel="noopener">Ayush Raj Chandel on LinkedIn</a></li>
                <li><strong>GitHub:</strong> <a href="${PORTFOLIO_KNOWLEDGE.student.githubUrl}" target="_blank" rel="noopener">${PORTFOLIO_KNOWLEDGE.student.githubUrl}</a></li>
                <li><strong>Location:</strong> ${PORTFOLIO_KNOWLEDGE.student.location}</li>
            </ul>
        `;
    }

    // 10. GitHub
    if (q.includes('github')) {
        return `
            <p>Ayush's verified GitHub profile is: <a href="${PORTFOLIO_KNOWLEDGE.student.githubUrl}" target="_blank" rel="noopener"><strong>${PORTFOLIO_KNOWLEDGE.student.githubUrl}</strong></a>.</p>
            <p>All 5 practical project repositories are active and linked in the projects grid!</p>
        `;
    }

    // 11. University / Education
    if (q.includes('college') || q.includes('university') || q.includes('education') || q.includes('degree') || q.includes('jecrc')) {
        return `
            <p>Ayush is an undergraduate student at <strong>${PORTFOLIO_KNOWLEDGE.student.institution}</strong> enrolled in <strong>${PORTFOLIO_KNOWLEDGE.student.program}</strong> (${PORTFOLIO_KNOWLEDGE.student.academicYears}).</p>
            <p>Student Roll Number: <strong>${PORTFOLIO_KNOWLEDGE.student.rollNumber}</strong>.</p>
        `;
    }

    // Default Fallback
    return `
        <p>I am grounded in Ayush Raj Chandel's portfolio. You can ask about:</p>
        <ul>
            <li>Ayush's background, education, and roll number</li>
            <li>Technical skills (Python, JavaScript, Gemini API, C)</li>
            <li>The 5 completed coursework projects (Python Programs, Messy Code Refactor, Cursor AI Bug Fixing, Quiz App, Reading List App)</li>
            <li>How to contact Ayush directly via email or LinkedIn</li>
        </ul>
    `;
}

// Gemini API Integration with Fallback
async function queryGeminiApi(userQuery) {
    const customKey = getStoredApiKey();

    // Construct grounded system prompt
    const systemContext = `
You are the personal AI Portfolio Assistant for Ayush Raj Chandel (Roll Number: 25BCON0781), an undergraduate Computer Science Engineering student (2025–2029) at JECRC University, Jaipur, Rajasthan.
Answer visitors' questions accurately, concisely, and professionally using ONLY the following grounded portfolio facts:

STUDENT PROFILE:
- Name: Ayush Raj Chandel (25BCON0781)
- University: JECRC University, Jaipur, Rajasthan (CSE Department)
- Degree: B.Tech in Computer Science & Engineering (2025–2029), Undergraduate
- Email: ayush.25bcon0781@jecrcu.edu.in
- GitHub Profile: https://github.com/AyushCodes999
- LinkedIn Profile: https://www.linkedin.com/in/ayush-raj-chandel-694575317/
- Skills: Python 3, JavaScript (ES6+), C, HTML5, CSS3, Gemini API REST Integration, 3-Step Chain Prompting, Reverse Prompting, Cursor AI, Git/GitHub, Vercel, Python unittest.

COMPLETED 5 PROJECTS:
1. Python Programs Collection: Factorial (recursive and iterative with validation), Fibonacci sequence generator, C Struct-to-Dict converter using dataclasses.asdict(), and a verified README audit with zero unsupported claims. Repositories: Factorial (https://github.com/AyushCodes999/python-basics-25BCON0781-factorial), Fibonacci (https://github.com/AyushCodes999/python-basics-25BCON0781-fibonacci), Struct-to-Dict (https://github.com/AyushCodes999/python-basics-25BCON0781-struct-to-dict).
2. Messy Python Code Improvement: Refactored student score script in Cursor AI, removed unused imports, created reusable calculate_average(), extracted constants (100), used f-strings, preserved character-for-character output, added above-average student counter. Repository: https://github.com/AyushCodes999/Messy_code_25bcon0781
3. Bug Fixing Using Cursor AI: Applied RED -> FIX -> GREEN methodology with unittest. Fixed 3 bugs: hardcoded length in average calculation, inclusive passing boundary (>= 40), and inverted grade evaluation ordering. Passed all 9/9 unit tests. Repository: https://github.com/AyushCodes999/Bug-fixing_25bcon0781
4. Interactive Quiz Application: Lecture 10 vanilla JS quiz application. Implemented 5 questions, progress bar, theme switch, strictly validated against the 6-row quiz test matrix (M1 to M6: prevents duplicate score increment, hides final score until after Q5, resets to 0 on reload). Repository: https://github.com/AyushCodes999/Quiz_app_PE_25BC0N0781
5. Book Reading List Application: Lecture 11 vibe-coding app. Handles reading statuses (Want to Read, Reading, Finished), status filtering, empty state message, prevents duplicates, enforces 60 character title limit, delete buttons, and summary metrics. Repository: https://github.com/AyushCodes999/Reading-list-app_PE_25BCON0781

GUIDELINES:
- Keep answers concise, helpful, and formatted with clean paragraphs or bullet points.
- If asked about GitHub or contact, refer to Ayush's GitHub profile (https://github.com/AyushCodes999), LinkedIn, or email.
- Never invent projects or experience not listed here.
    `.trim();

    // Strategy 1: Direct Gemini API Call if key provided
    if (customKey) {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(customKey)}`;
        const payload = {
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: `${systemContext}\n\nVisitor Question: ${userQuery}` }
                    ]
                }
            ],
            generationConfig: {
                temperature: 0.4,
                maxOutputTokens: 500
            }
        };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error?.message || `API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!textResponse) throw new Error("Empty response returned from Gemini API.");

        return formatAiResponse(textResponse);
    }

    // Strategy 2: Check for Vercel Serverless Function `/api/chat`
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userQuery })
        });
        if (response.ok) {
            const data = await response.json();
            if (data.reply) return formatAiResponse(data.reply);
        }
    } catch (e) {
        // Fallback to local RAG
    }

    // Strategy 3: Grounded Local RAG Engine (Zero external dependencies)
    return generateGroundedAnswer(userQuery);
}

function formatAiResponse(text) {
    let html = escapeHtml(text)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
    return `<p>${html}</p>`;
}

async function handleChatSubmit(userQuery) {
    if (!userQuery) return;

    appendUserMessage(userQuery);
    if (chatInput) chatInput.value = '';
    showTypingIndicator();

    try {
        const botReply = await queryGeminiApi(userQuery);
        removeTypingIndicator();
        appendBotMessage(botReply);
    } catch (err) {
        console.error("Chatbot API Error:", err);
        removeTypingIndicator();

        // Fallback gracefully to local grounded knowledge so the user is never left without an answer!
        const fallbackReply = generateGroundedAnswer(userQuery);
        appendBotMessage(`
            <div class="api-notice" style="color: var(--accent-rose); font-size: 0.8rem; margin-bottom: 0.5rem;">
                ⚠️ Note: External API request error (${escapeHtml(err.message)}). Displaying grounded knowledge response:
            </div>
            ${fallbackReply}
        `);
    }
}

if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = chatInput.value.trim();
        if (query) handleChatSubmit(query);
    });
}

// Suggested prompt pill click handlers
suggestedPills.forEach(pill => {
    pill.addEventListener('click', () => {
        const question = pill.getAttribute('data-question');
        if (question) handleChatSubmit(question);
    });
});

if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
        chatMessages.innerHTML = `
            <div class="chat-msg bot-msg">
                <div class="msg-avatar">🤖</div>
                <div class="msg-bubble">
                    <p>Chat cleared! How can I assist you with Ayush's portfolio or projects today?</p>
                </div>
            </div>
        `;
    });
}

// =============================================================================
// 5. CONTACT FORM
// =============================================================================
const contactForm = document.getElementById('contactForm');
const formSuccessMessage = document.getElementById('formSuccessMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName')?.value || 'Visitor';

        if (formSuccessMessage) {
            formSuccessMessage.textContent = `Thank you, ${name}! Your message has been received.`;
            formSuccessMessage.classList.remove('hidden');
        }

        contactForm.reset();

        setTimeout(() => {
            if (formSuccessMessage) formSuccessMessage.classList.add('hidden');
        }, 5000);
    });
}

// =============================================================================
// 6. ROUGH NOTATION HAND-DRAWN SKETCH ANIMATIONS (rough-notation.iife.js)
// =============================================================================
// Brutalist Annotation Palette: Electric Cobalt Blue (#2563EB), Acid Yellow (#E2F144), Deep Ink (#0A0A0A)
const RN_PALETTES = {
    light: {
        ink: '#0A0A0A',
        cobalt: '#2563EB',
        yellow: '#E2F144',
        accent: '#2563EB',
        highlight: '#E2F144'
    },
    dark: {
        ink: '#F4F0EA',
        cobalt: '#3B82F6',
        yellow: '#E2F144',
        accent: '#3B82F6',
        highlight: '#3B82F6'
    }
};

// Maps colors declared in data-rn-color to palette keys
const RN_COLOR_KEYS = {
    '#0a0a0a': 'ink',
    '#2563eb': 'cobalt',
    '#e2f144': 'yellow',
    '#231f20': 'ink',
    '#f4c553': 'yellow',
    '#a3d2ca': 'cobalt',
    '#f6c8b8': 'yellow'
};

const trackedAnnotations = [];

function currentAnnotationPalette() {
    return document.body.getAttribute('data-theme') === 'dark' ? RN_PALETTES.dark : RN_PALETTES.light;
}

function annotateTracked(element, options, paletteKey) {
    const annotation = RoughNotation.annotate(element, options);
    trackedAnnotations.push({ annotation, paletteKey });
    return annotation;
}

// Re-paints sketch strokes whenever theme changes
function refreshAnnotationColors() {
    const palette = currentAnnotationPalette();
    trackedAnnotations.forEach(({ annotation, paletteKey }) => {
        if (annotation && palette[paletteKey]) {
            annotation.color = palette[paletteKey];
        }
    });
}

function initRoughNotation() {
    if (typeof RoughNotation === 'undefined') {
        console.warn('RoughNotation library not loaded.');
        return;
    }

    const { annotationGroup } = RoughNotation;
    const palette = currentAnnotationPalette();

    // A. Hero Section Sequential Group Annotations
    const heroCircle = document.getElementById('rn-hero-circle');
    const heroUnderline = document.getElementById('rn-hero-underline');
    const heroHighlight = document.getElementById('rn-hero-highlight');
    const heroBox = document.getElementById('rn-hero-box');

    const heroAnnotations = [];

    if (heroCircle) {
        heroAnnotations.push(annotateTracked(heroCircle, {
            type: 'circle',
            color: palette.cobalt,
            strokeWidth: 2.5,
            padding: 8,
            animationDuration: 650,
            iterations: 2
        }, 'cobalt'));
    }

    if (heroUnderline) {
        heroAnnotations.push(annotateTracked(heroUnderline, {
            type: 'underline',
            color: palette.cobalt,
            strokeWidth: 4,
            padding: 3,
            animationDuration: 750,
            iterations: 2
        }, 'cobalt'));
    }

    if (heroHighlight) {
        heroAnnotations.push(annotateTracked(heroHighlight, {
            type: 'highlight',
            color: palette.highlight,
            padding: 4,
            animationDuration: 600,
            iterations: 1
        }, 'highlight'));
    }

    if (heroBox) {
        heroAnnotations.push(annotateTracked(heroBox, {
            type: 'box',
            color: palette.ink,
            strokeWidth: 2.5,
            padding: 4,
            animationDuration: 650,
            iterations: 1
        }, 'ink'));
    }

    if (heroAnnotations.length > 0) {
        const heroGroup = annotationGroup(heroAnnotations);
        setTimeout(() => {
            heroGroup.show();
        }, 400);
    }

    // B. Scroll-Triggered Section Header Annotations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.25
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const type = el.getAttribute('data-rn-type') || 'underline';
                const colorHex = (el.getAttribute('data-rn-color') || '#2563eb').toLowerCase();
                const paletteKey = RN_COLOR_KEYS[colorHex] || 'cobalt';
                const strokeWidth = parseFloat(el.getAttribute('data-rn-width') || '3.5');

                const annotation = annotateTracked(el, {
                    type: type,
                    color: palette[paletteKey],
                    strokeWidth: strokeWidth,
                    padding: type === 'circle' ? 10 : 4,
                    animationDuration: 700,
                    iterations: 2,
                    brackets: ['left', 'right']
                }, paletteKey);

                annotation.show();
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-rn-type]').forEach(el => {
        scrollObserver.observe(el);
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    updateApiKeyStatus();
    initRoughNotation();
    console.log("Ayush Raj Chandel Portfolio: JavaScript initialized successfully with Brutalist Aesthetic & Rough Notation.");
});
