import React, { useState, useEffect } from 'react'
import AppCard from '../components/AppCard'
import { fetchProjects } from '../services/api'
import { getProjectImages } from '../data/projectsData'
import { HERO_CONTENT } from '../data/constants'
import './Home.css'

const Home = () => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetchProjects()
            .then(data => setProjects(data))
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, [])

    const projectsWithImages = projects.map(p => ({
        ...p,
        images: getProjectImages(p.id),
    }))

    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            {HERO_CONTENT.title} <span className="text-gradient">{HERO_CONTENT.titleHighlight}</span>
                        </h1>
                        <p className="hero-subtitle">
                            {HERO_CONTENT.subtitle}
                        </p>
                        <div className="hero-actions">
                            <a href="#projects" className="btn btn-primary">{HERO_CONTENT.primaryCTA}</a>
                            <a href="/contact" className="btn btn-outline">{HERO_CONTENT.secondaryCTA}</a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="projects" className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Featured Projects</h2>
                        <p className="section-desc">Selected works from our portfolio.</p>
                    </div>

                    {loading && (
                        <div className="loading-state">Loading projects...</div>
                    )}
                    {error && (
                        <div className="error-state">Failed to load projects. Please try again later.</div>
                    )}
                    {!loading && !error && (
                        <div className="grid project-grid">
                            {projectsWithImages.map(project => (
                                <AppCard key={project.id} {...project} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Home
