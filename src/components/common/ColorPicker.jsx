import React, { useState } from 'react'

const ColorPicker = ({
    value = '#000000',
    onChange,
    label = 'Color',
    presetColors = [
        '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
        '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
    ]
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleColorChange = (color) => {
        onChange(color)
        setIsOpen(false)
    }

    const handleInputChange = (e) => {
        onChange(e.target.value)
    }

    return (
        <div className="relative">
            <label className="block text-sm font-medium mb-2">
                {label}
            </label>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-10 h-10 rounded border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ backgroundColor: value }}
                    aria-label={`Selected color: ${value}`}
                />

                <input
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="#000000"
                    pattern="^#[0-9A-Fa-f]{6}$"
                />

                <input
                    type="color"
                    value={value}
                    onChange={handleInputChange}
                    className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                />
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 p-3 bg-white border border-gray-300 rounded shadow-lg z-10">
                    <div className="grid grid-cols-4 gap-2 mb-3">
                        {presetColors.map((color) => (
                            <button
                                key={color}
                                type="button"
                                onClick={() => handleColorChange(color)}
                                className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform"
                                style={{ backgroundColor: color }}
                                aria-label={`Select color ${color}`}
                            />
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-gray-600 hover:text-gray-800"
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    )
}

export default ColorPicker