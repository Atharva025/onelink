import React from 'react'

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    onClick,
    disabled = false,
    type = 'button',
    className = '',
    style,
    ...props
}) => {
    const baseClasses = 'focus:outline-none transition-all duration-150 ease-mechanical font-mono uppercase tracking-wide'

    const variantClasses = {
        primary: 'bg-verdigris text-parchment shadow-sharp-sm hover:translate-x-px hover:translate-y-px hover:shadow-none active:shadow-sharp-inset active:translate-x-0 active:translate-y-0',
        secondary: 'bg-ink text-parchment shadow-sharp-sm hover:translate-x-px hover:translate-y-px hover:shadow-none active:shadow-sharp-inset active:translate-x-0 active:translate-y-0',
        outline: 'border-2 border-verdigris text-verdigris bg-transparent shadow-sharp-sm hover:bg-verdigris hover:text-parchment hover:translate-x-px hover:translate-y-px hover:shadow-none active:shadow-sharp-inset active:translate-x-0 active:translate-y-0',
        danger: 'bg-sienna text-parchment shadow-sharp-sm hover:translate-x-px hover:translate-y-px hover:shadow-none active:shadow-sharp-inset active:translate-x-0 active:translate-y-0',
    }

    const sizeClasses = {
        small: 'px-3 py-1.5 text-xs',
        medium: 'px-4 py-2 text-sm',
        large: 'px-6 py-3 text-base',
    }

    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed hover:translate-x-0 hover:translate-y-0 hover:shadow-sharp-sm active:shadow-sharp-sm' : 'cursor-pointer'

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`

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