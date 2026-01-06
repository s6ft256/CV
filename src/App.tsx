import { useEffect, useCallback } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import GitHubStats from './components/GitHubStats'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import { usePageTracking, useLazyLoadImages, useKeyboardNavigation } from './hooks/useEffects'

export default function App() {
  usePageTracking()
  useLazyLoadImages()
  useKeyboardNavigation()

  const handleSmoothScroll = useCallback((e: Event) => {
    const anchor = e.currentTarget as HTMLAnchorElement
    e.preventDefault()
    const href = anchor.getAttribute('href')
    if (href) {
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }
  }, [])

  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]')
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleSmoothScroll)
    })

    // Cleanup event listeners on unmount
    return () => {
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleSmoothScroll)
      })
    }
  }, [handleSmoothScroll])

  return (
    <ErrorBoundary>
      <div className="app min-h-screen">
        <Navigation />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Hero />
        <main id="main-content" tabIndex={-1}>
          <Experience />
          <Skills />
          <Projects />
          <GitHubStats />
          <Education />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}
