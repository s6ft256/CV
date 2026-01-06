import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
  glow?: 'blue' | 'accent' | 'none'
}

export default function Card({ 
  children, 
  className = '', 
  hover = false,
  gradient = false,
  glow = 'blue'
}: CardProps) {
  const glowStyles = {
    blue: 'hover:shadow-glow',
    accent: 'hover:shadow-glow-accent',
    none: ''
  }

  return (
    <div
      className={`
        relative group
        bg-card-bg/80 backdrop-blur-md
        border border-border/50
        rounded-2xl p-6 md:p-8
        transition-all duration-500 ease-out
        ${hover ? `
          hover:border-primary/30
          hover:-translate-y-2
          hover:shadow-2xl
          ${glowStyles[glow]}
        ` : ''}
        ${gradient ? 'bg-gradient-to-br from-card-bg to-card-bg/50' : ''}
        ${className}
      `}
    >
      {/* Subtle gradient overlay on hover */}
      {hover && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Glow effect */}
      {glow !== 'none' && (
        <div className={`
          absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100
          transition-opacity duration-500 pointer-events-none
          bg-gradient-to-r ${glow === 'blue' ? 'from-primary/20 via-transparent to-primary/20' : 'from-accent/20 via-transparent to-accent/20'}
        `} />
      )}
    </div>
  )
}
