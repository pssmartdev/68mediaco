import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiChevronLeft, FiShare, FiStar } from 'react-icons/fi'
import { getProjectById, generateProjectDescription, generateAppIcon } from '../data/projectsData'
import { WHATS_NEW_CONTENT } from '../data/constants'
import './ProjectDetail.css'

const ProjectDetail = () => {
    const { id } = useParams()

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // Get project data
    const project = getProjectById(id)

    // Handle project not found
    if (!project) {
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

    const description = generateProjectDescription(project)
    const icon = generateAppIcon(project)

    return (
        <div className="project-detail-page">
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
                            <div className="stat-top">{project.ratingCount} RATINGS</div>
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
                            <div className="stat-bottom">{project.rankCategory}</div>
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
                            {WHATS_NEW_CONTENT.items.map((item, index) => (
                                <React.Fragment key={index}>
                                    - {item}
                                    {index < WHATS_NEW_CONTENT.items.length - 1 && <br />}
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
                        <div className="screenshot s-portrait">
                            <img src={project.previews[0]} alt="Preview 1" className="screenshot-image" />
                        </div>
                        <div className="screenshot s-portrait">
                            <img src={project.previews[1]} alt="Preview 2" className="screenshot-image" />
                        </div>
                        <div className="screenshot s-portrait">
                            <img src={project.previews[2]} alt="Preview 3" className="screenshot-image" />
                        </div>
                        <div className="screenshot s-landscape">
                            {/* Live CSS Mockup for Landscape Dashboard */}
                            <div className="live-mockup">
                                <div className="mock-col-left">
                                    <div className="mock-balance">
                                        <div className="mock-balance-label">Total Balance</div>
                                        <div className="mock-balance-value">$12,450.85</div>
                                    </div>
                                    <div className="mock-chart-container">
                                        {/* CSS Gradient Chart */}
                                    </div>
                                </div>
                                <div className="mock-col-right">
                                    <div className="mock-text-row">
                                        <span className="mock-text-sm">Monthly Spending</span>
                                    </div>
                                    <div className="mock-bars">
                                        <div className="mock-bar"></div>
                                        <div className="mock-bar"></div>
                                        <div className="mock-bar active" style={{ height: '80%' }}></div>
                                        <div className="mock-bar mock-bar-custom"></div>
                                        <div className="mock-bar active" style={{ height: '60%' }}></div>
                                    </div>
                                    <div className="mock-text-row">
                                        <span className="mock-text-sm">Recents</span>
                                        <span className="mock-text-sm mock-text-primary">See All</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="separator"></div>

                {/* Description */}
                <section className="detail-section">
                    <div className="description-text">
                        {description.split('\n').map((line, i) => (
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
