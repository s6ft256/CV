import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Section from './Section'
import Card from './Card'
import { certifications } from '../data/resume'

const categoryOrder = [
  'HSE & Safety',
  'AI & Technology',
  'IT & Cybersecurity',
  'Business & Professional',
] as const

const categoryMap: Record<string, string> = {
  'HSE & Safety': 'certifications.categoryHSE',
  'AI & Technology': 'certifications.categoryAI',
  'IT & Cybersecurity': 'certifications.categoryIT',
  'Business & Professional': 'certifications.categoryBusiness',
}

const categoryIcons: Record<string, JSX.Element> = {
  'HSE & Safety': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),
  'AI & Technology': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  'IT & Cybersecurity': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  ),
  'Business & Professional': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
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
  const { t } = useTranslation()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [previewType, setPreviewType] = useState<'pdf' | 'image' | 'other'>('pdf')

  useEffect(() => {
    if (!previewUrl) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [previewUrl])
  const grouped = categoryOrder.reduce(
    (acc, category) => {
      acc[category] = certifications.filter(c => c.category === category)
      return acc
    },
    {} as Record<string, typeof certifications>
  )

  return (
    <>
      <Section
        id="certifications"
        title={t('certifications.title')}
        subtitle={t('certifications.subtitle')}
      >
        <div className="space-y-10">
          {categoryOrder.map(category => {
            const certs = grouped[category]
            if (!certs || certs.length === 0) return null

            return (
              <div key={category}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${categoryColors[category]} flex items-center justify-center text-white flex-shrink-0`}
                  >
                    <span className="w-5 h-5">{categoryIcons[category]}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-base font-bold text-text">{t(categoryMap[category])}</h3>
                    <span className="text-xs text-muted">
                      {certs.length}{' '}
                      {certs.length > 1
                        ? t('certifications.certCountPlural')
                        : t('certifications.certCount')}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-border/40 ml-2" aria-hidden="true" />
                </div>

                {/* Certifications Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {certs.map(cert => (
                    <Card key={cert.id} hover>
                      <div className="flex flex-col h-full gap-2">
                        {/* Name + Issuer */}
                        <div>
                          <h4 className="text-sm font-bold text-text leading-snug">{cert.name}</h4>
                          <p className="text-xs text-primary font-medium mt-0.5">{cert.issuer}</p>
                        </div>

                        {/* Date row */}
                        <p className="text-xs text-muted">
                          {t('certifications.issued')} {cert.issueDate}
                          {cert.expiryDate && (
                            <span className="ml-1 text-border/80">
                              · {t('certifications.expires')} {cert.expiryDate}
                            </span>
                          )}
                        </p>

                        {/* Credential link */}
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            onClick={e => {
                              e.preventDefault()
                              const url = cert.credentialUrl!
                              const clean = url.split('#')[0].split('?')[0].toLowerCase()
                              const isPdf = clean.endsWith('.pdf')
                              const isImg = /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(clean)
                              setPreviewType(isPdf ? 'pdf' : isImg ? 'image' : 'other')
                              setPreviewUrl(url)
                            }}
                            className="mt-auto inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium transition-colors group"
                          >
                            {t('certifications.viewCredential')}
                            <svg
                              className="w-3 h-3 transition-transform group-hover:translate-x-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Section>
      {previewUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('certifications.viewCredential')}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <button
            type="button"
            aria-label="Close preview"
            onClick={() => setPreviewUrl(null)}
            className="absolute inset-0 w-full h-full bg-bg/80 backdrop-blur-sm cursor-default"
          />
          <div className="relative bg-card-bg rounded-xl shadow-2xl border border-border w-[95vw] max-w-5xl h-[85vh] flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border">
              <div className="text-sm font-semibold">{t('certifications.viewCredential')}</div>
              <div className="flex items-center gap-2">
                <a
                  href={previewUrl}
                  download
                  className="px-3 py-1.5 rounded-md text-xs bg-primary text-[var(--button-text)] hover:opacity-90"
                >
                  {t('common.download') ?? 'Download'}
                </a>
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-md text-xs border border-border hover:bg-surface-hover"
                >
                  {t('common.openInNewTab') ?? 'Open in new tab'}
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewUrl(null)}
                  className="px-3 py-1.5 rounded-md text-xs border border-border hover:bg-surface-hover"
                >
                  {t('common.close') ?? 'Close'}
                </button>
              </div>
            </div>
            <div className="flex-1 min-h-0">
              {previewType === 'pdf' && (
                <iframe title="certificate-preview" src={previewUrl} className="w-full h-full" />
              )}
              {previewType === 'image' && (
                <div className="w-full h-full flex items-center justify-center p-4">
                  <img
                    src={previewUrl}
                    alt="certificate"
                    className="max-w-full max-h-full rounded"
                  />
                </div>
              )}
              {previewType === 'other' && (
                <div className="w-full h-full flex items-center justify-center p-6 text-sm text-muted">
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    {t('common.openInNewTab') ?? 'Open in new tab'}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
