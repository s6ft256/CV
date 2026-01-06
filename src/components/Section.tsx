import { ReactNode } from 'react'

interface SectionProps {
  id?: string
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  gradient?: boolean
}

export default function Section({ id, title, subtitle, children, className = '', gradient = false }: SectionProps) {
  return (
    <section 
      id={id} 
      className={`
        py-20 md:py-28 relative overflow-hidden
        ${gradient ? 'bg-gradient-to-b from-transparent via-primary/5 to-transparent' : ''}
        ${className}
      `}
    >
      {/* Decorative elements */}
      {gradient && (
        <>
          <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
        </>
      )}
      
      <div className="container mx-auto max-w-[var(--max-width)] px-4 relative z-10">
        {(title || subtitle) && (
          <div className="mb-16 text-center">
            {title && (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text tracking-tight">
                <span className="bg-gradient-to-r from-text via-text to-muted bg-clip-text">
                  {title}
                </span>
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <div className="w-12 h-1 bg-gradient-to-r from-transparent to-primary rounded-full" />
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <div className="w-12 h-1 bg-gradient-to-l from-transparent to-primary rounded-full" />
            </div>
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
