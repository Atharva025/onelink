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
            className="fixed inset-0 bg-charcoal bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className={`bg-parchment border border-ink shadow-sharp w-full ${sizeClasses[size]} max-h-screen overflow-y-auto`}>
                {(title || showCloseButton) && (
                    <div className="flex justify-between items-center p-6 border-b border-ink">
                        {title && <h2 className="text-xl font-serif font-bold text-charcoal">{title}</h2>}
                        {showCloseButton && (
                            <Button
                                variant="outline"
                                size="small"
                                onClick={onClose}
                                aria-label="Close modal"
                                className="w-8 h-8 p-0 flex items-center justify-center"
                            >
                                ×
                            </Button>
                        )}
                    </div>
                )}

                <div className="p-6 font-mono text-charcoal">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal