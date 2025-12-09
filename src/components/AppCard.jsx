import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './AppCard.css'

const AppCard = ({ id, title, category, images, description }) => {
    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    const prevSlide = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    return (
        <div className="app-card-wrapper">
            <Link to={`/project/${id}`} className="app-card">
                <div className="card-image-slider">
                    <div
                        className="slider-track"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {images && images.map((item, index) => (
                            <div key={index} className="slide">
                                {/* Support both string URLs (legacy) and objects with styles */}
                                {typeof item === 'string' ? (
                                    <img src={item} alt={`${title} slide ${index + 1}`} />
                                ) : (
                                    <img
                                        src={item.src}
                                        alt={`${title} slide ${index + 1}`}
                                        style={item.style}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button className="slider-arrow prev" onClick={prevSlide} aria-label="Previous">
                        <FiChevronLeft />
                    </button>
                    <button className="slider-arrow next" onClick={nextSlide} aria-label="Next">
                        <FiChevronRight />
                    </button>
                </div>

                <div className="card-content">
                    <div className="card-tags">
                        <span className="tag">{category}</span>
                    </div>
                    <h3 className="card-title">{title}</h3>
                    <p className="card-desc">{description}</p>

                    <div className="card-footer">
                        <span className="view-btn">
                            View Details <FiArrowRight />
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default AppCard
