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
  intro: "68 Media Company Limited is a mobile app development studio based in Ho Chi Minh City, Vietnam. We are passionate about crafting premium digital products that people love to use — from concept and UI/UX design through to App Store and Google Play launch. Our team combines technical excellence with creative thinking to deliver applications across a wide range of industries.",
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
