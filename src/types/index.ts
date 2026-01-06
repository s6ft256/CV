export interface PersonalInfo {
  name: string
  title: string
  summary: string
  email: string
  phone: string
  whatsapp: string
  github: string
  linkedin: string
  location?: string
}

export interface Experience {
  id: string
  title: string
  company: string
  companyLogo?: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string[]
  technologies?: string[]
}

export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  description?: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  category?: 'HSE & Safety' | 'AI & Technology' | 'Business & Professional' | 'IT & Cybersecurity'
  imageUrl?: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  featured?: boolean
}

export interface Skill {
  name: string
  category: string
  proficiency: number // 1-5
}

export interface SkillCategory {
  name: string
  skills: Skill[]
}
