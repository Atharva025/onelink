import React from 'react'

const LinkBlock = ({
    title,
    url,
    description,
    icon,
    isVisible = true,
    theme = 'default',
    themeClasses = {}
}) => {
    if (!isVisible) return null

    const handleClick = () => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    // Use theme-aware classes or fallback to default
    const linkClasses = themeClasses.link || 'bg-parchment border border-charcoal shadow-sharp-sm hover:translate-x-px hover:translate-y-px hover:shadow-none active:shadow-sharp-inset active:translate-x-0 active:translate-y-0 transition-all duration-150 ease-mechanical'
    const textPrimary = themeClasses.text?.primary || 'text-charcoal font-mono'
    const textSecondary = themeClasses.text?.secondary || 'text-ink font-mono'

    return (
        <div className="w-full mb-4">
            <button
                onClick={handleClick}
                className={`w-full p-4 ${linkClasses} text-left`}
            >
                <div className="flex items-center space-x-3">
                    {icon && (
                        <div className="flex-shrink-0">
                            <img
                                src={icon}
                                alt={`${title} icon`}
                                className="w-6 h-6 object-contain"
                                onError={(e) => {
                                    e.target.style.display = 'none'
                                }}
                            />
                        </div>
                    )}

                    <div className="flex-1 min-w-0">
                        <h3 className={`font-medium ${textPrimary} truncate`}>
                            {title}
                        </h3>
                        {description && (
                            <p className={`text-sm ${textSecondary} mt-1 line-clamp-2`}>
                                {description}
                            </p>
                        )}
                    </div>

                    <div className="flex-shrink-0">
                        <svg
                            className={`w-5 h-5 ${textSecondary}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                        </svg>
                    </div>
                </div>
            </button>
        </div>
    )
}

export default LinkBlock