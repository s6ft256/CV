import { ReactNode } from 'react'

interface SectionProps {
  id?: string
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export default function Section({ id, title, subtitle, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-16 ${className}`}>
      <div className="container mx-auto max-w-[var(--max-width)] px-4">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text">{title}</h2>
            )}
            {subtitle && <p className="text-lg text-muted max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
