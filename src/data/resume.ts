import { PersonalInfo, Experience, Education, Certification, SkillCategory } from '../types'

export const personalInfo: PersonalInfo = {
  name: 'Elius Niwamanya',
  title: 'Full-Stack Developer & IOSH-Certified HSE Personnel',
  summary:
    'Full-stack engineer uniting Python, Django, and modern JavaScript frameworks with IOSH-informed HSE leadership. Designs security-conscious tools that automate reporting, uphold compliance, and keep teams aligned on safety.',
  email: import.meta.env.VITE_EMAIL || 'contact@elius.pro',
  phone: import.meta.env.VITE_PHONE || '+971563892557',
  whatsapp: import.meta.env.VITE_WHATSAPP || '971563892557',
  github: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME || 's6ft256'}`,
  linkedin: import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/elius-niwamanya',
  location: 'UAE',
}

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Senior Full-Stack Developer',
    company: 'Example Corp',
    location: 'Dubai, UAE',
    startDate: '2023-01',
    endDate: '',
    current: true,
    description: [
      'Led development of enterprise safety management platform using Django and React',
      'Implemented automated compliance reporting reducing manual work by 80%',
      'Architected microservices infrastructure handling 10,000+ daily transactions',
    ],
    technologies: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker', 'AWS'],
  },
  // Add more experiences as needed
]

export const education: Education[] = [
  {
    id: '1',
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University Name',
    location: 'City, Country',
    startDate: '2015',
    endDate: '2019',
    description: 'Focused on software engineering and data structures',
  },
]

export const certifications: Certification[] = [
  {
    id: '1',
    name: 'IOSH Managing Safely',
    issuer: 'Institution of Occupational Safety and Health',
    issueDate: '2022-03',
    credentialId: 'IOSH-123456',
  },
]

export const skillCategories: SkillCategory[] = [
  {
    name: 'Backend Development',
    skills: [
      { name: 'Python', category: 'Backend Development', proficiency: 5 },
      { name: 'Django', category: 'Backend Development', proficiency: 5 },
      { name: 'FastAPI', category: 'Backend Development', proficiency: 4 },
      { name: 'Node.js', category: 'Backend Development', proficiency: 4 },
      { name: 'PostgreSQL', category: 'Backend Development', proficiency: 4 },
    ],
  },
  {
    name: 'Frontend Development',
    skills: [
      { name: 'React', category: 'Frontend Development', proficiency: 5 },
      { name: 'TypeScript', category: 'Frontend Development', proficiency: 4 },
      { name: 'JavaScript', category: 'Frontend Development', proficiency: 5 },
      { name: 'Tailwind CSS', category: 'Frontend Development', proficiency: 5 },
      { name: 'Next.js', category: 'Frontend Development', proficiency: 4 },
    ],
  },
  {
    name: 'DevOps & Tools',
    skills: [
      { name: 'Docker', category: 'DevOps & Tools', proficiency: 4 },
      { name: 'AWS', category: 'DevOps & Tools', proficiency: 3 },
      { name: 'Git', category: 'DevOps & Tools', proficiency: 5 },
      { name: 'CI/CD', category: 'DevOps & Tools', proficiency: 4 },
    ],
  },
  {
    name: 'HSE & Compliance',
    skills: [
      { name: 'Safety Management Systems', category: 'HSE & Compliance', proficiency: 4 },
      { name: 'Risk Assessment', category: 'HSE & Compliance', proficiency: 4 },
      { name: 'Incident Reporting', category: 'HSE & Compliance', proficiency: 5 },
      { name: 'Compliance Auditing', category: 'HSE & Compliance', proficiency: 4 },
    ],
  },
]
