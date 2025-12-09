import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import './Header.css'

const Header = () => {
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link'

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const closeMenu = () => setIsMenuOpen(false)

    return (
        <header className="header">
            <div className="container header-container">
                <Link to="/" className="logo" onClick={closeMenu}>
                    Dev<span>Portfolio</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="nav-links">
                    <Link to="/" className={isActive('/')}>Home</Link>
                    <Link to="/about" className={isActive('/about')}>About</Link>
                    <Link to="/contact" className={isActive('/contact')}>Contact</Link>
                    <a href="#projects" className="btn btn-primary nav-cta-button">
                        View Work
                    </a>
                </nav>

                {/* Mobile Menu Button - Z-index fixed via CSS */}
                <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Menu">
                    {isMenuOpen ? <FiX /> : <FiMenu />}
                </button>

                {/* Mobile Nav Overlay */}
                <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
                    <nav className="mobile-nav-links">
                        <Link to="/" className={isActive('/')} onClick={closeMenu}>Home</Link>
                        <Link to="/about" className={isActive('/about')} onClick={closeMenu}>About</Link>
                        <Link to="/contact" className={isActive('/contact')} onClick={closeMenu}>Contact</Link>
                        <a href="#projects" className="btn btn-primary" onClick={closeMenu}>
                            View Work
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header
