import React, { useState, useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import Button from './Button'
import Modal from './Modal'

const QRCodeGenerator = ({
    url,
    title = 'QR Code',
    size = 200,
    showModal = false,
    onCloseModal,
    backgroundColor = '#ffffff',
    foregroundColor = '#000000'
}) => {
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState('')
    const canvasRef = useRef(null)

    useEffect(() => {
        if (url) {
            generateQRCode()
        }
    }, [url, size, backgroundColor, foregroundColor])

    const generateQRCode = async () => {
        if (!url) {
            setError('URL is required')
            return
        }

        setIsGenerating(true)
        setError('')

        try {
            // Generate QR code as data URL
            const qrCodeUrl = await QRCode.toDataURL(url, {
                width: size,
                margin: 2,
                color: {
                    dark: foregroundColor,
                    light: backgroundColor
                },
                errorCorrectionLevel: 'M'
            })

            setQrCodeDataUrl(qrCodeUrl)
        } catch (err) {
            console.error('Error generating QR code:', err)
            setError('Failed to generate QR code')
        } finally {
            setIsGenerating(false)
        }
    }

    const downloadQRCode = () => {
        if (!qrCodeDataUrl) return

        const link = document.createElement('a')
        link.download = `qr-code-${title.toLowerCase().replace(/\s+/g, '-')}.png`
        link.href = qrCodeDataUrl
        link.click()
    }

    const copyToClipboard = async () => {
        try {
            // Convert data URL to blob
            const response = await fetch(qrCodeDataUrl)
            const blob = await response.blob()

            // Copy to clipboard
            await navigator.clipboard.write([
                new ClipboardItem({
                    'image/png': blob
                })
            ])

            alert('QR code copied to clipboard!')
        } catch (err) {
            console.error('Failed to copy QR code:', err)
            // Fallback: copy the URL instead
            try {
                await navigator.clipboard.writeText(url)
                alert('URL copied to clipboard!')
            } catch (fallbackErr) {
                console.error('Failed to copy URL:', fallbackErr)
                alert('Failed to copy to clipboard')
            }
        }
    }

    const QRCodeContent = () => (
        <div className="text-center">
            {isGenerating ? (
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="text-gray-600">Generating QR code...</p>
                </div>
            ) : error ? (
                <div className="text-red-600">
                    <p>{error}</p>
                    <Button onClick={generateQRCode} className="mt-4">
                        Try Again
                    </Button>
                </div>
            ) : qrCodeDataUrl ? (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            {title}
                        </h3>
                        <div className="inline-block p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                            <img
                                src={qrCodeDataUrl}
                                alt={`QR code for ${title}`}
                                className="max-w-full h-auto"
                                style={{ width: size, height: size }}
                            />
                        </div>
                    </div>

                    <div className="text-sm text-gray-600 max-w-md mx-auto">
                        <p className="mb-2">Scan this QR code to visit:</p>
                        <p className="break-all bg-gray-50 p-2 rounded text-xs">
                            {url}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                            onClick={downloadQRCode}
                            variant="primary"
                        >
                            Download PNG
                        </Button>
                        <Button
                            onClick={copyToClipboard}
                            variant="outline"
                        >
                            Copy to Clipboard
                        </Button>
                    </div>
                </div>
            ) : null}
        </div>
    )

    if (showModal) {
        return (
            <Modal
                isOpen={showModal}
                onClose={onCloseModal}
                title="QR Code Generator"
                size="medium"
            >
                <QRCodeContent />
            </Modal>
        )
    }

    return <QRCodeContent />
}

export default QRCodeGenerator