import React, { useState } from 'react'
import Modal from '../common/Modal'

const GalleryBlock = ({
    images = [],
    title,
    isVisible = true
}) => {
    const [selectedImage, setSelectedImage] = useState(null)

    if (!isVisible || !images.length) return null

    const openLightbox = (image, index) => {
        setSelectedImage({ ...image, index })
    }

    const closeLightbox = () => {
        setSelectedImage(null)
    }

    const navigateImage = (direction) => {
        if (!selectedImage) return

        const currentIndex = selectedImage.index
        let newIndex

        if (direction === 'prev') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
        } else {
            newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
        }

        setSelectedImage({ ...images[newIndex], index: newIndex })
    }

    return (
        <div className="w-full mb-6">
            {title && (
                <h3 className="text-lg font-serif font-semibold text-charcoal mb-4">
                    {title}
                </h3>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="aspect-square bg-ink bg-opacity-10 border border-ink shadow-sharp-sm overflow-hidden cursor-pointer hover:translate-x-px hover:translate-y-px hover:shadow-none transition-all duration-150 ease-mechanical"
                        onClick={() => openLightbox(image, index)}
                    >
                        <img
                            src={image.url}
                            alt={image.alt || `Gallery image ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.parentElement.style.display = 'none'
                            }}
                        />
                    </div>
                ))}
            </div>

            {selectedImage && (
                <Modal
                    isOpen={true}
                    onClose={closeLightbox}
                    size="large"
                    showCloseButton={false}
                >
                    <div className="relative">
                        <img
                            src={selectedImage.url}
                            alt={selectedImage.alt || `Gallery image ${selectedImage.index + 1}`}
                            className="w-full h-auto max-h-screen object-contain"
                        />

                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={() => navigateImage('prev')}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-metal-800/90 text-white p-2 border border-metal-700 rounded-md hover:bg-metal-700 hover:border-glow-cyan/50 transition-colors"
                                    aria-label="Previous image"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <button
                                    onClick={() => navigateImage('next')}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-metal-800/90 text-white p-2 border border-metal-700 rounded-md hover:bg-metal-700 hover:border-glow-cyan/50 transition-colors"
                                    aria-label="Next image"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}

                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 bg-metal-800/90 text-white p-2 border border-metal-700 rounded-md hover:bg-metal-700 hover:border-glow-cyan/50 transition-colors"
                            aria-label="Close lightbox"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {selectedImage.caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-metal-800/90 text-white p-4 border-t border-metal-700">
                                <p className="text-center font-sans">{selectedImage.caption}</p>
                            </div>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default GalleryBlock