import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`
        bg-card-bg border border-border rounded-[var(--radius)] p-6 
        backdrop-blur-sm shadow-lg
        ${hover ? 'transition-transform hover:scale-[1.02] hover:shadow-xl' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
