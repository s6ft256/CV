import { useState, useEffect, lazy, Suspense } from 'react'
import ThemeToggle from './ThemeToggle'

// MiniGame is ~21KB and only needed when the user opens it; lazy-load on demand.
const MiniGame = lazy(() => import('./MiniGame'))

type NavItem = {
  href: string
  label: string
  description?: string
  icon: string
  isSpecial?: boolean
}

const navItems: NavItem[] = [
  { href: '#experience', label: 'Experience', description: 'Work history', icon: '💼' },
  { href: '#skills', label: 'Skills', description: 'Tech stack', icon: '🛠️' },
  { href: '#projects', label: 'Projects', description: 'Selected work', icon: '🚀' },
  { href: '#github-stats', label: 'GitHub', description: 'Open-source activity', icon: '⭐' },
  { href: '#education', label: 'Education', description: 'Academic background', icon: '🎓' },
  { href: '#certifications', label: 'Certifications', description: 'Credentials', icon: '📜' },
  { href: '#contact', label: 'Contact', description: 'Get in touch', icon: '✉️' },
  {
    href: '#game',
    label: 'Game',
    description: 'Memory challenge',
    icon: '🎮',
    isSpecial: true,
  },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isGameOpen, setIsGameOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Find active section
      const sections = navItems.map(item => item.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll while mobile menu is open + close on Escape
  useEffect(() => {
    if (!isMobileMenuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isSpecial?: boolean
  ) => {
    e.preventDefault()

    if (isSpecial && href === '#game') {
      setIsGameOpen(true)
      setIsMobileMenuOpen(false)
      return
    }

    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`
          fixed top-4 left-1/2 -translate-x-1/2 z-50
          hidden lg:flex items-center gap-1
          px-2 py-2 rounded-full
          transition-all duration-300
          ${
            isScrolled
              ? 'bg-card-bg/90 backdrop-blur-lg shadow-lg border border-border'
              : 'bg-transparent'
          }
        `}
      >
        <div className="pl-3 pr-2 border-r border-border/50 mr-1">
          <span className="text-primary font-bold text-xl uppercase tracking-tighter">EN</span>
        </div>
        {navItems.map(item => (
          <a
            key={item.href}
            href={item.href}
            onClick={e => handleNavClick(e, item.href, item.isSpecial)}
            aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
            className={`
              px-4 py-2 rounded-full text-sm font-medium
              transition-all duration-200
              ${
                activeSection === item.href.slice(1)
                  ? 'bg-primary text-[var(--button-text)]'
                  : item.isSpecial
                    ? 'text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 bg-amber-500/5'
                    : 'text-muted hover:text-text hover:bg-surface-hover'
              }
            `}
          >
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden="true" className="text-base leading-none">
                {item.icon}
              </span>
              {item.label}
            </span>
          </a>
        ))}
        <div className="ml-2 pl-2 border-l border-border">
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`
            fixed top-4 right-4 z-50
            w-12 h-12 rounded-full
            flex items-center justify-center
            transition-all duration-300
            ${
              isScrolled || isMobileMenuOpen
                ? 'bg-card-bg/90 backdrop-blur-lg shadow-lg border border-border'
                : 'bg-card-bg/50 backdrop-blur-sm'
            }
          `}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <div className="relative w-5 h-4">
            <span
              className={`absolute left-0 w-5 h-0.5 bg-text transition-all duration-300 ${
                isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-5 h-0.5 bg-text transition-opacity duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 w-5 h-0.5 bg-text transition-all duration-300 ${
                isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
              }`}
            />
          </div>
        </button>

        {/* Theme Toggle (always visible on mobile) */}
        <div
          className={`
            fixed top-4 right-20 z-50
            transition-all duration-300
            ${
              isScrolled
                ? 'bg-card-bg/90 backdrop-blur-lg shadow-lg border border-border rounded-full'
                : ''
            }
          `}
        >
          <ThemeToggle />
        </div>

        {/* Mobile Menu Overlay */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          aria-hidden={!isMobileMenuOpen}
          className={`
            fixed inset-0 z-40
            transition-opacity duration-300
            ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
          `}
        >
          {/* Click-outside backdrop */}
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={isMobileMenuOpen ? 0 : -1}
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 w-full h-full bg-bg/80 backdrop-blur-lg cursor-default"
          />

          {/* Drawer */}
          <div
            className={`
              relative ml-auto h-full w-full max-w-sm
              bg-card-bg/95 backdrop-blur-xl
              border-l border-border
              shadow-2xl
              flex flex-col
              transition-transform duration-300 ease-out
              ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
          >
            <div className="flex items-center justify-between px-6 pt-20 pb-4 border-b border-border/40">
              <span className="text-sm font-semibold tracking-wider uppercase text-muted">
                Navigation
              </span>
              <span className="text-xs text-muted/70" aria-hidden="true">
                ESC to close
              </span>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.slice(1)
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={e => handleNavClick(e, item.href, item.isSpecial)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`
                      flex items-center gap-4 px-4 py-3 rounded-xl
                      transition-all duration-200
                      ${
                        isActive
                          ? 'bg-primary/15 border border-primary/40 text-text'
                          : item.isSpecial
                            ? 'text-amber-400 bg-amber-500/5 border border-amber-500/20 hover:bg-amber-500/10'
                            : 'text-text hover:bg-surface-hover border border-transparent'
                      }
                    `}
                    style={{
                      animationDelay: `${index * 40}ms`,
                      animation: isMobileMenuOpen ? 'fadeInUp 0.4s ease-out forwards' : 'none',
                      opacity: isMobileMenuOpen ? undefined : 0,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className={`
                        flex items-center justify-center w-10 h-10 rounded-lg
                        text-xl flex-shrink-0
                        ${isActive ? 'bg-primary/20' : 'bg-surface-hover'}
                      `}
                    >
                      {item.icon}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-base font-semibold leading-tight">
                        {item.label}
                      </span>
                      {item.description && (
                        <span className="block text-xs text-muted mt-0.5 truncate">
                          {item.description}
                        </span>
                      )}
                    </span>
                    <svg
                      className={`w-4 h-4 flex-shrink-0 transition-transform ${
                        isActive ? 'text-primary translate-x-1' : 'text-muted/60'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                )
              })}
            </nav>
          </div>
        </div>
      </div>

      {isGameOpen && (
        <Suspense fallback={null}>
          <MiniGame isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
        </Suspense>
      )}
    </>
  )
}
