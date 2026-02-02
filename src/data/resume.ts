import {
  PersonalInfo,
  Experience,
  Education,
  Certification,
  SkillCategory,
  Project,
} from '../types'

export const projects: Project[] = [
  {
    id: '1',
    name: 'PDF Extractor For Me',
    description:
      'A web app to extract text and data from PDF files with a user-friendly interface.',
    technologies: ['React', 'Node.js', 'Express', 'PDF.js'],
    githubUrl: 'https://github.com/s6ft256/PDFExtractorForme.git',
    liveUrl: 'https://pdfextractorforme.onrender.com',
    featured: true,
  },
  {
    id: '2',
    name: 'HSE Guardian',
    description: 'Incident image capture and reporting system for safety management in the field.',
    technologies: ['React', 'Vercel', 'Cloud Storage'],
    liveUrl: 'https://incident-image-taking-system.vercel.app/',
    featured: true,
  },
  {
    id: '3',
    name: 'CV EXTRACTOR',
    description: 'A live web app for extracting CV/resume data from PDF files. Try it online!',
    technologies: ['React', 'Node.js', 'Express', 'PDF.js'],
    liveUrl: 'https://pdfextractorforme.onrender.com/',
    featured: true,
  },
]

export const personalInfo: PersonalInfo = {
  name: 'Elius Niwamanya',
  title: 'Full-Stack Developer & IOSH-Certified HSE Personnel',
  summary:
    'Full-stack engineer uniting Python, Django, and modern JavaScript frameworks with IOSH-informed HSE leadership. Designs security-conscious tools that automate reporting, uphold compliance, and keep teams aligned on safety.',
  email: import.meta.env.VITE_EMAIL || 'niwamanyaelius95@gmail.com',
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
    company: 'Trojan Construction Group',
    companyLogo:
      'https://trojanconstruction.group/storage/subsidiaries/May2024/rehLTrUcmNB1tlhPsMn9.png',
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
  {
    id: '2',
    title: 'care car',
    company: 'freelance',
    location: 'uganda developer remote',
    startDate: '2020-06',
    endDate: '',
    current: false,
    description: [
      'Designed and implemented digital HSE reporting tools for construction and industrial clients',
      'Developed custom incident management and risk assessment web apps using Django and React',
      'Automated safety audit workflows, improving compliance and reducing paperwork',
      'Integrated analytics dashboards for real-time safety KPI tracking',
      'Provided HSE training and digital transformation consulting for safety teams',
      'Delivered projects for clients in construction, oil & gas, and logistics sectors',
    ],
    technologies: ['Python', 'Django', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'Power BI'],
  },
  // Add more experiences as needed
]

export const education: Education[] = [
  {
    id: '1',
    degree: 'Diploma in computer science',
    institution: 'UICT Nakawa',
    location: 'Kampala city, Uganda',
    startDate: '2014',
    endDate: '2018',
    description: '',
  },
]

export const certifications: Certification[] = [
  // HSE & Safety
  {
    id: '1',
    name: 'IOSH Managing Safely',
    issuer: 'Institution of Occupational Safety and Health',
    issueDate: '2024',
    credentialId: 'IOSH-MS',
    credentialUrl: '/iosh.pdf',
    category: 'HSE & Safety',
  },
  {
    id: '2',
    name: 'GitHub Certification',
    issuer: 'GitHub',
    issueDate: '2024',
    credentialUrl: '/gh.jpg',
    category: 'IT & Cybersecurity',
    imageUrl: '/gh.jpg',
  },
  // AI & Technology
  {
    id: '3',
    name: 'AI for Beginners',
    issuer: 'Professional Development Institute',
    issueDate: '2024',
    credentialUrl: '/AI%20for%20Beginners.pdf',
    category: 'AI & Technology',
  },
  {
    id: '4',
    name: 'AI for Business Professionals',
    issuer: 'Professional Development Institute',
    issueDate: '2024',
    credentialUrl: '/AI%20for%20Business%20Professionals.pdf',
    category: 'AI & Technology',
  },
  // IT & Cybersecurity
  {
    id: '5',
    name: 'Introduction to Cybersecurity Awareness',
    issuer: 'Professional Development Institute',
    issueDate: '2024',
    credentialUrl: '/Introduction%20to%20Cybersecurity%20Awareness.pdf',
    category: 'IT & Cybersecurity',
  },
  {
    id: '6',
    name: 'IT for Business Success',
    issuer: 'Professional Development Institute',
    issueDate: '2024',
    credentialUrl: '/IT%20for%20Business%20Success.pdf',
    category: 'IT & Cybersecurity',
  },
  // Business & Professional
  {
    id: '7',
    name: 'Business Email',
    issuer: 'Professional Development Institute',
    issueDate: '2024',
    credentialUrl: '/Business%20Email.pdf',
    category: 'Business & Professional',
  },
  {
    id: '8',
    name: 'Customer Experience (CX) for Business Success',
    issuer: 'Professional Development Institute',
    issueDate: '2024',
    credentialUrl: '/Customer%20Experience%20(CX)%20for%20Business%20Success.pdf',
    category: 'Business & Professional',
  },
  {
    id: '9',
    name: 'Inventory Management',
    issuer: 'Professional Development Institute',
    issueDate: '2024',
    credentialUrl: '/Inventory%20Management.pdf',
    category: 'Business & Professional',
  },
  {
    id: '10',
    name: 'Presenting Data',
    issuer: 'Professional Development Institute',
    issueDate: '2024',
    credentialUrl: '/Presenting%20Data.pdf',
    category: 'Business & Professional',
  },
  {
    id: '11',
    name: 'Professional Networking for Career Growth',
    issuer: 'Professional Development Institute',
    issueDate: '2024',
    credentialUrl: '/Professional%20Networking%20for%20Career%20Growth.pdf',
    category: 'Business & Professional',
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
