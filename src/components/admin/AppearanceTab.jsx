import React, { useState } from 'react'
import ColorPicker from '../common/ColorPicker'
import Button from '../common/Button'

const AppearanceTab = ({ appearance = {}, onAppearanceChange }) => {
    const [formData, setFormData] = useState({
        theme: 'light',
        primaryColor: '#3B82F6',
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937',
        font: 'inter',
        profileImage: '',
        bio: '',
        slug: '',
        fullName: '',
        statusMessage: '',
        ...appearance
    })

    const themes = [
        { id: 'light', name: 'Light', preview: 'bg-white text-gray-900' },
        { id: 'dark', name: 'Dark', preview: 'bg-gray-900 text-white' },
        { id: 'gradient', name: 'Gradient', preview: 'bg-gradient-to-br from-purple-400 to-pink-400 text-white' }
    ]

    const fonts = [
        { id: 'inter', name: 'Inter', className: 'font-sans' },
        { id: 'roboto', name: 'Roboto', className: 'font-sans' },
        { id: 'poppins', name: 'Poppins', className: 'font-sans' },
        { id: 'playfair', name: 'Playfair Display', className: 'font-serif' },
        { id: 'mono', name: 'JetBrains Mono', className: 'font-mono' }
    ]

    const handleInputChange = (field, value) => {
        let processedValue = value;

        // Special handling for slug field
        if (field === 'slug') {
            // Convert to lowercase and remove invalid characters
            processedValue = value.toLowerCase().replace(/[^a-z0-9_-]/g, '');
        }

        const updatedData = {
            ...formData,
            [field]: processedValue
        }
        setFormData(updatedData)
        onAppearanceChange(updatedData)
    }

    const validateSlug = (slug) => {
        if (!slug) return 'Profile slug is required'
        if (slug.length <= 3) return 'Profile slug must be more than 3 characters'
        if (!/^[a-z0-9_-]+$/.test(slug)) return 'Profile slug can only contain lowercase letters, numbers, underscores, and hyphens'
        return null
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-semibold mb-6">Appearance Settings</h2>
            </div>

            {/* Profile Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Profile Information</h3>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Profile URL Slug *
                    </label>
                    <div className="flex">
                        <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            onelink.com/
                        </span>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => handleInputChange('slug', e.target.value)}
                            className={`flex-1 px-3 py-2 border rounded-r-md focus:outline-none focus:ring-2 ${validateSlug(formData.slug)
                                ? 'border-red-300 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-blue-500'
                                }`}
                            placeholder="your-username"
                            pattern="^[a-z0-9_-]+$"
                            minLength={4}
                            required
                        />
                    </div>
                    {validateSlug(formData.slug) && (
                        <p className="text-xs text-red-500 mt-1">
                            {validateSlug(formData.slug)}
                        </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                        Only lowercase letters, numbers, underscores, and hyphens. Minimum 4 characters.
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your full name"
                        maxLength={100}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Profile Image URL
                    </label>
                    <input
                        type="url"
                        value={formData.profileImage}
                        onChange={(e) => handleInputChange('profileImage', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/profile.jpg"
                    />
                    {formData.profileImage && (
                        <div className="mt-2">
                            <img
                                src={formData.profileImage}
                                alt="Profile preview"
                                className="w-20 h-20 rounded-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none'
                                }}
                            />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Bio
                    </label>
                    <textarea
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Tell people about yourself..."
                        maxLength={250}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        {formData.bio.length}/250 characters
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-serif font-medium text-charcoal mb-2">
                        Status Message
                    </label>
                    <input
                        type="text"
                        value={formData.statusMessage}
                        onChange={(e) => handleInputChange('statusMessage', e.target.value)}
                        className="w-full px-3 py-2 border border-ink bg-parchment text-charcoal font-mono shadow-sharp-sm focus:outline-none focus:ring-2 focus:ring-verdigris focus:border-verdigris"
                        placeholder="What's on your mind?"
                        maxLength={100}
                    />
                    <p className="text-xs text-ink font-mono mt-1">
                        {formData.statusMessage.length}/100 characters
                    </p>
                </div>
            </div>

            {/* Theme Selection */}
            <div className="space-y-4">
                <h3 className="text-lg font-serif font-semibold text-charcoal">Theme</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {themes.map((theme) => (
                        <button
                            key={theme.id}
                            type="button"
                            onClick={() => handleInputChange('theme', theme.id)}
                            className={`p-4 border-2 rounded-lg transition-colors ${formData.theme === theme.id
                                ? 'border-blue-500 ring-2 ring-blue-200'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <div className={`w-full h-16 border border-ink mb-3 ${theme.preview}`} />
                            <p className="font-serif font-medium text-charcoal">{theme.name}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Color Customization */}
            <div className="space-y-4">
                <h3 className="text-lg font-serif font-semibold text-charcoal">Colors</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ColorPicker
                        label="Primary Color"
                        value={formData.primaryColor}
                        onChange={(color) => handleInputChange('primaryColor', color)}
                    />

                    <ColorPicker
                        label="Background Color"
                        value={formData.backgroundColor}
                        onChange={(color) => handleInputChange('backgroundColor', color)}
                    />

                    <ColorPicker
                        label="Text Color"
                        value={formData.textColor}
                        onChange={(color) => handleInputChange('textColor', color)}
                    />
                </div>
            </div>

            {/* Font Selection */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Typography</h3>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Font Family
                    </label>
                    <select
                        value={formData.font}
                        onChange={(e) => handleInputChange('font', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {fonts.map((font) => (
                            <option key={font.id} value={font.id}>
                                {font.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Preview */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Preview</h3>

                <div
                    className="p-6 rounded-lg border-2 border-dashed border-gray-300"
                    style={{
                        backgroundColor: formData.backgroundColor,
                        color: formData.textColor
                    }}
                >
                    <div className="text-center">
                        {formData.profileImage && (
                            <img
                                src={formData.profileImage}
                                alt="Profile"
                                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none'
                                }}
                            />
                        )}
                        <h3 className="text-xl font-bold mb-2" style={{ color: formData.primaryColor }}>
                            {formData.fullName || 'Your Name'}
                        </h3>
                        {formData.bio && (
                            <p className="text-sm opacity-80 mb-4">{formData.bio}</p>
                        )}
                        {formData.statusMessage && (
                            <p className="text-xs opacity-60 mb-4">{formData.statusMessage}</p>
                        )}
                        <div
                            className="px-4 py-2 rounded-lg inline-block"
                            style={{ backgroundColor: formData.primaryColor, color: 'white' }}
                        >
                            Sample Link
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t">
                <Button
                    onClick={() => onAppearanceChange(formData)}
                    disabled={validateSlug(formData.slug) !== null}
                    className={validateSlug(formData.slug) ? 'opacity-50 cursor-not-allowed' : ''}
                >
                    Save Appearance Settings
                </Button>
                {validateSlug(formData.slug) && (
                    <p className="text-sm text-red-500 mt-2">
                        Please fix the validation errors above before saving.
                    </p>
                )}
            </div>
        </div>
    )
}

export default AppearanceTab