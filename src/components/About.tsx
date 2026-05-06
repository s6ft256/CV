import Section from './Section'
import { personalInfo } from '../data/resume'

export default function About() {
  return (
    <Section
      id="about"
      title="About"
      subtitle="A bit about my background, focus areas, and how I work"
      gradient
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2 space-y-4 text-muted leading-relaxed">
          <p>{personalInfo.summary}</p>
          <p>
            I build reliable, secure software with an eye for DX and maintainability. My recent work
            blends full‑stack product development with safety‑critical workflows (HSE), data
            automation, and modern cloud tooling.
          </p>
        </div>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-card-bg/60 border border-border/50">
            <h3 className="text-sm font-semibold text-text mb-3">At a glance</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true" />
                Available for opportunities
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
                Based in {personalInfo.location}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
                Focus: Full‑Stack (TypeScript/React), Python/Django, HSE systems
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
