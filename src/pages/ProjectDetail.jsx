import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FiChevronLeft, FiShare, FiStar } from 'react-icons/fi'
import { fetchProject } from '../services/api'
import { getProjectImages, getAppIcon } from '../data/projectsData'
import { WHATS_NEW_BY_CATEGORY, COMPANY_INFO } from '../data/constants'
import './ProjectDetail.css'

const ProjectDetail = () => {
    const { id } = useParams()
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        fetchProject(id)
            .then(data => setProject(data))
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) {
        return (
            <div className="project-detail-page">
                <div className="container app-store-container">
                    <div className="detail-nav">
                        <Link to="/" className="back-link"><FiChevronLeft /> Back</Link>
                    </div>
                    <div className="loading-state">Loading...</div>
                </div>
            </div>
        )
    }

    if (notFound || !project) {
        return (
            <div className="project-detail-page">
                <div className="container app-store-container">
                    <div className="detail-nav">
                        <Link to="/" className="back-link"><FiChevronLeft /> Back</Link>
                    </div>
                    <h1>Project not found</h1>
                </div>
            </div>
        )
    }

    const images = getProjectImages(project)
    const icon = getAppIcon(project)

    const whatsNew = WHATS_NEW_BY_CATEGORY[project.category] || WHATS_NEW_BY_CATEGORY['Utility']
    const pageDesc = `${project.title} — ${project.subtitle}. ${project.description.slice(0, 120)}...`

    return (
        <div className="project-detail-page">
            <Helmet>
                <title>{project.title} | {COMPANY_INFO.name}</title>
                <meta name="description" content={pageDesc} />
                <meta property="og:title" content={`${project.title} | ${COMPANY_INFO.name}`} />
                <meta property="og:description" content={pageDesc} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://68mediaco.com/project/${project.id}`} />
            </Helmet>
            <div className="container app-store-container">

                {/* Navigation */}
                <div className="detail-nav">
                    <Link to="/" className="back-link"><FiChevronLeft /> Back</Link>
                </div>

                {/* App Header */}
                <header className="app-header">
                    <div className="app-icon">
                        <img src={icon} alt={project.title} />
                    </div>
                    <div className="app-info">
                        <h1 className="app-title">{project.title}</h1>
                        <p className="app-subtitle">{project.subtitle}</p>
                        <div className="app-actions">
                            <button className="get-btn">Get</button>
                            <button className="icon-btn"><FiShare /></button>
                        </div>
                    </div>
                </header>

                {/* Stats Row */}
                <div className="stats-scroll">
                    <div className="stats-row">
                        <div className="stat-item border-right">
                            <div className="stat-top">{project.rating_count} RATINGS</div>
                            <div className="stat-value">{project.rating} <FiStar className="star-icon" /></div>
                        </div>
                        <div className="stat-item border-right">
                            <div className="stat-top">AGE</div>
                            <div className="stat-value">{project.age}</div>
                            <div className="stat-bottom">Years Old</div>
                        </div>
                        <div className="stat-item border-right">
                            <div className="stat-top">CHART</div>
                            <div className="stat-value">{project.rank}</div>
                            <div className="stat-bottom">{project.rank_category}</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-top">DEVELOPER</div>
                            <div className="stat-value icon-stat">{project.developer}</div>
                        </div>
                    </div>
                </div>

                <div className="separator"></div>

                {/* What's New */}
                <section className="detail-section">
                    <div className="section-head">
                        <h2>What's New</h2>
                        <span className="version-info">Version {project.version} • {project.updated}</span>
                    </div>
                    <div className="section-content">
                        <p>
                            {whatsNew.map((item, index) => (
                                <React.Fragment key={index}>
                                    - {item}
                                    {index < whatsNew.length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </p>
                    </div>
                </section>

                <div className="separator"></div>

                {/* Preview */}
                <section className="detail-section">
                    <h2>Preview</h2>
                    <div className="preview-scroller">
                        {images.slice(0, 3).map((img, i) => (
                            <div key={i} className="screenshot s-portrait">
                                <img src={img.src} alt={`Preview ${i + 1}`} className="screenshot-image" style={img.style} />
                            </div>
                        ))}
                        {images[3] && (
                            <div className="screenshot s-portrait">
                                <img src={images[3].src} alt={`Preview 4`} className="screenshot-image" style={images[3].style} />
                            </div>
                        )}
                    </div>
                </section>

                <div className="separator"></div>

                {/* Description */}
                <section className="detail-section">
                    <div className="description-text">
                        {project.description.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                </section>

                <div className="separator"></div>

                {/* Information Grid */}
                <section className="detail-section">
                    <h2>Information</h2>
                    <div className="info-list">
                        <div className="info-row">
                            <span className="info-label">Provider</span>
                            <span className="info-value">{project.developer}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Size</span>
                            <span className="info-value">{project.size}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Category</span>
                            <span className="info-value">{project.category}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Compatibility</span>
                            <span className="info-value">iPhone, iPad, Android</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Languages</span>
                            <span className="info-value">{project.language}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Age Rating</span>
                            <span className="info-value">{project.age}</span>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}

export default ProjectDetail
