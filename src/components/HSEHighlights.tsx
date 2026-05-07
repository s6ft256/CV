import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Section from './Section'
import Card from './Card'

function SmartImage({
  basePath,
  alt,
  className,
}: {
  basePath: string
  alt: string
  className?: string
}) {
  const exts = ['webp', 'jpg', 'jpeg', 'png'] as const
  const [i, setI] = useState(0)
  const src = `${basePath}.${exts[i]}`
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setI(prev => (prev + 1 < exts.length ? prev + 1 : prev))}
      className={className ?? 'w-full h-64 md:h-80 object-cover rounded-xl border border-border/50'}
    />
  )
}

export default function HSEHighlights() {
  const { t } = useTranslation()
  return (
    <Section id="hse-highlights">
      <div className="space-y-6">
        <Card hover glow="accent">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <SmartImage
              basePath="/images/hse/training"
              alt="HSE Training Session at JBL5"
              className="w-full max-w-xs md:max-w-sm rounded shadow-glow border border-border"
            />
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                {t('hseHighlights.trainingTitle')}
              </h3>
              <p className="text-muted mb-3">{t('hseHighlights.trainingDescription')}</p>
              <ul className="list-disc pl-5 text-muted space-y-1">
                <li>{t('hseHighlights.trainingPoint1')}</li>
                <li>{t('hseHighlights.trainingPoint2')}</li>
                <li>{t('hseHighlights.trainingPoint3')}</li>
              </ul>
              <div className="mt-4 text-xs text-muted">
                {t('hseHighlights.trainingImageCaption')}
              </div>
            </div>
          </div>
        </Card>

        <Card hover glow="accent">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <SmartImage
              basePath="/images/hse/inspections"
              alt="Site Safety Inspection at JBL5"
              className="w-full max-w-xs md:max-w-sm rounded shadow-glow border border-border"
            />
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                {t('hseHighlights.inspectionTitle')}
              </h3>
              <p className="text-muted mb-3">{t('hseHighlights.inspectionDescription')}</p>
              <ul className="list-disc pl-5 text-muted space-y-1">
                <li>{t('hseHighlights.inspectionPoint1')}</li>
                <li>{t('hseHighlights.inspectionPoint2')}</li>
                <li>{t('hseHighlights.inspectionPoint3')}</li>
              </ul>
              <div className="mt-4 text-xs text-muted">
                {t('hseHighlights.inspectionImageCaption')}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  )
}
