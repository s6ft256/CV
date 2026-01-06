import { personalInfo } from '../data/resume'
import Button from './Button'
import ThemeToggle from './ThemeToggle'
import { generateResumePDF } from '../utils/pdfExport'

export default function Hero() {
  return (
    <header className="hero min-h-screen flex items-center relative" id="top">
      <div className="container mx-auto max-w-[var(--max-width)] px-4">
        <div className="hero__content max-w-4xl">
          <p className="hero__eyebrow text-primary font-semibold mb-4 tracking-wide">
            {personalInfo.title}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{personalInfo.name}</h1>
          <p className="hero__summary text-xl md:text-2xl text-muted mb-8 max-w-3xl">
            {personalInfo.summary}
          </p>
          <div className="hero__cta flex flex-wrap gap-4 items-center">
            <Button
              href={`https://wa.me/${personalInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
            >
              Contact Me
            </Button>
            <Button href="#projects" variant="ghost" size="lg">
              View Projects
            </Button>
            <Button onClick={generateResumePDF} variant="outline" size="lg">
              Download Resume
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#experience" aria-label="Scroll to experience section">
          <svg
            className="w-6 h-6 text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </header>
  )
}
