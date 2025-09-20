import React from 'react'
import ReactPlayer from 'react-player'
import { createSafeIframe, isTrustedDomain } from '../../utils/iframeUtils'

const EmbedBlock = ({
    url,
    title,
    type = 'auto',
    isVisible = true,
    theme = 'default',
    themeClasses = {}
}) => {
    if (!isVisible || !url) return null

    // Check if this URL can be played by ReactPlayer
    const isReactPlayerSupported = ReactPlayer.canPlay(url)

    if (isReactPlayerSupported) {
        // Handle as ReactPlayer media (YouTube, Spotify, etc.)
        return (
            <div className="w-full mb-4 sm:mb-6 mx-2 sm:mx-0">
                {title && (
                    <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${themeClasses.text?.primary || 'text-charcoal'} ${themeClasses.text?.heading || ''}`}>
                        {title}
                    </h3>
                )}

                <div className={`relative ${themeClasses.card?.bg || 'bg-parchment'} ${themeClasses.card?.border || 'border border-ink'} rounded-md overflow-hidden`}>
                    <div className="aspect-video w-full">
                        <ReactPlayer
                            url={url}
                            width="100%"
                            height="100%"
                            controls={true}
                            light={false}
                            pip={true}
                            stopOnUnmount={false}
                            config={{
                                youtube: {
                                    playerVars: {
                                        showinfo: 1,
                                        origin: window.location.origin
                                    }
                                },
                                spotify: {
                                    options: {
                                        width: '100%',
                                        height: '100%'
                                    }
                                }
                            }}
                            onError={(error) => {
                                console.error('Player error:', error)
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    } else {
        // Handle as iframe embed (for trusted domains)
        if (!isTrustedDomain(url)) {
            return (
                <div className="w-full mb-4 sm:mb-6 mx-2 sm:mx-0">
                    {title && (
                        <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${themeClasses.text?.primary || 'text-charcoal'} ${themeClasses.text?.heading || ''}`}>
                            {title}
                        </h3>
                    )}
                    <div className={`${themeClasses.card?.bg || 'bg-parchment'} ${themeClasses.card?.border || 'border border-ink'} rounded-md p-4 sm:p-6 text-center`}>
                        <p className={`${themeClasses.text?.secondary || 'text-ink'} font-mono text-sm sm:text-base`}>
                            This embed is from an untrusted domain and cannot be displayed for security reasons.
                        </p>
                    </div>
                </div>
            )
        }

        // Create safe iframe from URL
        const safeIframe = createSafeIframe(url, {
            width: '100%',
            height: '400',
            title: title || 'Embedded content'
        })

        if (!safeIframe) {
            return (
                <div className="w-full mb-4 sm:mb-6 mx-2 sm:mx-0">
                    {title && (
                        <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${themeClasses.text?.primary || 'text-charcoal'} ${themeClasses.text?.heading || ''}`}>
                            {title}
                        </h3>
                    )}
                    <div className={`${themeClasses.card?.bg || 'bg-parchment'} ${themeClasses.card?.border || 'border border-ink'} rounded-md p-4 sm:p-6 text-center`}>
                        <p className={`${themeClasses.text?.secondary || 'text-ink'} font-mono text-sm sm:text-base`}>
                            Unable to create safe embed for this URL.
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${themeClasses.text?.accent || 'text-verdigris'} hover:opacity-80 underline ml-1 transition-colors duration-300`}
                            >
                                Open in new tab
                            </a>
                        </p>
                    </div>
                </div>
            )
        }

        return (
            <div className="w-full mb-4 sm:mb-6 mx-2 sm:mx-0">
                {title && (
                    <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${themeClasses.text?.primary || 'text-charcoal'} ${themeClasses.text?.heading || ''}`}>
                        {title}
                    </h3>
                )}

                <div className={`relative ${themeClasses.card?.bg || 'bg-parchment'} ${themeClasses.card?.border || 'border border-ink'} rounded-md overflow-hidden`}>
                    <div
                        dangerouslySetInnerHTML={{ __html: safeIframe }}
                        className="w-full"
                    />
                </div>
            </div>
        )
    }
}

export default EmbedBlock