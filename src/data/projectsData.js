import beautyApp1 from '../assets/beauty_app_1.png'
import beautyApp2 from '../assets/beauty_app_2.png'
import previewP1 from '../assets/preview_p1.png'
import previewP2 from '../assets/preview_p2.png'
import previewP3 from '../assets/preview_p3.png'

const BASE_IMAGES = [beautyApp1, beautyApp2, previewP1, previewP2, previewP3]

const CATEGORIES = [
    'Finance', 'Health', 'Social', 'E-Commerce', 'Utility',
    'Education', 'Game', 'Productivity', 'Travel', 'Lifestyle', 'Music', 'News',
]

const ICON_COLORS = ['10b981', 'f59e0b', '3b82f6', 'ef4444', '8b5cf6', '06b6d4', 'ec4899', '14b8a6']

// Generate images for a project — use API images if available, fallback to local assets
export const getProjectImages = (project) => {
    if (project.images && project.images.length > 0) {
        return project.images.map(url => ({ src: url, style: {} }))
    }
    // Fallback: local assets with hue rotation
    return Array.from({ length: 4 }).map((_, i) => {
        const src = BASE_IMAGES[(project.id + i) % BASE_IMAGES.length]
        const hue = (project.id * 30 + i * 15) % 360
        return { src, style: { filter: `hue-rotate(${hue}deg)` } }
    })
}

// Generate app icon URL based on category and title
export const getAppIcon = (project) => {
    const colorIndex = CATEGORIES.indexOf(project.category) % ICON_COLORS.length
    const initials = project.title.split(' ').map(w => w[0]).join('').slice(0, 2)
    return `https://placehold.co/200x200/${ICON_COLORS[colorIndex]}/ffffff?text=${initials}`
}

// Generate full description for ProjectDetail page
export const generateProjectDescription = (project) => {
    return `${project.title} is the ultimate ${project.category.toLowerCase()} application designed to help you achieve your goals. With AI-powered insights, real-time tracking, and an intuitive interface, managing your ${project.category.toLowerCase()} needs has never been easier.

Key Features:
• Smart Management: Advanced features tailored for ${project.category.toLowerCase()}.
• Real-time Sync: Keep your data updated across all devices.
• Secure & Private: Bank-level encryption for all your information.`
}
