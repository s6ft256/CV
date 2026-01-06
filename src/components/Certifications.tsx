import Section from './Section'
import Card from './Card'
import { certifications } from '../data/resume'

const categoryOrder = [
  'HSE & Safety',
  'AI & Technology',
  'IT & Cybersecurity',
  'Business & Professional',
] as const

const categoryIcons: Record<string, JSX.Element> = {
  'HSE & Safety': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  'AI & Technology': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  'IT & Cybersecurity': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  'Business & Professional': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
}

const categoryColors: Record<string, string> = {
  'HSE & Safety': 'from-green-500 to-emerald-400',
  'AI & Technology': 'from-purple-500 to-violet-400',
  'IT & Cybersecurity': 'from-red-500 to-orange-400',
  'Business & Professional': 'from-blue-500 to-cyan-400',
}

export default function Certifications() {
  // Group certifications by category
  const grouped = categoryOrder.reduce(
    (acc, category) => {
      acc[category] = certifications.filter(c => c.category === category)
      return acc
    },
    {} as Record<string, typeof certifications>
  )

  return (
    <Section
      id="certifications"
      title="Certifications"
      subtitle="Professional certifications and credentials"
      gradient
    >
      <div className="space-y-16">
        {categoryOrder.map(category => {
          const certs = grouped[category]
          if (!certs || certs.length === 0) return null

          return (
            <div key={category}>
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${categoryColors[category]} flex items-center justify-center text-white shadow-lg`}>
                  {categoryIcons[category]}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text">{category}</h3>
                  <p className="text-sm text-muted">{certs.length} certification{certs.length > 1 ? 's' : ''}</p>
                </div>
              </div>
              
              {/* Certifications Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certs.map(cert => (
                  <Card key={cert.id} hover glow="accent">
                    <div className="flex flex-col h-full">
                      {/* Header with badge icon */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColors[category]} flex items-center justify-center text-white flex-shrink-0`}>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-bold text-text leading-tight">{cert.name}</h4>
                          <p className="text-sm text-primary font-medium mt-1">{cert.issuer}</p>
                        </div>
                      </div>
                      
                      {/* Date info */}
                      <div className="flex items-center gap-2 text-xs text-muted mb-4 bg-surface-hover px-3 py-2 rounded-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Issued: {cert.issueDate}</span>
                        {cert.expiryDate && (
                          <>
                            <span className="text-border">•</span>
                            <span>Expires: {cert.expiryDate}</span>
                          </>
                        )}
                      </div>
                      
                      {/* View Credential Link */}
                      <div className="mt-auto pt-4 border-t border-border/30">
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark text-sm font-medium transition-colors group"
                          >
                            <span>View Credential</span>
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
