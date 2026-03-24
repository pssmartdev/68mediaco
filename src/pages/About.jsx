import React from 'react'
import { ABOUT_CONTENT } from '../data/constants'

import './About.css'

const About = () => {
    return (
        <div className="section container about-page">
            <h1 className="about-title">{ABOUT_CONTENT.title}</h1>
            <div className="about-content">
                <p className="about-intro">
                    {ABOUT_CONTENT.intro}
                </p>

                <h2 className="about-section-title">{ABOUT_CONTENT.experiencesSectionTitle}</h2>
                <div className="experience-timeline">
                    {ABOUT_CONTENT.experiences.map((exp, index) => (
                        <div key={index} className="experience-item">
                            <h3 className="experience-title">{exp.title}</h3>
                            <p className="experience-company">
                                {exp.company} • {exp.period}
                            </p>
                            <p className="experience-description">
                                {exp.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default About
