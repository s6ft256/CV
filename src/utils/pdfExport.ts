import { personalInfo } from '../data/resume'
import { trackDownload } from '../utils/analytics'

export const generateResumePDF = () => {
  // For now, this will trigger a browser print dialog
  // In production, you could integrate with a PDF generation library
  trackDownload('resume.pdf')
  window.print()
}

export const downloadResume = () => {
  // Alternative: If you have a pre-generated PDF file
  const link = document.createElement('a')
  link.href = '/resume.pdf' // Place your PDF in public folder
  link.download = `${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  trackDownload('resume.pdf')
}
