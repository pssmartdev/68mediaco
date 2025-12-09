
# Project Functional Specification — Personal Portfolio Website (Mobile App Showcase)

## 1. Project Objective
- Build a personal/corporate portfolio website to showcase mobile applications that have been developed and published on Apple Store & Google Play.
- Present a modern, professional interface that reflects technology capability and design quality.
- Provide clear and engaging content display, allowing users/partners to preview demos and download apps directly from application stores.
- Fully responsive optimized display on Mobile, Tablet, and Desktop.

## 2. Scope and Target Users
**Purpose of use:** marketing, business presentation, capability demonstration in mobile app development.
**Target audience:** clients and partners domestically and internationally.

## 3. Website Structure Overview
The website consists of the following main pages:

### 3.1 Home Page
Displays a list of developed mobile applications in slide or grid gallery format, each project includes:
- Mobile mockup app image
- App name
- Short descriptive tags (e.g., E-commerce, Booking, AI, Fitness...)
- Short introduction section about individual/team capability
- Footer includes contact information: Email, LinkedIn, GitHub, Facebook

### 3.2 Project Detail Page
Displays detailed information when a specific project is selected from the homepage.
The content includes:

- App demo images (static + prototype animation or 10–20s video)
- Detailed description of key features
- Technology stack (Frontend/Backend/Mobile framework/Database/Cloud)
- Role in the project (UI/UX design, Mobile development, Backend API, etc.)
- Download buttons:
  - Download App for iPhone (Apple Store)
  - Download App for Android (Google Play)

Prototype display may use images or embedded iframe if using Figma Prototype.

### 3.3 About Page
Highlights individual/company information:
- Summary introduction
- Experience
- Achievements
- Partners
- Career timeline

### 3.4 Contact Page
- Contact form: Name / Email / Phone / Message
- Google reCAPTCHA integration
- Additional external message links: Zalo / WhatsApp / Telegram

## 4. UI/UX and Design Requirements
- Modern, clean design optimized for app showcase presentation.
- Consistent branding, color theme, and visual hierarchy.
- 100% responsive — mobile-first design approach.
- Navigation: sticky for desktop; optional bottom navigation for mobile.
- Micro-interactions and animation (hover effects, fade-in, swipe slider).

## 5. Technology & Infrastructure
- Frontend: React.js (SPA)
- Frontend languages: HTML/CSS/JavaScript
- Hosting & Deployment: Vercel
- CI/CD automated deployment via GitHub
- Performance optimization and full responsiveness

## 6. Non-functional Requirements
- Fast loading time (<2 seconds on 4G)
- Image optimization (WebP)
- Cross-browser support (Chrome, Safari, Edge)
- Stable and lightweight UX performance

## 7. SEO & Analytics
- On-page SEO standards (Meta Title, Meta Description, OG Image)
- Friendly URLs
- Google Analytics / GA4 integration
- Google Tag Manager support
- Meta Pixel (Facebook) integration optional
- Optimized HTML structure for SEO indexing
