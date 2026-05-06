import { lazy, Suspense } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ErrorBoundary from './components/ErrorBoundary'
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
        <Suspense fallback={<SectionLoader />}>
          <HSEHighlights />
        </Suspense>
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
            <QrImplementation />
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
      <ScrollToTop />
    </ErrorBoundary>
  )
}
