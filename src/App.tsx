import { useEffect, useCallback, lazy, Suspense } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ErrorBoundary from './components/ErrorBoundary'
import { usePageTracking, useLazyLoadImages, useKeyboardNavigation } from './hooks/useEffects'

// Lazy load below-the-fold components for better initial load performance
const Experience = lazy(() => import('./components/Experience'))
const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const GitHubStats = lazy(() => import('./components/GitHubStats'))
const Education = lazy(() => import('./components/Education'))
const Certifications = lazy(() => import('./components/Certifications'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

// Loading fallback component
function SectionLoader() {
  return (
    <div className="py-20 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-muted text-sm">Loading...</span>
      </div>
    </div>
  )
}

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
          <Suspense fallback={<SectionLoader />}>
            <Experience />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Skills />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <GitHubStats />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Education />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Certifications />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}
