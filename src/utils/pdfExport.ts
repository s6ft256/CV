import { personalInfo } from '../data/resume'
import { trackDownload } from '../utils/analytics'

export const generateResumePDF = () => {
  // Track the download event
  trackDownload('resume.pdf')

  // Add print-specific class to body for better styling
  document.body.classList.add('printing-resume')

  // Force all reveal elements to be visible before printing
  const revealElements = document.querySelectorAll('.reveal')
  revealElements.forEach(el => {
    el.setAttribute('data-revealed', 'true')
  })

  // Small delay to ensure DOM updates
  setTimeout(() => {
    // Trigger browser print dialog
    window.print()

    // Remove the class after print dialog closes
    setTimeout(() => {
      document.body.classList.remove('printing-resume')
    }, 1000)
  }, 100)
}

export const downloadResume = () => {
  // Track the download event
  trackDownload('resume.pdf')

  // Check if a pre-generated PDF exists
  const link = document.createElement('a')
  link.href = '/resume.pdf' // Place your PDF in public folder
  link.download = `${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`

  // Handle error if PDF doesn't exist
  link.onerror = () => {
    console.warn('Resume PDF not found, falling back to print')
    generateResumePDF()
  }

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const printResume = () => {
  // Alias for generateResumePDF for clarity
  generateResumePDF()
}
