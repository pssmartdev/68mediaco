// Import assets
import beautyApp1 from '../assets/beauty_app_1.png'
import beautyApp2 from '../assets/beauty_app_2.png'
import previewP1 from '../assets/preview_p1.png'
import previewP2 from '../assets/preview_p2.png'
import previewP3 from '../assets/preview_p3.png'

// Categories configuration
export const CATEGORIES = [
  "Finance",
  "Health",
  "Social",
  "E-Commerce",
  "Utility",
  "Education",
  "Game",
  "Productivity",
  "Travel",
  "Lifestyle",
  "Music",
  "News"
]

// Static project data — deterministic, no Math.random()
const PROJECTS_STATIC = [
  {
    name: "WealthTrack",
    category: "Finance",
    description: "A smart personal finance app that helps you manage budgets, track expenses, and grow your savings with AI-powered insights.",
    rating: "4.8",
    ratingCount: "12K",
    rank: "#2",
    size: "42.3 MB",
    version: "2.4.1",
    updated: "3d ago"
  },
  {
    name: "FitSync Pro",
    category: "Health",
    description: "Your complete fitness companion — track workouts, monitor nutrition, and reach your health goals faster with personalized plans.",
    rating: "4.7",
    ratingCount: "8K",
    rank: "#4",
    size: "38.7 MB",
    version: "1.8.3",
    updated: "5d ago"
  },
  {
    name: "ConnectMe",
    category: "Social",
    description: "A modern social platform designed to bring communities together through meaningful conversations and shared experiences.",
    rating: "4.9",
    ratingCount: "24K",
    rank: "#1",
    size: "55.2 MB",
    version: "3.1.0",
    updated: "1d ago"
  },
  {
    name: "ShopEase",
    category: "E-Commerce",
    description: "Seamless shopping experience with smart recommendations, one-tap checkout, and real-time order tracking.",
    rating: "4.6",
    ratingCount: "6K",
    rank: "#5",
    size: "44.1 MB",
    version: "2.2.5",
    updated: "7d ago"
  },
  {
    name: "QuickTools",
    category: "Utility",
    description: "An all-in-one utility suite with 30+ essential tools — converter, scanner, calculator, and more in one clean interface.",
    rating: "4.8",
    ratingCount: "15K",
    rank: "#3",
    size: "62.8 MB",
    version: "1.5.2",
    updated: "2d ago"
  },
  {
    name: "LearnHub",
    category: "Education",
    description: "Interactive learning platform offering courses, quizzes, and progress tracking for students and lifelong learners.",
    rating: "4.7",
    ratingCount: "9K",
    rank: "#6",
    size: "35.4 MB",
    version: "2.9.1",
    updated: "4d ago"
  },
  {
    name: "PlayZone",
    category: "Game",
    description: "A collection of casual games engineered for smooth performance and addictive gameplay on any device.",
    rating: "4.9",
    ratingCount: "18K",
    rank: "#1",
    size: "48.9 MB",
    version: "1.3.7",
    updated: "6d ago"
  },
  {
    name: "TaskFlow",
    category: "Productivity",
    description: "Streamline your day with smart task management, team collaboration, and deadline reminders in one focused workspace.",
    rating: "4.8",
    ratingCount: "11K",
    rank: "#2",
    size: "41.6 MB",
    version: "3.0.2",
    updated: "2d ago"
  },
  {
    name: "TripPlanner",
    category: "Travel",
    description: "Plan your perfect trip with smart itineraries, offline maps, local recommendations, and real-time flight tracking.",
    rating: "4.6",
    ratingCount: "7K",
    rank: "#7",
    size: "33.2 MB",
    version: "2.1.4",
    updated: "5d ago"
  },
  {
    name: "BeautyBook",
    category: "Lifestyle",
    description: "Book salon appointments, discover beauty trends, and manage your self-care routines — all in one elegant app.",
    rating: "4.7",
    ratingCount: "13K",
    rank: "#3",
    size: "57.3 MB",
    version: "1.7.8",
    updated: "1d ago"
  },
  {
    name: "BeatBox",
    category: "Music",
    description: "Stream, create, and share music with high-fidelity audio, smart playlists, and a built-in beat maker studio.",
    rating: "4.8",
    ratingCount: "20K",
    rank: "#1",
    size: "46.5 MB",
    version: "2.6.3",
    updated: "3d ago"
  },
  {
    name: "NewsDaily",
    category: "News",
    description: "Stay informed with AI-curated news from trusted sources, personalized to your interests with zero clickbait.",
    rating: "4.9",
    ratingCount: "5K",
    rank: "#4",
    size: "39.8 MB",
    version: "3.2.1",
    updated: "4d ago"
  }
]

// Base images for rotation
const BASE_IMAGES = [beautyApp1, beautyApp2, previewP1, previewP2, previewP3]

const generateProjectImages = (projectId) => {
  return Array.from({ length: 4 }).map((_, imageIndex) => {
    const baseImg = BASE_IMAGES[(projectId + imageIndex) % BASE_IMAGES.length]
    const hue = (projectId * 30 + imageIndex * 15) % 360

    return {
      src: baseImg,
      style: { filter: `hue-rotate(${hue}deg)` }
    }
  })
}

export const generateProjects = () => {
  return PROJECTS_STATIC.map((data, index) => {
    const id = index + 1
    const projectImages = generateProjectImages(id)

    return {
      id,
      title: data.name,
      category: data.category,
      description: data.description,
      image: projectImages[0].src,
      images: projectImages,
      mockups: {
        iphone: projectImages[0].src,
        android: projectImages[1].src,
        feature: projectImages[2].src
      },
      subtitle: `${data.category} & Productivity`,
      rating: data.rating,
      ratingCount: data.ratingCount,
      age: "4+",
      rank: data.rank,
      rankCategory: data.category,
      developer: "68 Media Co.",
      size: data.size,
      version: data.version,
      updated: data.updated,
      language: "English",
      previews: projectImages.map(img => img.src)
    }
  })
}

export const getProjectById = (id) => {
  const projects = generateProjects()
  return projects.find(project => project.id === parseInt(id)) || null
}

export const getProjectsByCategory = (category) => {
  const projects = generateProjects()
  return projects.filter(project => project.category === category)
}

export const generateProjectDescription = (project) => {
  return `${project.title} is the ultimate ${project.category.toLowerCase()} application designed to help you achieve your goals. With AI-powered insights, real-time tracking, and an intuitive interface, managing your ${project.category.toLowerCase()} needs has never been easier.

Key Features:
• Smart Management: Advanced features tailored for ${project.category.toLowerCase()}.
• Real-time Sync: Keep your data updated across all devices.
• Secure & Private: Bank-level encryption for all your information.`
}

export const generateAppIcon = (project) => {
  const colors = ['10b981', 'f59e0b', '3b82f6', 'ef4444', '8b5cf6', '06b6d4', 'ec4899', '14b8a6']
  const colorIndex = CATEGORIES.indexOf(project.category) % colors.length
  const initials = project.title.split(' ').map(word => word[0]).join('').slice(0, 2)

  return `https://placehold.co/200x200/${colors[colorIndex]}/ffffff?text=${initials}`
}
