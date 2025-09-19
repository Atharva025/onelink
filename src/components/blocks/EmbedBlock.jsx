import React from 'react'
import ReactPlayer from 'react-player'
import { createSafeIframe, isTrustedDomain } from '../../utils/iframeUtils'

const EmbedBlock = ({
    url,
    title,
    type = 'auto',
    isVisible = true
}) => {
    if (!isVisible || !url) return null

    // Check if this URL can be played by ReactPlayer
    const isReactPlayerSupported = ReactPlayer.canPlay(url)

    if (isReactPlayerSupported) {
        // Handle as ReactPlayer media (YouTube, Spotify, etc.)
        return (
            <div className="w-full mb-6">
                {title && (
                    <h3 className="text-lg font-display font-semibold text-white mb-4">
                        {title}
                    </h3>
                )}

                <div className="relative bg-metal-900 border border-metal-700 rounded-md overflow-hidden">
                    <div className="aspect-video">
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
                <div className="w-full mb-6">
                    {title && (
                        <h3 className="text-lg font-display font-semibold text-white mb-4">
                            {title}
                        </h3>
                    )}
                    <div className="bg-red-900/20 border border-red-700 rounded-md p-6 text-center">
                        <p className="text-red-400 font-sans">
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
                <div className="w-full mb-6">
                    {title && (
                        <h3 className="text-lg font-display font-semibold text-white mb-4">
                            {title}
                        </h3>
                    )}
                    <div className="bg-metal-800 border border-metal-700 rounded-md p-6 text-center">
                        <p className="text-gray-300 font-sans">
                            Unable to create safe embed for this URL.
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-glow-cyan hover:text-glow-cyan-dark underline ml-1 transition-colors duration-300"
                            >
                                Open in new tab
                            </a>
                        </p>
                    </div>
                </div>
            )
        }

        return (
            <div className="w-full mb-6">
                {title && (
                    <h3 className="text-lg font-display font-semibold text-white mb-4">
                        {title}
                    </h3>
                )}

                <div className="relative bg-metal-800 border border-metal-700 rounded-md overflow-hidden">
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