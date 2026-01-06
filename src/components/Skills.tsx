import Section from './Section'
import Card from './Card'
import { skillCategories } from '../data/resume'

export default function Skills() {
  return (
    <Section
      id="skills"
      title="Skills & Expertise"
      subtitle="Technologies and tools I work with daily"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map(category => (
          <Card key={category.name}>
            <h3 className="text-2xl font-bold text-text mb-6">{category.name}</h3>
            <div className="space-y-4">
              {category.skills.map(skill => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-text font-medium">{skill.name}</span>
                    <span className="text-muted text-sm">
                      {skill.proficiency}/5
                    </span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
