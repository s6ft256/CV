import { useState, useEffect, lazy, Suspense } from 'react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'

// MiniGame is ~21KB and only needed when the user opens it; lazy-load on demand.
const MiniGame = lazy(() => import('./MiniGame'))

type NavItem = {
  href: string
  label: string
  description?: string
  icon: ReactNode
  isSpecial?: boolean
}

const navItems: NavItem[] = [
  {
    href: '#about',
    label: 'nav.about',
    description: 'Who I am',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    ),
  },
  {
    href: '#experience',
    label: 'nav.experience',
    description: 'Work history',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.193.163-.43.295-.69.38-2.695.888-5.517 1.34-8.31 1.34-2.793 0-5.615-.452-8.31-1.34a2.2 2.2 0 0 1-.69-.38m0 0V8.706c0-1.081.768-2.015 1.837-2.175a48.107 48.107 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
        />
      </svg>
    ),
  },
  {
    href: '#skills',
    label: 'nav.skills',
    description: 'Tech stack',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
        />
      </svg>
    ),
  },
  {
    href: '#projects',
    label: 'nav.projects',
    description: 'Selected work',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
        />
      </svg>
    ),
  },
  {
    href: '#github-stats',
    label: 'nav.github',
    description: 'Open-source activity',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12Z" />
      </svg>
    ),
  },
  {
    href: '#education',
    label: 'nav.education',
    description: 'Academic background',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
        />
      </svg>
    ),
  },
  {
    href: '#certifications',
    label: 'nav.certifications',
    description: 'Credentials',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
        />
      </svg>
    ),
  },
  {
    href: '#contact',
    label: 'nav.contact',
    description: 'Get in touch',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
  {
    href: '#game',
    label: 'nav.minigame',
    description: 'Memory challenge',
    isSpecial: true,
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"
        />
      </svg>
    ),
  },
]

export default function Navigation() {
  const { t } = useTranslation()
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
        <div className="pl-2 pr-2 border-r border-border/50 mr-1">
          <LanguageSwitcher />
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
              {t(item.label)}
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
                        {t(item.label)}
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
