import { useState } from 'react'
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
  return (
    <Section id="hse-highlights" gradient>
      <div className="space-y-6">
        <Card hover glow="accent">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <SmartImage
              basePath="/images/hse/training"
              alt="HSE Training Session at JBL5"
              className="w-full max-w-xs md:max-w-sm rounded shadow-glow border border-border"
            />
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Training at JBL5</h3>
              <p className="text-muted mb-3">
                Toolbox Talk (TBT) and practical training for flagmen/signalmen and riggers,
                covering safe signalling protocols, lifting communications, standard hand signals,
                rigging checks, load-path awareness, spotter responsibilities, and PPE requirements.
              </p>
              <ul className="list-disc pl-5 text-muted space-y-1">
                <li>Safe signalling and lifting communications</li>
                <li>Standard hand signals and spotter responsibilities</li>
                <li>Rigging checks, load-path awareness, and PPE</li>
              </ul>
              <div className="mt-4 text-xs text-muted">
                Image: Training/TBT with flagmen, signalmen, and riggers at JBL5
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
              <h3 className="text-lg md:text-xl font-semibold mb-2">Inspections at JBL5</h3>
              <p className="text-muted mb-3">
                Field inspections for the JBL Etihad Rail road works, focusing on equipment
                compliance, lifting and rigging setups, permits and documentation, and overall site
                readiness.
              </p>
              <ul className="list-disc pl-5 text-muted space-y-1">
                <li>Equipment compliance and rigging setups</li>
                <li>Work permits, traffic management, barricading and signage</li>
                <li>Housekeeping standards and audit documentation readiness</li>
              </ul>
              <div className="mt-4 text-xs text-muted">
                Image: On-site inspection for JBL Etihad Rail road works
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  )
}
