import React, { useState, useEffect } from 'react'
import Button from '../common/Button'
import { getThemeClasses, getThemeColors, getThemeFonts, getFontClass } from '../../utils/themeUtils'

const AppearanceTab = ({ appearance = {}, onAppearanceChange }) => {
    const [formData, setFormData] = useState({
        theme: 'light',
        font: 'inter',
        profileImage: '',
        bio: '',
        slug: '',
        fullName: '',
        statusMessage: '',
        ...appearance
    })
    const [saving, setSaving] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)

    // Sync with parent state when appearance prop changes
    useEffect(() => {
        setFormData({
            theme: 'light',
            font: 'inter',
            profileImage: '',
            bio: '',
            slug: '',
            fullName: '',
            statusMessage: '',
            ...appearance
        })
    }, [appearance])

    const themes = [
        {
            id: 'ethereal-glass',
            name: 'Ethereal Glass',
            preview: 'bg-ether-bg relative overflow-hidden',
            description: 'Airy, sophisticated glass panels with soft, diffused lighting',
            previewElements: (
                <div className="absolute inset-0">
                    <div className="w-full h-8 bg-ether-card backdrop-blur-sm border border-ether-border rounded-lg absolute top-2 left-2 right-2"></div>
                    <div className="w-6 h-6 bg-ether-accent rounded-full absolute bottom-2 right-2 shadow-ether-accent-glow"></div>
                </div>
            )
        },
        {
            id: 'neo-brutalist',
            name: 'Neo-Brutalist Canvas',
            preview: 'bg-brutal-bg relative overflow-hidden',
            description: 'Bold, uncompromising design with sharp edges and strong typography',
            previewElements: (
                <div className="absolute inset-0">
                    <div className="w-full h-8 bg-brutal-surface border-2 border-brutal-border absolute top-2 left-2 right-2"></div>
                    <div className="w-6 h-6 bg-brutal-accent absolute bottom-2 right-2 shadow-brutal-sharp"></div>
                </div>
            )
        },
        {
            id: 'cosmic-drift',
            name: 'Cosmic Drift',
            preview: 'bg-gradient-to-br from-cosmic-start via-cosmic-mid to-cosmic-end relative overflow-hidden',
            description: 'Deep cosmic journey with expansive gradients and ethereal glows',
            previewElements: (
                <div className="absolute inset-0">
                    <div className="w-full h-8 bg-cosmic-card border border-cosmic-mid/50 rounded-lg absolute top-2 left-2 right-2"></div>
                    <div className="w-6 h-6 bg-cosmic-accent rounded-full absolute bottom-2 right-2 shadow-cosmic-glow"></div>
                    <div className="w-1 h-1 bg-cosmic-text-light rounded-full absolute top-4 left-4"></div>
                    <div className="w-1 h-1 bg-cosmic-text-light rounded-full absolute top-6 right-6"></div>
                </div>
            )
        },
        {
            id: 'art-deco',
            name: 'Art Deco Revival',
            preview: 'bg-deco-bg relative overflow-hidden',
            description: 'Luxurious 1920s glamour with rich jewel tones and metallic accents',
            previewElements: (
                <div className="absolute inset-0">
                    <div className="w-full h-8 bg-deco-surface border-2 border-deco-text-gold absolute top-2 left-2 right-2"></div>
                    <div className="w-6 h-6 bg-deco-accent-emerald absolute bottom-2 right-2 shadow-deco-frame"></div>
                    <div className="w-2 h-2 border border-deco-text-gold absolute top-3 right-3 rotate-45"></div>
                </div>
            )
        },
        {
            id: 'zen-garden',
            name: 'Zen Garden',
            preview: 'bg-zen-bg relative overflow-hidden',
            description: 'Tranquil minimalism inspired by traditional Japanese aesthetics',
            previewElements: (
                <div className="absolute inset-0">
                    <div className="w-full h-8 bg-zen-surface border border-zen-border rounded-xl absolute top-2 left-2 right-2"></div>
                    <div className="w-6 h-6 bg-zen-accent-green rounded-full absolute bottom-2 right-2 shadow-zen-soft"></div>
                    <div className="w-4 h-1 bg-zen-border absolute bottom-4 left-4"></div>
                </div>
            )
        }
    ]

    const fonts = [
        { id: 'inter', name: 'Inter', className: 'font-sans', category: 'Default' },
        { id: 'roboto', name: 'Roboto', className: 'font-sans', category: 'Default' },
        { id: 'poppins', name: 'Poppins', className: 'font-sans', category: 'Default' },
        { id: 'playfair', name: 'Playfair Display', className: 'font-serif', category: 'Default' },
        { id: 'mono', name: 'JetBrains Mono', className: 'font-mono', category: 'Default' },

        // Ethereal Glass fonts
        { id: 'ether-display', name: 'Montserrat', className: 'font-ether-display', category: 'Ethereal Glass' },
        { id: 'ether-ui', name: 'Roboto', className: 'font-ether-ui', category: 'Ethereal Glass' },

        // Neo-Brutalist fonts
        { id: 'brutal-display', name: 'Anton', className: 'font-brutal-display', category: 'Neo-Brutalist' },
        { id: 'brutal-ui', name: 'Space Mono', className: 'font-brutal-ui', category: 'Neo-Brutalist' },

        // Cosmic Drift fonts
        { id: 'cosmic-display', name: 'Orbitron', className: 'font-cosmic-display', category: 'Cosmic Drift' },
        { id: 'cosmic-ui', name: 'Fira Code', className: 'font-cosmic-ui', category: 'Cosmic Drift' },

        // Art Deco fonts
        { id: 'deco-display', name: 'Cinzel Decorative', className: 'font-deco-display', category: 'Art Deco' },
        { id: 'deco-ui', name: 'Gothic A1', className: 'font-deco-ui', category: 'Art Deco' },

        // Zen Garden fonts
        { id: 'zen-display', name: 'Noto Serif JP', className: 'font-zen-display', category: 'Zen Garden' },
        { id: 'zen-ui', name: 'Lato', className: 'font-zen-ui', category: 'Zen Garden' }
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
        // Don't auto-save on every change, only save when user clicks save button
    }

    const handleSave = async () => {
        if (validateSlug(formData.slug) !== null) {
            return
        }

        setSaving(true)
        setSaveSuccess(false)

        try {
            await onAppearanceChange(formData)
            setSaveSuccess(true)
            setTimeout(() => setSaveSuccess(false), 3000) // Clear success message after 3 seconds
        } catch (error) {
            console.error('Error saving appearance:', error)
        } finally {
            setSaving(false)
        }
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

            {/* Font Selection */}
            <div className="space-y-4">
                <h3 className="text-lg font-serif font-semibold text-charcoal">Typography</h3>

                <div>
                    <label className="block text-sm font-mono font-medium text-charcoal mb-2">
                        Font Family
                    </label>
                    <select
                        value={formData.font}
                        onChange={(e) => handleInputChange('font', e.target.value)}
                        className="w-full px-3 py-2 border-2 border-ink bg-parchment text-charcoal font-mono shadow-sharp-sm focus:outline-none focus:ring-2 focus:ring-verdigris focus:border-verdigris"
                    >
                        {fonts.reduce((acc, font) => {
                            if (!acc.find(item => item.category === font.category)) {
                                if (acc.length > 0) {
                                    acc.push({ type: 'separator' });
                                }
                                acc.push({ type: 'header', category: font.category });
                            }
                            acc.push(font);
                            return acc;
                        }, []).map((item, index) => {
                            if (item.type === 'separator') {
                                return <option key={`sep-${index}`} disabled>────────────</option>;
                            }
                            if (item.type === 'header') {
                                return <option key={`header-${index}`} disabled style={{ fontWeight: 'bold' }}>{item.category} Theme</option>;
                            }
                            return (
                                <option key={item.id} value={item.id} className={item.className}>
                                    {item.name}
                                </option>
                            );
                        })}
                    </select>
                    <p className="text-xs font-mono text-ink mt-2">
                        Choose fonts that complement your selected theme for the best visual harmony
                    </p>
                </div>
            </div>

            {/* Preview */}
            <div className="space-y-4">
                <h3 className="text-lg font-serif font-semibold text-charcoal">Preview</h3>
                <p className="text-sm font-mono text-ink mb-4">See how your profile will look with the selected theme</p>

                <div className={`p-8 border-2 border-ink relative overflow-hidden transition-all duration-300 ${getThemeClasses(formData.theme, 'page')} ${getFontClass(formData.font)}`}>
                    {/* Theme-specific background elements */}
                    {formData.theme === 'cosmic-drift' && (
                        <>
                            <div className="absolute top-2 left-4 w-1 h-1 bg-cosmic-text-light rounded-full opacity-70"></div>
                            <div className="absolute top-6 right-8 w-1 h-1 bg-cosmic-text-light rounded-full opacity-50"></div>
                            <div className="absolute bottom-4 left-8 w-1 h-1 bg-cosmic-text-light rounded-full opacity-60"></div>
                        </>
                    )}
                    {formData.theme === 'art-deco' && (
                        <div className="absolute top-2 right-2 w-3 h-3 border border-deco-text-gold rotate-45 opacity-30"></div>
                    )}
                    {formData.theme === 'zen-garden' && (
                        <div className="absolute bottom-2 left-4 w-8 h-1 bg-zen-border opacity-50"></div>
                    )}

                    <div className={`${getThemeClasses(formData.theme, 'card')} p-6 relative z-10`}>
                        <div className="text-center">
                            {formData.profileImage && (
                                <div className="relative inline-block mb-4">
                                    <img
                                        src={formData.profileImage}
                                        alt="Profile"
                                        className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-current opacity-80"
                                        onError={(e) => {
                                            e.target.style.display = 'none'
                                        }}
                                    />
                                </div>
                            )}
                            <h3 className={`text-xl font-bold mb-2 ${getThemeClasses(formData.theme, 'text').heading}`}>
                                {formData.fullName || 'Your Name'}
                            </h3>
                            {formData.bio && (
                                <p className={`text-sm mb-4 ${getThemeClasses(formData.theme, 'text').secondary}`}>
                                    {formData.bio}
                                </p>
                            )}
                            {formData.statusMessage && (
                                <p className={`text-xs mb-6 italic ${getThemeClasses(formData.theme, 'text').secondary}`}>
                                    {formData.statusMessage}
                                </p>
                            )}
                            <div className={`px-4 py-2 inline-block transition-all duration-150 ${getThemeClasses(formData.theme, 'button')}`}>
                                Sample Link
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t">
                <div className="flex items-center space-x-4">
                    <Button
                        onClick={handleSave}
                        disabled={validateSlug(formData.slug) !== null || saving}
                        className={validateSlug(formData.slug) ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                        {saving ? 'Saving...' : 'Save Appearance Settings'}
                    </Button>
                    {saveSuccess && (
                        <div className="flex items-center space-x-2 text-green-600">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                            </div>
                            <span className="font-mono text-sm">Settings saved successfully!</span>
                        </div>
                    )}
                </div>
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