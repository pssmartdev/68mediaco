import React from 'react'
import { FiMail, FiMapPin } from 'react-icons/fi'
import { COMPANY_INFO, NAV_ITEMS, SOCIAL_LINKS } from '../data/constants'
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3>{COMPANY_INFO.name}</h3>
                        <p>{COMPANY_INFO.tagline}</p>
                    </div>

                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            {NAV_ITEMS.map((item) => (
                                <li key={item.path}>
                                    <a href={item.path}>{item.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Contact</h4>
                        <ul>
                            <li>
                                <a href={SOCIAL_LINKS.email} className="footer-link-with-icon">
                                    <FiMail /> {COMPANY_INFO.email}
                                </a>
                            </li>
                            <li className="footer-link-with-icon footer-address">
                                <FiMapPin /> {COMPANY_INFO.location}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="copyright">
                    &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer
