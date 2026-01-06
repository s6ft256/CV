import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  ariaLabel?: string
}

export default function Button({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  target,
  rel,
  type = 'button',
  disabled = false,
  ariaLabel,
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-semibold
    transition-all duration-300 ease-out
    rounded-xl
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
  `
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  const variantStyles = {
    primary: `
      bg-gradient-to-r from-primary to-blue-400
      text-[var(--button-text)]
      shadow-lg shadow-primary/25
      hover:shadow-xl hover:shadow-primary/30
      hover:-translate-y-0.5
      active:translate-y-0
    `,
    ghost: `
      bg-transparent
      border border-border/50
      text-text
      hover:bg-surface-hover
      hover:border-primary/30
    `,
    outline: `
      bg-transparent
      border-2 border-primary
      text-primary
      hover:bg-primary
      hover:text-[var(--button-text)]
      hover:shadow-lg hover:shadow-primary/25
    `,
  }

  const classes = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${className}
    ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
  `.replace(/\s+/g, ' ').trim()

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
