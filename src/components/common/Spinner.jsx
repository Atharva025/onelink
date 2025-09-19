import React from 'react'

const Spinner = ({ size = 'medium', color = 'blue' }) => {
    const sizeClasses = {
        small: 'w-4 h-4',
        medium: 'w-8 h-8',
        large: 'w-12 h-12'
    }

    const colorClasses = {
        blue: 'border-blue-600',
        white: 'border-white',
        gray: 'border-gray-600'
    }

    return (
        <div className="flex justify-center items-center">
            <div
                className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-t-transparent rounded-full animate-spin`}
                role="status"
                aria-label="Loading"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner