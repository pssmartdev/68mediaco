import React from 'react'
import { CONTACT_CONTENT } from '../data/constants'
import './Contact.css'

const Contact = () => {
    return (
        <div className="contact-page section">
            <div className="container">
                <div className="contact-wrapper">
                    <div className="contact-info">
                        <h2>{CONTACT_CONTENT.title}</h2>
                        <p>{CONTACT_CONTENT.subtitle}</p>

                        <div className="contact-methods">
                            {CONTACT_CONTENT.methods.map((method, index) => (
                                <div key={index} className="method">
                                    <h3>{method.label}</h3>
                                    <p>{method.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" placeholder="Your Name" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="your@email.com" />
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea rows="5" placeholder="Tell me about your project..."></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary submit-button">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact
