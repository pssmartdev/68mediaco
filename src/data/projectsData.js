import { generateMockupImages } from '../utils/mockups'

const CATEGORIES = [
    'Finance', 'Health', 'Social', 'E-Commerce', 'Utility',
    'Education', 'Game', 'Productivity', 'Travel', 'Lifestyle', 'Music', 'News',
]

const ICON_COLORS = ['10b981', 'f59e0b', '3b82f6', 'ef4444', '8b5cf6', '06b6d4', 'ec4899', '14b8a6']

// Generate images for a project — always use SVG mockups
export const getProjectImages = (project) => {
    return generateMockupImages(project).map(src => ({ src, style: {} }))
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
