import { useState } from 'react'
import Section from './Section'
import Card from './Card'

function SmartImage({ basePath, alt }: { basePath: string; alt: string }) {
  const exts = ['webp', 'jpg', 'jpeg', 'png'] as const
  const [i, setI] = useState(0)
  const src = `${basePath}.${exts[i]}`
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setI(prev => (prev + 1 < exts.length ? prev + 1 : prev))}
      className="w-full h-64 md:h-80 object-cover rounded-xl border border-border/50"
    />
  )
}

export default function HSEHighlights() {
  return (
    <Section id="hse-highlights">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card hover glow="accent">
          <figure className="space-y-3">
            <SmartImage basePath="/images/hse/training" alt="HSE Training Session" />
            <figcaption className="text-center text-sm text-muted">HSE Training</figcaption>
          </figure>
        </Card>
        <Card hover glow="accent">
          <figure className="space-y-3">
            <SmartImage basePath="/images/hse/inspections" alt="Site Safety Inspection" />
            <figcaption className="text-center text-sm text-muted">Inspections</figcaption>
          </figure>
        </Card>
      </div>
    </Section>
  )
}
