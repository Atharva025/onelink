const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    onClick,
    disabled = false,
    type = 'button',
    className = '',
    style,
    theme = 'default',
    themeClasses = {},
    ...props
}) => {
    // Get theme-aware base classes
    const getThemeAwareClasses = () => {
        // If theme classes are provided, use them; otherwise fall back to defaults
        if (themeClasses.button) {
            return themeClasses.button
        }

        // Theme-specific button styling
        switch (theme) {
            case 'ethereal-glass':
                return getEtherealButtonClasses(variant)
            case 'neo-brutalist':
                return getBrutalistButtonClasses(variant)
            case 'cosmic-drift':
                return getCosmicButtonClasses(variant)
            case 'art-deco':
                return getDecoButtonClasses(variant)
            case 'zen-garden':
                return getZenButtonClasses(variant)
            default:
                return getDefaultButtonClasses(variant)
        }
    }

    // Default theme button classes
    const getDefaultButtonClasses = (variant) => {
        const baseClasses = 'focus:outline-none transition-all duration-150 ease-mechanical font-mono uppercase tracking-wide'
        const variantClasses = {
            primary: 'bg-verdigris text-parchment shadow-sharp-sm hover:translate-x-px hover:translate-y-px hover:shadow-none active:shadow-sharp-inset active:translate-x-0 active:translate-y-0',
            secondary: 'bg-ink text-parchment shadow-sharp-sm hover:translate-x-px hover:translate-y-px hover:shadow-none active:shadow-sharp-inset active:translate-x-0 active:translate-y-0',
            outline: 'border-2 border-verdigris text-verdigris bg-transparent shadow-sharp-sm hover:bg-verdigris hover:text-parchment hover:translate-x-px hover:translate-y-px hover:shadow-none active:shadow-sharp-inset active:translate-x-0 active:translate-y-0',
            danger: 'bg-sienna text-parchment shadow-sharp-sm hover:translate-x-px hover:translate-y-px hover:shadow-none active:shadow-sharp-inset active:translate-x-0 active:translate-y-0',
        }
        return `${baseClasses} ${variantClasses[variant]}`
    }

    // Ethereal Glass theme button classes
    const getEtherealButtonClasses = (variant) => {
        const baseClasses = 'focus:outline-none transition-all duration-300 font-ether-ui rounded-md backdrop-blur-sm'
        const variantClasses = {
            primary: 'bg-ether-accent text-white shadow-ether-accent-glow hover:bg-ether-accent/90 hover:shadow-ether-glow',
            secondary: 'bg-ether-card border border-ether-border text-ether-text-dark hover:bg-ether-accent/20 hover:border-ether-accent',
            outline: 'border-2 border-ether-accent text-ether-accent bg-transparent hover:bg-ether-accent hover:text-white hover:shadow-ether-accent-glow',
            danger: 'bg-red-500 text-white shadow-ether-glow hover:bg-red-600',
        }
        return `${baseClasses} ${variantClasses[variant]}`
    }

    // Neo-Brutalist theme button classes
    const getBrutalistButtonClasses = (variant) => {
        const baseClasses = 'focus:outline-none transition-all duration-150 font-brutal-ui uppercase font-bold tracking-wide rounded-brutal-none'
        const variantClasses = {
            primary: 'bg-brutal-accent text-brutal-bg shadow-brutal-sharp hover:shadow-brutal-inset hover:translate-x-1 hover:translate-y-1',
            secondary: 'bg-brutal-surface border-2 border-brutal-border text-brutal-text-main hover:bg-brutal-accent hover:text-brutal-bg hover:shadow-brutal-sharp',
            outline: 'border-2 border-brutal-accent text-brutal-accent bg-transparent hover:bg-brutal-accent hover:text-brutal-bg hover:shadow-brutal-sharp',
            danger: 'bg-red-600 text-white shadow-brutal-sharp hover:shadow-brutal-inset',
        }
        return `${baseClasses} ${variantClasses[variant]}`
    }

    // Cosmic Drift theme button classes
    const getCosmicButtonClasses = (variant) => {
        const baseClasses = 'focus:outline-none transition-all duration-300 font-cosmic-display rounded-full'
        const variantClasses = {
            primary: 'bg-cosmic-accent text-cosmic-start shadow-cosmic-glow hover:shadow-cosmic-inner-glow',
            secondary: 'bg-cosmic-card border border-cosmic-mid text-cosmic-text-light hover:border-cosmic-accent hover:shadow-cosmic-glow',
            outline: 'border-2 border-cosmic-accent text-cosmic-accent bg-transparent hover:bg-cosmic-accent hover:text-cosmic-start hover:shadow-cosmic-glow',
            danger: 'bg-red-500 text-cosmic-start shadow-cosmic-glow hover:bg-red-600',
        }
        return `${baseClasses} ${variantClasses[variant]}`
    }

    // Art Deco theme button classes
    const getDecoButtonClasses = (variant) => {
        const baseClasses = 'focus:outline-none transition-all duration-200 font-deco-ui rounded-sm'
        const variantClasses = {
            primary: 'bg-deco-accent-sapphire text-deco-text-gold shadow-deco-frame hover:bg-gradient-to-r hover:from-deco-text-gold hover:to-yellow-500 hover:text-deco-bg',
            secondary: 'bg-deco-surface border border-deco-accent-emerald text-deco-text-main hover:border-deco-text-gold hover:shadow-deco-bevel',
            outline: 'border-2 border-deco-text-gold text-deco-text-gold bg-transparent hover:bg-deco-text-gold hover:text-deco-bg hover:shadow-deco-frame',
            danger: 'bg-red-700 text-deco-text-gold shadow-deco-frame hover:bg-red-800',
        }
        return `${baseClasses} ${variantClasses[variant]}`
    }

    // Zen Garden theme button classes
    const getZenButtonClasses = (variant) => {
        const baseClasses = 'focus:outline-none transition-all duration-200 font-zen-ui rounded-full'
        const variantClasses = {
            primary: 'bg-zen-accent-green text-white shadow-zen-soft hover:bg-zen-accent-green/90 hover:shadow-zen-inset-subtle',
            secondary: 'bg-zen-surface border border-zen-border text-zen-text-dark hover:bg-zen-border hover:shadow-zen-soft',
            outline: 'border-2 border-zen-accent-green text-zen-accent-green bg-transparent hover:bg-zen-accent-green hover:text-white hover:shadow-zen-soft',
            danger: 'bg-red-600 text-white shadow-zen-soft hover:bg-red-700',
        }
        return `${baseClasses} ${variantClasses[variant]}`
    }

    const sizeClasses = {
        small: 'px-3 py-1.5 text-xs',
        medium: 'px-4 py-2 text-sm',
        large: 'px-6 py-3 text-base',
    }

    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

    const themeAwareClasses = getThemeAwareClasses()
    const classes = `${themeAwareClasses} ${sizeClasses[size]} ${disabledClasses} ${className}`

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
            style={style}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button