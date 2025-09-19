import React, { useState } from 'react'
import QRCodeGenerator from '../common/QRCodeGenerator'
import Button from '../common/Button'

const QRCodeTab = ({ profile = {} }) => {
    const [showQRGenerator, setShowQRGenerator] = useState(false)
    const [qrSettings, setQrSettings] = useState({
        size: 300,
        backgroundColor: '#ffffff',
        foregroundColor: '#000000'
    })

    // Generate the public profile URL
    const profileUrl = profile.slug
        ? `${window.location.origin}/${profile.slug}`
        : null

    const handleSettingChange = (setting, value) => {
        setQrSettings(prev => ({
            ...prev,
            [setting]: value
        }))
    }

    const presetSizes = [
        { label: 'Small (200px)', value: 200 },
        { label: 'Medium (300px)', value: 300 },
        { label: 'Large (400px)', value: 400 },
        { label: 'Extra Large (500px)', value: 500 }
    ]

    const presetColors = [
        { name: 'Black on White', bg: '#ffffff', fg: '#000000' },
        { name: 'White on Black', bg: '#000000', fg: '#ffffff' },
        { name: 'Blue on White', bg: '#ffffff', fg: '#3B82F6' },
        { name: 'Green on White', bg: '#ffffff', fg: '#10B981' },
        { name: 'Red on White', bg: '#ffffff', fg: '#EF4444' },
        { name: 'Purple on White', bg: '#ffffff', fg: '#8B5CF6' }
    ]

    if (!profile.slug) {
        return (
            <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                    <div className="text-6xl mb-4">📱</div>
                    <h3 className="text-xl font-serif font-semibold text-charcoal mb-4">
                        QR Code Not Available
                    </h3>
                    <p className="text-ink font-mono mb-6">
                        You need to set up your profile slug in the Appearance tab before you can generate a QR code.
                    </p>
                    <p className="text-sm text-ink font-mono">
                        Go to <strong>Appearance → Profile URL Slug</strong> to create your custom URL.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-serif font-semibold text-charcoal mb-2">QR Code Generator</h2>
                <p className="text-ink font-mono">
                    Generate QR codes for your OneLink profile that people can scan to visit your page instantly.
                </p>
            </div>

            {/* Profile URL Display */}
            <div className="bg-parchment border border-ink shadow-sharp p-4">
                <h3 className="text-sm font-serif font-medium text-charcoal mb-2">Your Profile URL</h3>
                <p className="text-verdigris break-all font-mono text-sm">
                    {profileUrl}
                </p>
            </div>

            {/* QR Code Customization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Settings Panel */}
                <div className="space-y-6">
                    <h3 className="text-lg font-serif font-medium text-charcoal">Customize QR Code</h3>

                    {/* Size Selection */}
                    <div>
                        <label className="block text-sm font-mono font-medium text-charcoal mb-2">
                            Size
                        </label>
                        <select
                            value={qrSettings.size}
                            onChange={(e) => handleSettingChange('size', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-ink shadow-sharp focus:outline-none focus:shadow-sharp-inset bg-parchment font-mono text-charcoal"
                        >
                            {presetSizes.map((size) => (
                                <option key={size.value} value={size.value}>
                                    {size.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Color Presets */}
                    <div>
                        <label className="block text-sm font-mono font-medium text-charcoal mb-2">
                            Color Presets
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {presetColors.map((preset, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        handleSettingChange('backgroundColor', preset.bg)
                                        handleSettingChange('foregroundColor', preset.fg)
                                    }}
                                    className={`p-3 border rounded text-sm transition-colors ${qrSettings.backgroundColor === preset.bg &&
                                        qrSettings.foregroundColor === preset.fg
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <div
                                            className="w-4 h-4 border border-ink"
                                            style={{ backgroundColor: preset.bg }}
                                        >
                                            <div
                                                className="w-2 h-2 m-0.5"
                                                style={{ backgroundColor: preset.fg }}
                                            />
                                        </div>
                                        <span className="text-xs font-mono text-charcoal">{preset.name}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Custom Colors */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-mono font-medium text-charcoal mb-2">
                                Background Color
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="color"
                                    value={qrSettings.backgroundColor}
                                    onChange={(e) => handleSettingChange('backgroundColor', e.target.value)}
                                    className="w-10 h-10 border border-ink shadow-sharp cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={qrSettings.backgroundColor}
                                    onChange={(e) => handleSettingChange('backgroundColor', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-ink shadow-sharp focus:outline-none focus:shadow-sharp-inset bg-parchment text-sm font-mono text-charcoal"
                                    placeholder="#ffffff"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-mono font-medium text-charcoal mb-2">
                                Foreground Color
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="color"
                                    value={qrSettings.foregroundColor}
                                    onChange={(e) => handleSettingChange('foregroundColor', e.target.value)}
                                    className="w-10 h-10 border border-ink shadow-sharp cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={qrSettings.foregroundColor}
                                    onChange={(e) => handleSettingChange('foregroundColor', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-ink shadow-sharp focus:outline-none focus:shadow-sharp-inset bg-parchment text-sm font-mono text-charcoal"
                                    placeholder="#000000"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* QR Code Preview */}
                <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Preview</h3>

                    <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                        <QRCodeGenerator
                            url={profileUrl}
                            title={`${profile.fullName || profile.slug}'s OneLink`}
                            size={Math.min(qrSettings.size, 300)} // Limit preview size
                            backgroundColor={qrSettings.backgroundColor}
                            foregroundColor={qrSettings.foregroundColor}
                        />
                    </div>
                </div>
            </div>

            {/* Usage Tips */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">💡 How to Use Your QR Code</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">Print Materials</h4>
                        <ul className="text-gray-600 space-y-1">
                            <li>• Business cards</li>
                            <li>• Flyers and posters</li>
                            <li>• Event materials</li>
                            <li>• Product packaging</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">Digital Sharing</h4>
                        <ul className="text-gray-600 space-y-1">
                            <li>• Social media posts</li>
                            <li>• Email signatures</li>
                            <li>• Website footer</li>
                            <li>• Presentation slides</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-xs text-blue-800">
                        <strong>Tip:</strong> Use high contrast colors (like black on white) for the best scanning results,
                        especially when printing.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default QRCodeTab