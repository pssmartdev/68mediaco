import React, { useState } from 'react'
import { CONTACT_CONTENT } from '../data/constants'
import { submitContact } from '../services/api'
import './Contact.css'

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState('idle') // idle | sending | success | error

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('sending')
        try {
            await submitContact(formData)
            setStatus('success')
            setFormData({ name: '', email: '', message: '' })
        } catch {
            setStatus('error')
        }
    }

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
                                    {method.href ? (
                                        <a href={method.href}>{method.value}</a>
                                    ) : (
                                        <p>{method.value}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                name="message"
                                rows="5"
                                placeholder="Tell us about your project..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary submit-button"
                            disabled={status === 'sending'}
                        >
                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                        </button>

                        {status === 'success' && (
                            <p className="form-feedback success">Message sent! We'll get back to you soon.</p>
                        )}
                        {status === 'error' && (
                            <p className="form-feedback error">Something went wrong. Please try again or email us directly.</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact
