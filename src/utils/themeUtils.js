// Theme utility functions for OneLink
export const getThemeClasses = (themeName, element = 'page') => {
    const themes = {
        'ethereal-glass': {
            page: 'bg-ether-bg',
            card: 'bg-ether-card backdrop-blur-md border border-ether-border rounded-xl shadow-ether-glow',
            text: {
                primary: 'text-ether-text-dark font-ether-display',
                secondary: 'text-ether-text-light font-ether-ui',
                heading: 'text-ether-text-dark font-ether-display'
            },
            button: 'bg-ether-accent text-white font-ether-ui rounded-md hover:bg-ether-accent/90 hover:shadow-ether-accent-glow',
            link: 'bg-ether-card backdrop-blur-sm border border-ether-border rounded-lg text-ether-text-dark font-ether-ui hover:bg-ether-accent/20 hover:border-ether-accent hover:text-ether-accent hover:shadow-ether-accent-glow'
        },
        'neo-brutalist': {
            page: 'bg-brutal-bg',
            card: 'bg-brutal-surface border-2 border-brutal-border rounded-brutal-none shadow-brutal-sharp',
            text: {
                primary: 'text-brutal-text-main font-brutal-ui',
                secondary: 'text-brutal-text-secondary font-brutal-ui',
                heading: 'text-brutal-text-main font-brutal-display uppercase'
            },
            button: 'bg-brutal-accent text-brutal-bg font-brutal-ui rounded-brutal-none font-bold hover:shadow-brutal-inset',
            link: 'bg-brutal-surface border-2 border-brutal-border rounded-brutal-none text-brutal-text-main font-brutal-ui hover:bg-brutal-accent hover:text-brutal-bg hover:shadow-brutal-sharp'
        },
        'cosmic-drift': {
            page: 'bg-gradient-to-br from-cosmic-start via-cosmic-mid to-cosmic-end bg-size-200% animate-gradient-shift',
            card: 'bg-cosmic-card rounded-lg border border-cosmic-mid/50 shadow-cosmic-glow',
            text: {
                primary: 'text-cosmic-text-light font-cosmic-ui',
                secondary: 'text-cosmic-text-dark font-cosmic-ui',
                heading: 'text-cosmic-text-light font-cosmic-display'
            },
            button: 'bg-cosmic-accent text-cosmic-start font-cosmic-display rounded-full hover:shadow-cosmic-glow',
            link: 'bg-cosmic-card rounded-md border border-cosmic-mid/70 text-cosmic-text-light font-cosmic-ui hover:border-cosmic-accent hover:shadow-cosmic-inner-glow'
        },
        'art-deco': {
            page: 'bg-deco-bg',
            card: 'bg-deco-surface border-4 border-deco-text-gold rounded-md shadow-deco-frame',
            text: {
                primary: 'text-deco-text-main font-deco-ui',
                secondary: 'text-deco-text-silver font-deco-ui',
                heading: 'text-deco-text-gold font-deco-display'
            },
            button: 'bg-deco-accent-sapphire text-deco-text-gold font-deco-ui rounded-sm hover:bg-gradient-to-r hover:from-deco-text-gold hover:to-yellow-500 hover:text-deco-bg',
            link: 'bg-deco-surface border border-deco-accent-emerald text-deco-text-main font-deco-ui hover:border-deco-text-gold hover:shadow-deco-bevel'
        },
        'zen-garden': {
            page: 'bg-zen-bg',
            card: 'bg-zen-surface border border-zen-border rounded-xl shadow-zen-soft',
            text: {
                primary: 'text-zen-text-dark font-zen-ui',
                secondary: 'text-zen-text-muted font-zen-ui',
                heading: 'text-zen-text-dark font-zen-display'
            },
            button: 'bg-zen-accent-green text-white font-zen-ui rounded-full hover:bg-zen-accent-green/90 hover:shadow-zen-soft',
            link: 'bg-zen-surface border border-zen-border rounded-lg text-zen-text-dark font-zen-ui hover:bg-zen-border hover:shadow-zen-inset-subtle'
        }
    }

    // Default to original OneLink theme if theme not found
    const defaultTheme = {
        page: 'bg-parchment',
        card: 'bg-parchment border-2 border-ink shadow-sharp',
        text: {
            primary: 'text-charcoal font-mono',
            secondary: 'text-ink font-mono',
            heading: 'text-charcoal font-serif'
        },
        button: 'bg-verdigris text-parchment font-mono shadow-sharp-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none',
        link: 'bg-parchment border-2 border-ink shadow-sharp text-charcoal font-mono hover:translate-x-1 hover:translate-y-1 hover:shadow-sharp-sm'
    }

    const theme = themes[themeName] || defaultTheme
    return theme[element] || theme.page
}

export const getThemeColors = (themeName) => {
    const themeColors = {
        'ethereal-glass': {
            background: '#E8F1F2',
            primary: '#8E44AD',
            text: '#2C3E50'
        },
        'neo-brutalist': {
            background: '#222222',
            primary: '#FF6B6B',
            text: '#FFFFFF'
        },
        'cosmic-drift': {
            background: '#1A0033',
            primary: '#00FFFF',
            text: '#E0E0FF'
        },
        'art-deco': {
            background: '#1E282D',
            primary: '#DAA520',
            text: '#F5F5F5'
        },
        'zen-garden': {
            background: '#F4F4EB',
            primary: '#6B8E23',
            text: '#3C403D'
        }
    }

    return themeColors[themeName] || {
        background: '#FDF6E3',
        primary: '#40B5A1',
        text: '#36454F'
    }
}

export const getThemeFonts = (themeName) => {
    const themeFonts = {
        'ethereal-glass': {
            display: 'font-ether-display',
            ui: 'font-ether-ui'
        },
        'neo-brutalist': {
            display: 'font-brutal-display',
            ui: 'font-brutal-ui'
        },
        'cosmic-drift': {
            display: 'font-cosmic-display',
            ui: 'font-cosmic-ui'
        },
        'art-deco': {
            display: 'font-deco-display',
            ui: 'font-deco-ui'
        },
        'zen-garden': {
            display: 'font-zen-display',
            ui: 'font-zen-ui'
        }
    }

    return themeFonts[themeName] || {
        display: 'font-serif',
        ui: 'font-mono'
    }
}

// Helper function to get font class based on font selection
export const getFontClass = (fontId) => {
    const fontMap = {
        // Default fonts
        'inter': 'font-sans',
        'roboto': 'font-sans',
        'poppins': 'font-sans',
        'playfair': 'font-serif',
        'mono': 'font-mono',

        // Theme-specific fonts
        'ether-display': 'font-ether-display',
        'ether-ui': 'font-ether-ui',
        'brutal-display': 'font-brutal-display',
        'brutal-ui': 'font-brutal-ui',
        'cosmic-display': 'font-cosmic-display',
        'cosmic-ui': 'font-cosmic-ui',
        'deco-display': 'font-deco-display',
        'deco-ui': 'font-deco-ui',
        'zen-display': 'font-zen-display',
        'zen-ui': 'font-zen-ui'
    }
    return fontMap[fontId] || 'font-sans'
}