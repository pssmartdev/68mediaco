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

// Project names
const PROJECT_NAMES = [
  "Alpha",
  "Beta",
  "Gamma",
  "Delta",
  "Epsilon",
  "Zeta",
  "Eta",
  "Theta",
  "Iota",
  "Kappa",
  "Lambda",
  "Mu"
]

// Base images for rotation
const BASE_IMAGES = [beautyApp1, beautyApp2, previewP1, previewP2, previewP3]

/**
 * Generate project images with unique styling
 * @param {number} projectId - The project ID
 * @returns {Array} Array of image objects with src and style
 */
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

/**
 * Generate all projects data
 * @returns {Array} Array of project objects
 */
export const generateProjects = () => {
  return Array.from({ length: 12 }).map((_, index) => {
    const id = index + 1
    const projectImages = generateProjectImages(id)

    return {
      id,
      title: `Project ${PROJECT_NAMES[index]}`,
      category: CATEGORIES[index],
      description: `A premium mobile application designed for the ${CATEGORIES[index].toLowerCase()} sector. Features intuitive UX and robust performance.`,
      image: projectImages[0].src,
      images: projectImages,
      mockups: {
        iphone: projectImages[0].src,
        android: projectImages[1].src,
        feature: projectImages[2].src
      },
      // Project detail metadata
      subtitle: `${CATEGORIES[index]} & Productivity`,
      rating: (4.5 + Math.random() * 0.5).toFixed(1),
      ratingCount: `${Math.floor(Math.random() * 20 + 5)}K`,
      age: "4+",
      rank: `#${Math.floor(Math.random() * 10 + 1)}`,
      rankCategory: CATEGORIES[index],
      developer: "Quang Linh",
      size: `${Math.floor(Math.random() * 50 + 30)}.${Math.floor(Math.random() * 10)} MB`,
      version: `${Math.floor(Math.random() * 3 + 1)}.${Math.floor(Math.random() * 5)}.${Math.floor(Math.random() * 10)}`,
      updated: `${Math.floor(Math.random() * 7 + 1)}d ago`,
      language: "English",
      previews: projectImages.map(img => img.src)
    }
  })
}

/**
 * Get single project by ID
 * @param {number|string} id - Project ID
 * @returns {Object|null} Project object or null
 */
export const getProjectById = (id) => {
  const projects = generateProjects()
  return projects.find(project => project.id === parseInt(id)) || null
}

/**
 * Get projects by category
 * @param {string} category - Category name
 * @returns {Array} Array of projects in category
 */
export const getProjectsByCategory = (category) => {
  const projects = generateProjects()
  return projects.filter(project => project.category === category)
}

/**
 * Generate detailed description for a project
 * @param {Object} project - Project object
 * @returns {string} Formatted description
 */
export const generateProjectDescription = (project) => {
  return `${project.title} is the ultimate ${project.category.toLowerCase()} application designed to help you achieve your goals. With AI-powered insights, real-time tracking, and intuitive interface, managing your ${project.category.toLowerCase()} needs has never been easier.

Key Features:
• Smart Management: Advanced features tailored for ${project.category.toLowerCase()}.
• Real-time Sync: Keep your data updated across all devices.
• Secure & Private: Bank-level encryption for all your information.`
}

/**
 * Generate app icon placeholder URL
 * @param {Object} project - Project object
 * @returns {string} Placeholder icon URL
 */
export const generateAppIcon = (project) => {
  // Generate color based on category index
  const colors = ['10b981', 'f59e0b', '3b82f6', 'ef4444', '8b5cf6', '06b6d4', 'ec4899', '14b8a6']
  const colorIndex = CATEGORIES.indexOf(project.category) % colors.length
  const initials = project.title.split(' ').map(word => word[0]).join('').slice(0, 2)

  return `https://placehold.co/200x200/${colors[colorIndex]}/ffffff?text=${initials}`
}
