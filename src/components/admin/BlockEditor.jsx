import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import Button from '../common/Button'
import { validateIframeInput, createSafeIframe } from '../../utils/iframeUtils'

const BlockEditor = ({ type, initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        url: '', // Single URL field for both media and iframe URLs
        description: '',
        icon: '',
        image: '',
        images: [],
        isVisible: true
    })

    const [mediaType, setMediaType] = useState('url') // 'url' or 'iframe'
    const [iframeInput, setIframeInput] = useState('') // Temporary input for iframe processing
    const [validation, setValidation] = useState({ error: null })
    const [previewIframe, setPreviewIframe] = useState('')

    useEffect(() => {
        if (initialData) {
            setFormData(initialData)

            // Determine media type based on stored URL
            if (initialData.url) {
                const isIframeUrl = !ReactPlayer.canPlay(initialData.url)
                setMediaType(isIframeUrl ? 'iframe' : 'url')
                setIframeInput(initialData.url)

                // Generate preview for iframe URLs
                if (isIframeUrl) {
                    const safeIframe = createSafeIframe(initialData.url)
                    setPreviewIframe(safeIframe || '')
                }
            }
        }
    }, [initialData])

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleMediaTypeChange = (type) => {
        setMediaType(type)
        setValidation({ error: null })
        setPreviewIframe('')

        if (type === 'url') {
            // Clear iframe input when switching to URL
            setIframeInput('')
        } else {
            // Clear URL when switching to iframe
            setFormData(prev => ({ ...prev, url: '' }))
        }
    }

    const handleIframeInputChange = (value) => {
        setIframeInput(value)

        const validationResult = validateIframeInput(value)
        setValidation(validationResult)

        if (validationResult.url) {
            setFormData(prev => ({ ...prev, url: validationResult.url }))
            const safeIframe = createSafeIframe(validationResult.url)
            setPreviewIframe(safeIframe || '')
        } else {
            setFormData(prev => ({ ...prev, url: '' }))
            setPreviewIframe('')
        }
    }

    const handleImageAdd = () => {
        const url = prompt('Enter image URL:')
        if (url) {
            const newImage = {
                url,
                alt: prompt('Enter image description (optional):') || '',
                caption: prompt('Enter image caption (optional):') || ''
            }
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, newImage]
            }))
        }
    }

    const handleImageRemove = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validate required fields
        if (mediaType === 'iframe' && !formData.url) {
            setValidation({ error: 'Please provide a valid iframe URL or embed code' })
            return
        }

        if (mediaType === 'url' && !formData.url) {
            setValidation({ error: 'Please provide a media URL' })
            return
        }

        onSave(formData)
    }

    const renderLinkFields = () => (
        <>
            <div>
                <label className="block text-sm font-medium mb-2">
                    Title *
                </label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">
                    URL *
                </label>
                <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => handleInputChange('url', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">
                    Description
                </label>
                <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">
                    Icon URL
                </label>
                <input
                    type="url"
                    value={formData.icon}
                    onChange={(e) => handleInputChange('icon', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </>
    )

    const renderSpotlightFields = () => (
        <>
            <div>
                <label className="block text-sm font-medium mb-2">
                    Title *
                </label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">
                    Description *
                </label>
                <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">
                    Image URL
                </label>
                <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">
                    Link URL
                </label>
                <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => handleInputChange('url', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </>
    )

    const renderGalleryFields = () => (
        <>
            <div>
                <label className="block text-sm font-medium mb-2">
                    Gallery Title
                </label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">
                    Images
                </label>
                <div className="space-y-3">
                    {formData.images.map((image, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                            <img
                                src={image.url}
                                alt={image.alt}
                                className="w-16 h-16 object-cover rounded"
                                onError={(e) => {
                                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="gray"><rect width="24" height="24"/></svg>'
                                }}
                            />
                            <div className="flex-1">
                                <p className="text-sm font-medium truncate">{image.alt || 'No description'}</p>
                                <p className="text-xs text-gray-500 truncate">{image.url}</p>
                            </div>
                            <Button
                                variant="danger"
                                size="small"
                                onClick={() => handleImageRemove(index)}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}

                    <Button
                        variant="outline"
                        onClick={handleImageAdd}
                    >
                        Add Image
                    </Button>
                </div>
            </div>
        </>
    )

    const renderEmbedFields = () => (
        <>
            <div>
                <label className="block text-sm font-medium mb-2">
                    Title
                </label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Optional title for this media"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">
                    Media Type
                </label>
                <div className="flex space-x-4 mb-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="url"
                            checked={mediaType === 'url'}
                            onChange={(e) => handleMediaTypeChange(e.target.value)}
                            className="mr-2"
                        />
                        <span className="text-sm">Media URL (YouTube, Spotify, etc.)</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="iframe"
                            checked={mediaType === 'iframe'}
                            onChange={(e) => handleMediaTypeChange(e.target.value)}
                            className="mr-2"
                        />
                        <span className="text-sm">Embed Code (Twitter, Maps, etc.)</span>
                    </label>
                </div>
            </div>

            {mediaType === 'url' ? (
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Media URL *
                    </label>
                    <input
                        type="url"
                        value={formData.url}
                        onChange={(e) => handleInputChange('url', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://youtube.com/watch?v=... or https://spotify.com/..."
                        required={mediaType === 'url'}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Supports YouTube, Spotify, SoundCloud, Vimeo, and many other platforms
                    </p>
                </div>
            ) : (
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Embed Code or URL *
                    </label>
                    <textarea
                        value={iframeInput}
                        onChange={(e) => handleIframeInputChange(e.target.value)}
                        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${validation.error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                            }`}
                        rows={4}
                        placeholder='Paste embed code or URL:
<iframe src="https://example.com" ...></iframe>
or: https://twitter.com/user/status/123...'
                        required={mediaType === 'iframe'}
                    />

                    {validation.error && (
                        <p className="text-sm text-red-600 mt-1">
                            ⚠️ {validation.error}
                        </p>
                    )}

                    {formData.url && !validation.error && (
                        <p className="text-sm text-green-600 mt-1">
                            ✅ Valid URL: {formData.url}
                        </p>
                    )}

                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded">
                        <p className="text-xs text-blue-800">
                            ℹ️ <strong>Security:</strong> We extract and store only the source URL from embed codes. Only trusted domains are allowed.
                        </p>
                    </div>
                </div>
            )}

            {mediaType === 'iframe' && previewIframe && !validation.error && (
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Preview
                    </label>
                    <div className="border border-gray-200 rounded p-4 bg-gray-50">
                        <div
                            dangerouslySetInnerHTML={{ __html: previewIframe }}
                            className="max-w-full overflow-hidden"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        This is how your embed will appear on your public page
                    </p>
                </div>
            )}
        </>
    )

    const renderFieldsByType = () => {
        switch (type) {
            case 'link':
                return renderLinkFields()
            case 'spotlight':
                return renderSpotlightFields()
            case 'gallery':
                return renderGalleryFields()
            case 'embed':
                return renderEmbedFields()
            default:
                return null
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {renderFieldsByType()}

            <div>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={formData.isVisible}
                        onChange={(e) => handleInputChange('isVisible', e.target.checked)}
                        className="mr-2"
                    />
                    <span className="text-sm font-medium">Visible on public page</span>
                </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={(mediaType === 'iframe' && !formData.url) || (mediaType === 'url' && !formData.url)}
                >
                    {initialData ? 'Update' : 'Create'}
                </Button>
            </div>
        </form>
    )
}

export default BlockEditor