import { useState, useEffect } from 'react'
import Section from './Section'
import Card from './Card'
import { Project } from '../types'

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGitHubProjects()
  }, [])

  const fetchGitHubProjects = async () => {
    try {
      const username = import.meta.env.VITE_GITHUB_USERNAME || 's6ft256'
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
      
      if (!response.ok) throw new Error('Failed to fetch')
      
      const repos = await response.json()
      
      const projectData: Project[] = repos.map((repo: any) => ({
        id: repo.id.toString(),
        name: repo.name,
        description: repo.description || 'No description available',
        technologies: repo.language ? [repo.language] : [],
        githubUrl: repo.html_url,
        liveUrl: repo.homepage || undefined,
        featured: repo.stargazers_count > 0,
      }))
      
      setProjects(projectData)
    } catch (error) {
      console.error('Error fetching GitHub projects:', error)
      // Fallback to static projects
      setProjects([
        {
          id: '1',
          name: 'Safety Management Platform',
          description: 'Enterprise-grade safety reporting and compliance management system',
          technologies: ['Django', 'React', 'PostgreSQL', 'Docker'],
          featured: true,
        },
        {
          id: '2',
          name: 'Incident Tracking System',
          description: 'Real-time incident reporting with automated notifications',
          technologies: ['Python', 'FastAPI', 'React', 'MongoDB'],
          featured: true,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Section id="projects" title="Projects" subtitle="Recent work and contributions">
        <div className="text-center text-muted">Loading projects...</div>
      </Section>
    )
  }

  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Recent work and contributions"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <Card key={project.id} hover>
            <div className="flex flex-col h-full">
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              
              <h3 className="text-xl font-bold text-text mb-2">{project.name}</h3>
              <p className="text-muted mb-4 flex-grow">{project.description}</p>
              
              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex gap-3 mt-auto">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark text-sm font-medium"
                  >
                    GitHub →
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark text-sm font-medium"
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
