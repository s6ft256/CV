import { lazy, Suspense, useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ErrorBoundary from './components/ErrorBoundary'
import SectionErrorBoundary from './components/SectionErrorBoundary'
import ScrollProgress from './components/ScrollProgress'
import ScrollToTop from './components/ScrollToTop'
import { usePageTracking, useKeyboardNavigation } from './hooks/useEffects'

// Lazy load below-the-fold components for better initial load performance
const About = lazy(() => import('./components/About'))
const HSEHighlights = lazy(() => import('./components/HSEHighlights'))
const Experience = lazy(() => import('./components/Experience'))
const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const QrImplementation = lazy(() => import('./components/QrImplementation'))
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
  useKeyboardNavigation()

  // Start at top on full page reload
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  // Smooth scrolling is handled via CSS (html { scroll-behavior: smooth })
  // and by Navigation's click handler. Avoids stale listeners on lazy-mounted
  // sections and respects prefers-reduced-motion via CSS.

  return (
    <ErrorBoundary>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ScrollProgress />
      <div className="app min-h-screen">
        <Navigation />
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <main id="main-content" tabIndex={-1}>
          <Suspense fallback={<SectionLoader />}>
            <SectionErrorBoundary sectionName="Experience">
              <Experience />
            </SectionErrorBoundary>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <SectionErrorBoundary sectionName="Skills">
              <Skills />
            </SectionErrorBoundary>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <SectionErrorBoundary sectionName="Projects">
              <Projects />
            </SectionErrorBoundary>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <SectionErrorBoundary sectionName="QR Implementation">
              <QrImplementation />
            </SectionErrorBoundary>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <SectionErrorBoundary sectionName="HSE Highlights">
              <HSEHighlights />
            </SectionErrorBoundary>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <SectionErrorBoundary sectionName="GitHub Stats">
              <GitHubStats />
            </SectionErrorBoundary>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <SectionErrorBoundary sectionName="Education">
              <Education />
            </SectionErrorBoundary>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <SectionErrorBoundary sectionName="Certifications">
              <Certifications />
            </SectionErrorBoundary>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <SectionErrorBoundary sectionName="Contact">
              <Contact />
            </SectionErrorBoundary>
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
      <ScrollToTop />
    </ErrorBoundary>
  )
}
