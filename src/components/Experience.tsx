import Section from './Section'
import Card from './Card'
import { experiences } from '../data/resume'

export default function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="My professional journey building software solutions"
    >
      <div className="space-y-6">
        {experiences.map(exp => (
          <Card key={exp.id} hover>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-text mb-1">{exp.title}</h3>
                <p className="text-lg text-primary font-medium">{exp.company}</p>
                <p className="text-sm text-muted">{exp.location}</p>
              </div>
              <div className="text-sm text-muted mt-2 md:mt-0 md:text-right">
                <span className="block">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
                {exp.current && (
                  <span className="inline-block mt-1 px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                    Current
                  </span>
                )}
              </div>
            </div>
            
            <ul className="space-y-2 mb-4">
              {exp.description.map((desc, idx) => (
                <li key={idx} className="text-muted flex">
                  <span className="text-primary mr-2">•</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
            
            {exp.technologies && exp.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </Section>
  )
}
