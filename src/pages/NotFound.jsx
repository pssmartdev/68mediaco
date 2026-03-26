import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { COMPANY_INFO } from '../data/constants'
import './NotFound.css'

const NotFound = () => (
    <div className="not-found-page">
        <Helmet>
            <title>404 Not Found | {COMPANY_INFO.name}</title>
        </Helmet>
        <div className="not-found-content">
            <div className="not-found-code">404</div>
            <h1>Page Not Found</h1>
            <p>The page you're looking for doesn't exist or has been moved.</p>
            <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
    </div>
)

export default NotFound
