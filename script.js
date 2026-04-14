// ══════════════════════════════════════════════════════════════
// SRIKAR SHARMA — PORTFOLIO SCRIPT
// All project data + dynamic featured section swap
// ══════════════════════════════════════════════════════════════

(function () {
  "use strict";

  // ────────────────────────────────────────────────────────────
  //  PROJECT DATA — every project has full detail
  // ────────────────────────────────────────────────────────────

  var PROJECTS = [
    {
      id: "jarvis",
      name: "J.A.R.V.I.S — AI Desktop Assistant",
      badge: "Ongoing",
      shortDesc: "Modular, voice-controlled AI assistant that automates desktop tasks and integrates with OpenAI.",
      fullDesc: "A modular, voice-controlled AI assistant built in Python that automates desktop tasks, responds to natural language commands, and integrates with OpenAI for intelligent conversations.",
      icon: "🤖",
      tech: ["Python", "OpenAI API", "SpeechRecognition", "pyttsx3", "FuzzyWuzzy", "Pandas"],
      features: [
        { icon: "🎙️", title: "Voice Commands", desc: "Wake-word detection with real-time speech-to-text using SpeechRecognition and pyttsx3 for voice output." },
        { icon: "🖥️", title: "App Control", desc: "Open, close, or force-kill any application on your desktop using natural language — with smart alias mapping." },
        { icon: "📁", title: "File Handling", desc: "Scan directories, index files across the system, and open folders (Downloads, Documents, etc.) by voice." },
        { icon: "🤖", title: "AI Responses", desc: "Integrated OpenAI API for intelligent Q&A, plus fallback to local command parsing for offline use." }
      ],
      howItWorks: [
        { title: "Speech → Text", desc: "Microphone captures audio; SpeechRecognition converts it to text via Google's STT engine." },
        { title: "Processing → Command / API", desc: "Command handler parses intent (open, close, kill, scan) or routes to OpenAI for conversational responses." },
        { title: "Output → Speech", desc: "pyttsx3 text-to-speech engine speaks the result back to the user in real time." }
      ],
      challenges: [
        { title: "Speech recognition errors", desc: "Ambient noise and accent variations caused misinterpretation. Solved with confidence thresholds and retry logic." },
        { title: "Command parsing ambiguity", desc: '"Close browser" vs "close Chrome" required building an alias mapping system and fuzzy matching with FuzzyWuzzy.' },
        { title: "API latency vs offline mode", desc: "Balancing OpenAI API calls with instant local command execution. Implemented a local-first routing strategy." },
        { title: "Cross-platform app launching", desc: "Windows app names differ from process names. Built a system scanner to dynamically discover installed applications." }
      ],
      learnings: [
        { icon: "🔌", title: "API Integration", desc: "Connecting OpenAI, handling tokens, rate limits, and error fallbacks." },
        { icon: "🧱", title: "Modular Design", desc: "Separating audio, core logic, system calls, and AI into independent modules." },
        { icon: "🐛", title: "Real-world Debugging", desc: "Diagnosing microphone issues, process conflicts, and async timing problems." },
        { icon: "🎯", title: "Intent Routing", desc: "Building a command handler that cleanly maps user speech to system actions." }
      ]
    },

    {
      id: "expense-tracker",
      name: "Expense Tracker Web App",
      badge: null,
      shortDesc: "Full-stack personal finance manager with JWT auth, REST APIs, and MongoDB-backed budget tracking.",
      fullDesc: "A full-stack personal finance management application with real-time budget tracking, spending categorization, secure JWT-based authentication, and WebSocket live updates.",
      icon: "💳",
      tech: ["Python", "Flask", "MongoDB Atlas", "JWT", "REST API", "WebSockets"],
      features: [
        { icon: "🔐", title: "JWT Authentication", desc: "Secure user registration and login with JWT token-based authentication, protected routes, and token refresh logic." },
        { icon: "📊", title: "Budget Tracking", desc: "Track daily expenses, set budget limits, and monitor spending patterns with categorized transaction views." },
        { icon: "🔄", title: "Real-time Updates", desc: "WebSocket integration for live expense notifications and dashboard updates without page refresh." },
        { icon: "🗄️", title: "MongoDB Backend", desc: "MongoDB Atlas for persistent storage with schema validation, indexed queries, and modular route blueprints." }
      ],
      howItWorks: [
        { title: "User Auth", desc: "User registers or logs in → Flask backend validates credentials and issues a JWT token for session management." },
        { title: "CRUD Operations", desc: "Authenticated requests hit modular route blueprints (users, expenses, budgets) that interact with MongoDB collections." },
        { title: "Live Dashboard", desc: "WebSocket connections push real-time updates to the frontend dashboard showing budget summaries and recent transactions." }
      ],
      challenges: [
        { title: "JWT token refresh flow", desc: "Implementing secure token refresh without forcing re-login. Built middleware to detect expired tokens and silently refresh." },
        { title: "MongoDB schema design", desc: "Balancing embedded vs referenced documents for expenses. Chose embedded for fast reads within user context." },
        { title: "WebSocket connection stability", desc: "Handling dropped connections and reconnection logic. Implemented heartbeat ping and automatic reconnect on the client." },
        { title: "API route modularity", desc: "Organizing Flask blueprints to keep routes clean as the app grew. Separated users, expenses, and budgets into distinct modules." }
      ],
      learnings: [
        { icon: "🔑", title: "Auth Flows", desc: "End-to-end JWT authentication — registration, login, token validation, and protected endpoint patterns." },
        { icon: "📐", title: "REST API Design", desc: "Building clean, consistent API endpoints with proper HTTP methods, status codes, and error handling." },
        { icon: "🗃️", title: "NoSQL Schema Design", desc: "Structuring MongoDB documents for performance — when to embed vs reference, indexing strategies." },
        { icon: "🔌", title: "Full-stack Integration", desc: "Connecting a Flask backend to a frontend with proper CORS, fetch calls, and state management." }
      ]
    },

    {
      id: "cyber-behavior",
      name: "Cyber Behavior Scanner",
      badge: "Capstone",
      shortDesc: "ML-powered behavioral fingerprinting system classifying user activity as Normal or Suspicious.",
      fullDesc: "A machine learning-powered behavioral fingerprinting system for cybersecurity that classifies user activity as Normal or Suspicious using a trained RandomForest model. Features single-scan and CSV batch analysis with a cyberpunk-themed UI.",
      icon: "🛡️",
      tech: ["Python", "Flask", "Scikit-learn", "SQLite", "REST API", "HTML/CSS/JS"],
      features: [
        { icon: "🔍", title: "Single Scan", desc: "Enter individual user behavior data (login hour, session duration, commands, failed logins, protocol, typing speed) for instant classification." },
        { icon: "📄", title: "CSV Batch Analysis", desc: "Upload CSV files with hundreds or thousands of records for bulk behavioral analysis and classification." },
        { icon: "📊", title: "Analytics Dashboard", desc: "Aggregated statistics showing total predictions, normal vs suspicious ratios, and confidence distributions." },
        { icon: "💾", title: "Result Storage", desc: "All predictions are persisted in SQLite with timestamps, enabling historical analysis and audit trails." }
      ],
      howItWorks: [
        { title: "Input Collection", desc: "User enters behavior data via the cyberpunk-themed UI form or uploads a CSV file through the batch interface." },
        { title: "Feature Extraction & Prediction", desc: "Flask backend extracts features, applies protocol encoding, and runs the trained RandomForest model for classification." },
        { title: "Results & Storage", desc: "Prediction (Normal/Suspicious) with confidence score is returned to the UI and persisted in SQLite for analytics." }
      ],
      challenges: [
        { title: "Model accuracy tuning", desc: "Balancing the 45/55 suspicious-to-normal ratio in synthetic data. Achieved 95%+ accuracy with 200-estimator RandomForest." },
        { title: "Feature engineering", desc: "Identifying which behavioral features (login hour, protocol, typing speed) contribute most to classification accuracy." },
        { title: "CSV edge cases", desc: "Handling malformed CSVs, missing fields, and encoding issues in batch uploads. Built robust validation and error reporting." },
        { title: "Cyberpunk UI integration", desc: "Building a CRT terminal-inspired frontend (scanlines, glitch effects) while keeping the form functionally clean and accessible." }
      ],
      learnings: [
        { icon: "🤖", title: "ML Pipeline", desc: "End-to-end ML workflow — data generation, training, model serialization with joblib, and inference in production." },
        { icon: "🏗️", title: "Flask API Architecture", desc: "Blueprint-based route organization, service layer separation, and clean request/response patterns." },
        { icon: "📈", title: "Data Handling", desc: "Processing CSV uploads, Pandas DataFrame manipulation, and batch prediction pipelines." },
        { icon: "🎨", title: "Themed UI Design", desc: "Building an immersive cyberpunk/Mr. Robot themed frontend with CSS animations and custom styling." }
      ]
    },

    {
      id: "finsense",
      name: "FinSense AI — Smart Finance Assistant",
      badge: "Ongoing",
      shortDesc: "AI-driven financial assistant with n8n workflow integration for receipt categorization and spam detection.",
      fullDesc: "An AI-driven financial assistant that integrates n8n workflow automation for receipt categorization and SMS spam detection. Features a modular Flask backend with auth, savings tracking, MCP services, and AI-powered classification.",
      icon: "💰",
      tech: ["Python", "Flask", "n8n", "AI/ML", "REST API", "MongoDB"],
      features: [
        { icon: "🧾", title: "Receipt Categorization", desc: "Send receipt text to n8n webhooks for AI-powered automatic expense category detection (food, transport, utilities, etc.)." },
        { icon: "📱", title: "SMS Spam Detection", desc: "Analyze incoming SMS messages through n8n AI workflows to filter spam from legitimate financial notifications." },
        { icon: "💰", title: "Savings Tracker", desc: "Track savings goals with dedicated routes, services, and models — set targets and monitor progress over time." },
        { icon: "🔐", title: "Auth & User Management", desc: "Secure authentication routes with user profiles, session management, and protected API endpoints." }
      ],
      howItWorks: [
        { title: "Input Capture", desc: "User submits receipt text or SMS content through the API endpoints. Flask validates and preprocesses the data." },
        { title: "n8n Webhook Processing", desc: "Data is sent to n8n webhooks via HTTP client. n8n workflows run AI models for categorization or spam detection." },
        { title: "Result & Storage", desc: "Classified results are returned to the user and stored in the database. Savings and receipt history are tracked per user." }
      ],
      challenges: [
        { title: "n8n workflow orchestration", desc: "Designing reliable webhook-triggered AI workflows with proper error handling and timeout management between Flask and n8n." },
        { title: "Multi-service architecture", desc: "Coordinating between MCP service, AI service, spam service, and savings service while maintaining clean separation of concerns." },
        { title: "Receipt text parsing", desc: "Handling varied receipt formats — different stores, languages, and structures. Built flexible text preprocessing pipelines." },
        { title: "Webhook reliability", desc: "Ensuring n8n webhook calls don't fail silently. Implemented retry logic and fallback responses for service unavailability." }
      ],
      learnings: [
        { icon: "⚡", title: "Workflow Automation", desc: "Using n8n for AI-powered automation pipelines — webhook triggers, data transformation, and API chaining." },
        { icon: "🏛️", title: "Service-Oriented Architecture", desc: "Building a backend with clearly separated services (AI, spam, savings, MCP) that can evolve independently." },
        { icon: "🤖", title: "AI-Driven Classification", desc: "Integrating AI models for real-world text classification tasks — receipt categorization and spam filtering." },
        { icon: "🔧", title: "API Design Patterns", desc: "RESTful route organization with blueprints, input validation, and consistent error response formats." }
      ]
    },

    {
      id: "f1-telemetry",
      name: "F1 Telemetry Visualization",
      badge: null,
      shortDesc: "Interactive web app for visualizing and comparing Formula 1 telemetry data with synchronized track maps.",
      fullDesc: "An interactive web application for visualizing and comparing Formula 1 telemetry data with synchronized track maps, lap analysis, color-coded performance segments, and real-time cursor synchronization across all plots.",
      icon: "🏎️",
      tech: ["Python", "FastF1", "Plotly", "Dash", "Pandas", "NumPy"],
      features: [
        { icon: "📈", title: "Interactive Telemetry Plots", desc: "Visualize Speed, Time Delta, Throttle, Brake, RPM, and Gear data with interactive Plotly charts." },
        { icon: "🗺️", title: "Track Map Visualization", desc: "See the full circuit layout with a synchronized cursor showing your exact position on the track." },
        { icon: "🔄", title: "Lap Comparison", desc: "Compare two laps with color-coded sections — green where the first lap is faster, red where it's slower." },
        { icon: "🎯", title: "Synchronized Cursor", desc: "Hover over any telemetry plot and see the corresponding position highlighted on all other plots and the track map." }
      ],
      howItWorks: [
        { title: "Data Acquisition", desc: "User selects year, Grand Prix, session type, driver, and two laps. FastF1 downloads and caches the official telemetry data." },
        { title: "Data Processing", desc: "Pandas and NumPy process the raw telemetry — resampling, interpolation, delta calculations, and track coordinate extraction." },
        { title: "Visualization", desc: "Plotly/Dash renders interactive charts with synchronized cursors. Track map updates in real-time based on hover position." }
      ],
      challenges: [
        { title: "Large dataset handling", desc: "F1 telemetry has thousands of data points per lap. Optimized with data downsampling and efficient Pandas operations." },
        { title: "Cross-plot cursor synchronization", desc: "Making the cursor position consistent across 6 different telemetry plots and the track map simultaneously." },
        { title: "Track map coordinate rendering", desc: "Converting FastF1's x/y track coordinates into a clean circuit visualization with accurate corner positions." },
        { title: "Caching and load times", desc: "First data downloads can take minutes. Implemented FastF1's caching system and loading indicators for UX." }
      ],
      learnings: [
        { icon: "📊", title: "Data Visualization", desc: "Building interactive, multi-plot dashboards with Plotly/Dash — layout, callbacks, and real-time updates." },
        { icon: "⚡", title: "Performance Optimization", desc: "Handling large datasets efficiently — downsampling, lazy loading, and caching strategies for responsive UX." },
        { icon: "🏎️", title: "Domain-Specific Data", desc: "Working with specialized motorsport data — understanding telemetry channels, lap timing, and track coordinates." },
        { icon: "🔗", title: "Callback Architecture", desc: "Designing Dash callback chains where user interactions propagate cleanly across multiple visual components." }
      ]
    },

    {
      id: "takarayomi",
      name: "Takarayomi — Manga Library",
      badge: "Ongoing",
      shortDesc: "Manga reader with FastAPI + PostgreSQL backend, Docker containerization, and Alembic migrations.",
      fullDesc: "A manga reader and library application with a FastAPI + PostgreSQL backend, Docker containerization for deployment, Alembic database migrations, and SQLAlchemy ORM for data modeling.",
      icon: "📚",
      tech: ["FastAPI", "PostgreSQL", "Docker", "Alembic", "SQLAlchemy", "Pydantic"],
      features: [
        { icon: "📖", title: "Manga Browsing", desc: "Browse and search through manga collections with organized categories, genres, and reading lists." },
        { icon: "🐳", title: "Docker Deployment", desc: "Fully containerized with Docker and docker-compose for consistent development and production environments." },
        { icon: "🔄", title: "Database Migrations", desc: "Alembic-managed schema migrations for safe, versioned database changes without data loss." },
        { icon: "📋", title: "Schema Validation", desc: "Pydantic schemas for strict request/response validation and automatic API documentation via FastAPI." }
      ],
      howItWorks: [
        { title: "API Layer", desc: "FastAPI serves RESTful endpoints with automatic OpenAPI docs. Routes are organized by resource (manga, chapters, users)." },
        { title: "Data Layer", desc: "SQLAlchemy models map to PostgreSQL tables. Alembic tracks and applies schema migrations versioned in the codebase." },
        { title: "Deployment", desc: "Docker Compose orchestrates the FastAPI app and PostgreSQL database as connected containers with shared networking." }
      ],
      challenges: [
        { title: "Docker compose networking", desc: "Getting FastAPI and PostgreSQL containers to communicate properly. Configured service discovery and health checks." },
        { title: "Alembic migration conflicts", desc: "Managing migration version chains when schema changes happen on different branches. Learned merge strategies." },
        { title: "SQLAlchemy relationship modeling", desc: "Designing many-to-many relationships (manga ↔ genres, users ↔ favorites) with proper cascade behavior." },
        { title: "Environment configuration", desc: "Managing different configs for dev, test, and production environments while keeping secrets out of the codebase." }
      ],
      learnings: [
        { icon: "🐳", title: "Docker Workflows", desc: "Building multi-container applications with Docker Compose — volumes, networking, and environment management." },
        { icon: "🗃️", title: "Database Migrations", desc: "Version-controlled schema evolution with Alembic — setting up, generating, and applying migrations safely." },
        { icon: "⚡", title: "FastAPI Patterns", desc: "Dependency injection, async routes, automatic validation, and OpenAPI generation with FastAPI." },
        { icon: "🏗️", title: "ORM Design", desc: "SQLAlchemy model design — relationships, lazy loading, cascade deletes, and query optimization." }
      ]
    },

    {
      id: "recipe-book",
      name: "Recipe Book",
      badge: null,
      shortDesc: "Feature-rich frontend recipe management app with multi-page navigation and sidebar-based UX.",
      fullDesc: "A feature-rich frontend-only recipe management application with multi-page architecture including login, signup, favorites, history, settings, video tutorials, and a sidebar-based navigation system. Structured for future Flask backend integration.",
      icon: "🍳",
      tech: ["HTML", "CSS", "JavaScript"],
      features: [
        { icon: "📋", title: "Multi-Page Architecture", desc: "15 distinct pages — Home, Login, Signup, Favorites, History, Videos, Settings, Profile, Today's Specials, and more." },
        { icon: "📌", title: "Favorites & History", desc: "Save favorite recipes and track browsing history for quick access to previously viewed recipes." },
        { icon: "🎬", title: "Video Tutorials", desc: "Dedicated video section for cooking tutorials with organized categories and easy playback." },
        { icon: "📱", title: "Sidebar Navigation", desc: "Responsive sidebar-based navigation system for seamless page-to-page transitions." }
      ],
      howItWorks: [
        { title: "Page Routing", desc: "Multi-page HTML architecture with shared sidebar component. Each page (Home, Favorites, History) is a standalone HTML file." },
        { title: "Local State", desc: "User preferences, favorites, and history are managed via JavaScript — structured to easily connect to a backend API later." },
        { title: "Content Display", desc: "Recipe cards with images, ingredients, and steps. Today's Specials and Top Searches update dynamically." }
      ],
      challenges: [
        { title: "State management without backend", desc: "Persisting favorites and history across pages without a server. Used structured localStorage patterns." },
        { title: "Responsive sidebar design", desc: "Building a sidebar that works on both desktop and mobile — collapsible, touch-friendly, and consistent across 15 pages." },
        { title: "Page consistency", desc: "Maintaining consistent styling and navigation across 15 different HTML files without a component framework." },
        { title: "Backend-ready architecture", desc: "Structuring the JavaScript to use fetch-style patterns so switching from localStorage to API calls requires minimal changes." }
      ],
      learnings: [
        { icon: "🏗️", title: "Frontend Architecture", desc: "Designing a multi-page app with shared components and consistent navigation without a framework." },
        { icon: "🎨", title: "UI/UX Design", desc: "Creating an intuitive recipe browsing experience with categories, search, favorites, and video sections." },
        { icon: "💾", title: "Local Storage Patterns", desc: "Structured data persistence in the browser — CRUD operations on localStorage as a proto-database." },
        { icon: "🔌", title: "Backend-Ready Design", desc: "Writing frontend code that's structured to easily swap localStorage for REST API calls in the future." }
      ]
    },

    {
      id: "sih-platform",
      name: "SIH 2024 — Freelancing Platform",
      badge: "Hackathon",
      shortDesc: "Frontend for a PM internship recommendation platform built during Internal Smart India Hackathon 2024.",
      fullDesc: "Frontend development for a PM internship recommendation and freelancing platform built during the Internal Smart India Hackathon 2024. FastAPI backend with PostgreSQL, Pydantic schemas, service layer architecture, and a responsive HTML/CSS frontend.",
      icon: "👥",
      tech: ["FastAPI", "PostgreSQL", "HTML/CSS", "REST API", "Pydantic", "SQLAlchemy"],
      features: [
        { icon: "🎯", title: "Internship Matching", desc: "Recommendation engine matching candidates to relevant internships based on profile, skills, and interests." },
        { icon: "📝", title: "Job Postings", desc: "Companies can post internship opportunities with detailed requirements, duration, and application deadlines." },
        { icon: "👤", title: "User Profiles", desc: "Candidate profiles with skills, education, experience, and preferences for personalized recommendations." },
        { icon: "📱", title: "Responsive Frontend", desc: "Mobile-friendly HTML/CSS frontend designed for accessibility and ease of use for first-generation learners." }
      ],
      howItWorks: [
        { title: "Frontend Layer", desc: "Responsive HTML/CSS pages for job browsing, user profiles, and application submission. Built for API integration." },
        { title: "API Backend", desc: "FastAPI serves RESTful endpoints with Pydantic validation. Service layer handles business logic and database operations." },
        { title: "Data Storage", desc: "PostgreSQL database with SQLAlchemy models for users, jobs, applications, and recommendation data." }
      ],
      challenges: [
        { title: "Tight hackathon deadline", desc: "48-hour development sprint. Prioritized MVP features and divided work between frontend and backend team members." },
        { title: "Team coordination", desc: "Coordinating API contracts between frontend and backend developers. Defined schemas upfront to enable parallel work." },
        { title: "Low-literacy user UX", desc: "Designing for first-generation learners with minimal digital experience. Used large buttons, simple language, and clear flows." },
        { title: "API integration planning", desc: "Structuring the frontend to seamlessly consume APIs even though the backend was being built simultaneously." }
      ],
      learnings: [
        { icon: "⏱️", title: "Rapid Prototyping", desc: "Building functional prototypes under extreme time pressure — prioritizing core features and cutting scope wisely." },
        { icon: "🤝", title: "Team Collaboration", desc: "Coordinating with backend developers, defining API contracts, and managing parallel development streams." },
        { icon: "♿", title: "Accessible Design", desc: "Building UIs for users with limited digital literacy — simplicity, clarity, and progressive disclosure." },
        { icon: "📋", title: "API-First Thinking", desc: "Designing frontend components around API responses before the API exists — mock data and contract-first development." }
      ]
    }
  ];


  // ────────────────────────────────────────────────────────────
  //  RENDER: Featured Project (full detail view)
  // ────────────────────────────────────────────────────────────

  var currentProjectId = "jarvis";

  function renderFeatured(projectId) {
    var p = PROJECTS.find(function(proj) { return proj.id === projectId; });
    if (!p) return;
    currentProjectId = projectId;

    var container = document.getElementById("featured-content");

    // Build features HTML
    var featuresHTML = p.features.map(function(f) {
      return '<div class="feature-card">' +
        '<span class="feature-icon">' + f.icon + '</span>' +
        '<h3>' + f.title + '</h3>' +
        '<p>' + f.desc + '</p>' +
      '</div>';
    }).join('');

    // Build tech pills
    var techHTML = p.tech.map(function(t) {
      return '<span class="pill">' + t + '</span>';
    }).join('');

    // Build how it works
    var flowHTML = p.howItWorks.map(function(step, i) {
      var arrow = (i < p.howItWorks.length - 1) ? '<div class="flow-arrow">→</div>' : '';
      return '<div class="flow-step">' +
        '<div class="flow-number">' + (i + 1) + '</div>' +
        '<div class="flow-content">' +
          '<strong>' + step.title + '</strong>' +
          '<p>' + step.desc + '</p>' +
        '</div>' +
      '</div>' + arrow;
    }).join('');

    // Build challenges
    var challengesHTML = p.challenges.map(function(c) {
      return '<li><strong>' + c.title + '</strong> — ' + c.desc + '</li>';
    }).join('');

    // Build learnings
    var learningsHTML = p.learnings.map(function(l) {
      return '<div class="learning-item">' +
        '<span>' + l.icon + '</span>' +
        '<p><strong>' + l.title + '</strong> — ' + l.desc + '</p>' +
      '</div>';
    }).join('');

    // Build badge
    var badgeHTML = p.badge ? ' <span class="badge">' + p.badge + '</span>' : '';

    container.innerHTML =
      '<p class="section-label">Project Deep Dive</p>' +
      '<h2 class="section-title">' + p.icon + ' ' + p.name + badgeHTML + '</h2>' +
      '<p class="featured-desc">' + p.fullDesc + '</p>' +

      // Features
      '<div class="featured-grid">' + featuresHTML + '</div>' +

      // Tech
      '<div class="tech-pills">' + techHTML + '</div>' +

      // How It Works
      '<div class="subsection">' +
        '<h3 class="subsection-title">⚙️ How It Works</h3>' +
        '<div class="flow-diagram">' + flowHTML + '</div>' +
      '</div>' +

      // Challenges
      '<div class="subsection">' +
        '<h3 class="subsection-title">⚔️ Challenges Faced</h3>' +
        '<ul class="challenge-list">' + challengesHTML + '</ul>' +
      '</div>' +

      // Learnings
      '<div class="subsection">' +
        '<h3 class="subsection-title">📊 What I Learned</h3>' +
        '<div class="learnings-grid">' + learningsHTML + '</div>' +
      '</div>' +

      // GitHub link
      '<a href="https://github.com/Srikar-098" target="_blank" class="btn btn-primary" style="margin-top: 28px;">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>' +
        'View on GitHub' +
      '</a>';

    // Update active state on project cards
    updateActiveCard();
  }


  // ────────────────────────────────────────────────────────────
  //  RENDER: Project Grid Cards
  // ────────────────────────────────────────────────────────────

  function renderProjectGrid() {
    var grid = document.getElementById("projects-grid");
    if (!grid) return;

    var html = PROJECTS.map(function(p) {
      var badgeHTML = p.badge ? '<span class="badge">' + p.badge + '</span>' : '';
      var techHTML = p.tech.slice(0, 4).map(function(t) {
        return '<span class="pill">' + t + '</span>';
      }).join('');

      var activeClass = (p.id === currentProjectId) ? ' project-card-active' : '';

      return '<div class="project-card' + activeClass + '" data-project-id="' + p.id + '" id="card-' + p.id + '">' +
        '<div class="project-header">' +
          '<span class="project-icon-emoji">' + p.icon + '</span>' +
          '<h3>' + p.name + '</h3>' +
          badgeHTML +
        '</div>' +
        '<p>' + p.shortDesc + '</p>' +
        '<div class="tech-pills">' + techHTML + '</div>' +
        '<button class="btn-view-details" data-id="' + p.id + '">' +
          (p.id === currentProjectId ? '✓ Currently Viewing' : 'View Details →') +
        '</button>' +
      '</div>';
    }).join('');

    grid.innerHTML = html;

    // Attach click handlers
    grid.querySelectorAll('.btn-view-details').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        var id = this.getAttribute('data-id');
        renderFeatured(id);
        // Smooth scroll to featured section
        document.getElementById('featured').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Also make entire card clickable
    grid.querySelectorAll('.project-card').forEach(function(card) {
      card.addEventListener('click', function(e) {
        // Don't double-fire if button was clicked
        if (e.target.closest('.btn-view-details')) return;
        var id = this.getAttribute('data-project-id');
        renderFeatured(id);
        document.getElementById('featured').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }


  // ────────────────────────────────────────────────────────────
  //  Update active card styling
  // ────────────────────────────────────────────────────────────

  function updateActiveCard() {
    var cards = document.querySelectorAll('.project-card');
    cards.forEach(function(card) {
      var id = card.getAttribute('data-project-id');
      var btn = card.querySelector('.btn-view-details');

      if (id === currentProjectId) {
        card.classList.add('project-card-active');
        if (btn) btn.textContent = '✓ Currently Viewing';
      } else {
        card.classList.remove('project-card-active');
        if (btn) btn.textContent = 'View Details →';
      }
    });
  }


  // ────────────────────────────────────────────────────────────
  //  NAVBAR: Scroll shadow + mobile toggle + active section
  // ────────────────────────────────────────────────────────────

  var navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  var navToggle = document.getElementById("navToggle");
  var navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
      });
    });
  }

  // Active nav link on scroll
  var sections = document.querySelectorAll("section[id]");
  var navAnchors = document.querySelectorAll(".nav-links a");

  function updateActiveNav() {
    var scrollY = window.scrollY + 120;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute("id");
      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(function (a) {
          a.style.color = "";
          a.style.background = "";
        });
        var activeLink = document.querySelector('.nav-links a[href="#' + id + '"]');
        if (activeLink) {
          activeLink.style.color = "#ede6dd";
          activeLink.style.background = "rgba(255,255,255,0.06)";
        }
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();


  // ────────────────────────────────────────────────────────────
  //  INIT: Render on page load
  // ────────────────────────────────────────────────────────────

  renderFeatured("jarvis");
  renderProjectGrid();

})();
