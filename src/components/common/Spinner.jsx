import React from 'react'

const Spinner = ({ size = 'medium', color = 'verdigris', showLabel = false }) => {
    const sizeClasses = {
        small: 'w-4 h-4',
        medium: 'w-8 h-8',
        large: 'w-12 h-12',
        xl: 'w-16 h-16'
    }

    const colorClasses = {
        verdigris: 'border-verdigris',
        ink: 'border-ink',
        charcoal: 'border-charcoal',
        sienna: 'border-sienna',
        parchment: 'border-parchment'
    }

    return (
        <div className="flex flex-col justify-center items-center space-y-2">
            <div className="relative">
                {/* Outer decorative square */}
                <div className={`${sizeClasses[size]} border-2 border-ink opacity-20 absolute inset-0 rotate-45`}></div>

                {/* Main spinner */}
                <div
                    className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-t-transparent animate-spin relative z-10`}
                    role="status"
                    aria-label="Loading"
                    style={{ borderRadius: '0' }} // Square spinner to match brutalist theme
                >
                    <span className="sr-only">Loading...</span>
                </div>

                {/* Inner accent dot */}
                <div className={`absolute inset-0 flex items-center justify-center z-20`}>
                    <div className={`w-1 h-1 bg-${color} animate-pulse`}></div>
                </div>
            </div>

            {showLabel && (
                <p className="font-mono text-ink text-sm animate-pulse">Loading...</p>
            )}
        </div>
    )
}

export default Spinner