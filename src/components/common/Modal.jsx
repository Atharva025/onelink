import React, { useEffect } from 'react'
import Button from './Button'

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'medium',
    showCloseButton = true
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const sizeClasses = {
        small: 'max-w-md',
        medium: 'max-w-2xl',
        large: 'max-w-4xl',
        full: 'max-w-7xl'
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div
            className="fixed inset-0 bg-charcoal bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div className={`bg-parchment border-2 border-ink shadow-sharp w-full ${sizeClasses[size]} max-h-screen overflow-y-auto relative transform transition-all duration-150 ease-mechanical hover:shadow-sharp-sm`}>
                {/* Background accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-b-[30px] border-b-verdigris opacity-10"></div>
                
                {(title || showCloseButton) && (
                    <div className="flex justify-between items-center p-8 border-b-2 border-ink relative">
                        {title && (
                            <h2 className="text-2xl font-serif font-bold text-charcoal relative">
                                {title}
                                <div className="absolute -bottom-1 left-0 w-12 h-1 bg-verdigris"></div>
                            </h2>
                        )}
                        {showCloseButton && (
                            <Button
                                variant="outline"
                                size="small"
                                onClick={onClose}
                                aria-label="Close modal"
                                className="w-10 h-10 p-0 flex items-center justify-center transition-all duration-150 ease-mechanical hover:scale-110 hover:rotate-90"
                            >
                                <span className="text-lg">×</span>
                            </Button>
                        )}
                    </div>
                )}

                <div className="p-8 font-mono text-charcoal relative">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal