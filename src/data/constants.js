// Company/Personal Information
export const COMPANY_INFO = {
  name: "68 Media Co.",
  tagline: "Showcasing premium mobile applications and digital experiences",
  founder: "Quang Linh",
  location: "Lot A4-09 Nguyen Sinh Sac Street, Hoa Khanh Ward, Da Nang City, Vietnam",
  email: "contact@68mediaco.com"
}

// Social Media Links
export const SOCIAL_LINKS = {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  email: "mailto:contact@68mediaco.com",
  facebook: "https://facebook.com/yourpage"
}

// Navigation Menu Items
export const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" }
]

// Hero Section Content
export const HERO_CONTENT = {
  title: "Crafting Digital",
  titleHighlight: "Masterpieces",
  subtitle: "We deliver premium digital experiences across web and mobile platforms. Discover our featured solutions on iOS, Android, and the web.",
  primaryCTA: "View Featured Projects",
  secondaryCTA: "Let's Talk"
}

// About Page Content
export const ABOUT_CONTENT = {
  title: "About Us",
  experiencesSectionTitle: "What We Do",
  intro: "68 Media Company Limited is a mobile app development studio based in Hoa Khanh Ward, Da Nang City, Vietnam. We are passionate about crafting premium digital products that people love to use — from concept and UI/UX design through to App Store and Google Play launch. Our team combines technical excellence with creative thinking to deliver applications across a wide range of industries.",
  experiences: [
    {
      title: "Mobile App Development",
      company: "iOS & Android",
      period: "2019 – Present",
      description: "Full-cycle development from ideation to App Store and Google Play launch, focusing on intuitive UX, robust performance, and clean architecture."
    },
    {
      title: "UI/UX Design",
      company: "Product Design",
      period: "2019 – Present",
      description: "We design beautiful, user-centered interfaces for mobile and web platforms, with a track record of 12+ products across diverse sectors including Finance, Health, Lifestyle, and more."
    }
  ]
}

// Contact Page Content
export const CONTACT_CONTENT = {
  title: "Let's Work Together",
  subtitle: "Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you as soon as possible.",
  methods: [
    {
      label: "Email",
      value: COMPANY_INFO.email,
      href: `mailto:${COMPANY_INFO.email}`
    },
    {
      label: "Location",
      value: COMPANY_INFO.location
    }
  ]
}

// Project Detail Page - What's New Section (per category)
export const WHATS_NEW_BY_CATEGORY = {
  Finance: [
    "Real-time portfolio sync with 50+ exchanges",
    "Improved AI-powered budget forecasting",
    "Bug fixes and performance improvements"
  ],
  Health: [
    "New HIIT workout library with 200+ exercises",
    "Apple Watch & Wear OS deep integration",
    "Nutrition tracking accuracy improvements"
  ],
  Social: [
    "End-to-end encrypted group messaging",
    "Improved media compression for faster sharing",
    "Bug fixes and stability improvements"
  ],
  'E-Commerce': [
    "Price drop alerts for saved items",
    "One-tap checkout with saved payment methods",
    "Faster product search and filtering"
  ],
  Utility: [
    "Added PDF merge and split tool",
    "QR scanner now supports batch scanning",
    "UI redesign for easier tool discovery"
  ],
  Education: [
    "Offline mode for downloaded course content",
    "Live quiz sessions with real-time leaderboards",
    "Certificate sharing to LinkedIn added"
  ],
  Game: [
    "5 new puzzle levels added to Classic mode",
    "Multiplayer matchmaking improvements",
    "Bug fixes and performance improvements"
  ],
  Productivity: [
    "Pomodoro timer now syncs across devices",
    "New recurring task templates",
    "Calendar integration with Google & Outlook"
  ],
  Travel: [
    "Offline map downloads now 40% smaller",
    "Real-time flight status notifications",
    "New hidden gems feature for local discoveries"
  ],
  Lifestyle: [
    "Instant booking confirmation with e-receipt",
    "Browse and filter 500+ new service providers",
    "Beauty routine tracker improvements"
  ],
  Music: [
    "Hi-Fi lossless streaming now available",
    "Studio mixer with new reverb and EQ effects",
    "Smart playlist suggestions improved"
  ],
  News: [
    "Bias detection now covers 200 more sources",
    "Improved offline reading experience",
    "Topic follow suggestions based on reading habits"
  ]
}

// App Store Links
export const APP_STORE_LINKS = {
  ios: "https://apps.apple.com/app/",
  android: "https://play.google.com/store/apps/details?id="
}
