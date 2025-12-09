// Company/Personal Information
export const COMPANY_INFO = {
  name: "DevPortfolio",
  tagline: "Showcasing premium mobile applications and digital experiences",
  founder: "Quang Linh",
  location: "Ho Chi Minh City, Vietnam",
  email: "hello@devportfolio.com"
}

// Social Media Links
export const SOCIAL_LINKS = {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  email: "mailto:hello@devportfolio.com",
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
  subtitle: "Specialized in high-end mobile experiences. Showcasing 12 featured applications available on iOS & Android.",
  primaryCTA: "View Featured Projects",
  secondaryCTA: "Let's Talk"
}

// About Page Content
export const ABOUT_CONTENT = {
  title: "About Me",
  intro: "I am a passionate Mobile App Developer and UX/UI Designer with over 5 years of experience in creating digital products that people love to use. My journey started with a curiosity for how things work, and it has evolved into a career of building robust applications.",
  experiences: [
    {
      title: "Senior Mobile Developer",
      company: "TechFlow Solutions",
      period: "2021 - Present",
      description: "Leading the mobile development team, architecting React Native apps, and ensuring high code quality."
    },
    {
      title: "UI/UX Designer",
      company: "Creative Studio",
      period: "2018 - 2021",
      description: "Designed interfaces for over 20+ mobile applications and web platforms."
    }
  ]
}

// Contact Page Content
export const CONTACT_CONTENT = {
  title: "Let's Work Together",
  subtitle: "Have a project in mind? I'd love to hear about it. Send me a message and I'll get back to you as soon as possible.",
  methods: [
    {
      label: "Email",
      value: COMPANY_INFO.email
    },
    {
      label: "Location",
      value: COMPANY_INFO.location
    }
  ]
}

// Project Detail Page - What's New Section
export const WHATS_NEW_CONTENT = {
  items: [
    "Improved AI categorization accuracy",
    "Dark mode refinements",
    "Bug fixes and performance improvements"
  ]
}

// App Store Links
export const APP_STORE_LINKS = {
  ios: "https://apps.apple.com/app/",
  android: "https://play.google.com/store/apps/details?id="
}
