import React from 'react'

const SpotlightBlock = ({
    title,
    description,
    image,
    url,
    isVisible = true
}) => {
    if (!isVisible) return null

    const handleClick = () => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer')
        }
    }

    return (
        <div className="w-full mb-6">
            <div
                className={`bg-parchment border border-ink shadow-sharp overflow-hidden ${url ? 'cursor-pointer hover:translate-x-px hover:translate-y-px hover:shadow-none active:shadow-sharp-inset active:translate-x-0 active:translate-y-0 transition-all duration-150 ease-mechanical' : ''
                    }`}
                onClick={handleClick}
            >
                {image && (
                    <div className="aspect-video bg-ink bg-opacity-10">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.parentElement.style.display = 'none'
                            }}
                        />
                    </div>
                )}

                <div className="p-6">
                    <h2 className="text-xl font-serif font-bold text-charcoal mb-2">
                        {title}
                    </h2>

                    {description && (
                        <p className="font-mono text-ink leading-relaxed">
                            {description}
                        </p>
                    )}

                    {url && (
                        <div className="mt-4 flex items-center text-verdigris text-sm font-mono font-medium">
                            <span>Learn more</span>
                            <svg
                                className="w-4 h-4 ml-1"
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
                    )}
                </div>
            </div>
        </div>
    )
}

export default SpotlightBlock