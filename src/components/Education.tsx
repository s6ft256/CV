import Section from './Section'
import Card from './Card'
import { education } from '../data/resume'

export default function Education() {
  return (
    <Section
      id="education"
      title="Education"
      subtitle="Academic background and qualifications"
    >
      <div className="space-y-6">
        {education.map(edu => (
          <Card key={edu.id} hover>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div>
                <h3 className="text-2xl font-bold text-text mb-1">{edu.degree}</h3>
                <p className="text-lg text-primary font-medium">{edu.institution}</p>
                <p className="text-sm text-muted">{edu.location}</p>
                {edu.description && (
                  <p className="text-muted mt-3">{edu.description}</p>
                )}
              </div>
              <div className="text-sm text-muted mt-2 md:mt-0 md:text-right">
                {edu.startDate} - {edu.endDate}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
