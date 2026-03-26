import React, { useState, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import AppCard from '../components/AppCard'
import SkeletonCard from '../components/SkeletonCard'
import { fetchProjects } from '../services/api'
import { getProjectImages } from '../data/projectsData'
import { HERO_CONTENT, COMPANY_INFO } from '../data/constants'
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

    const projectsWithImages = useMemo(
        () => projects.map(p => ({ ...p, images: getProjectImages(p) })),
        [projects]
    )

    const siteDesc = `${COMPANY_INFO.name} — Premium mobile app development studio. Discover our featured solutions on iOS, Android, and the web.`

    return (
        <div className="home-page">
            <Helmet>
                <title>{COMPANY_INFO.name} | Premium Mobile Applications</title>
                <meta name="description" content={siteDesc} />
                <meta property="og:title" content={`${COMPANY_INFO.name} | Premium Mobile Applications`} />
                <meta property="og:description" content={siteDesc} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://68mediaco.com/" />
            </Helmet>
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
                        <div className="grid project-grid">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
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
