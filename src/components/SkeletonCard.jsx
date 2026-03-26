import React from 'react'
import './SkeletonCard.css'

const SkeletonCard = () => (
    <div className="skeleton-card">
        <div className="skeleton-image shimmer" />
        <div className="skeleton-body">
            <div className="skeleton-tag shimmer" />
            <div className="skeleton-title shimmer" />
            <div className="skeleton-line shimmer" />
            <div className="skeleton-line short shimmer" />
        </div>
    </div>
)

export default SkeletonCard
