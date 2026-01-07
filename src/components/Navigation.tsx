import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'
import MiniGame from './MiniGame'

const navItems = [
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#github-stats', label: 'GitHub' },
  { href: '#education', label: 'Education' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
  { href: '#game', label: 'Game', isSpecial: true },
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
            {item.isSpecial ? '🎮' : ''} {item.label}
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
          className={`
            fixed inset-0 z-40
            bg-bg/95 backdrop-blur-lg
            transition-all duration-300
            ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
          `}
        >
          <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={e => handleNavClick(e, item.href, item.isSpecial)}
                className={`
                  text-2xl font-medium py-3 px-8 rounded-full
                  transition-all duration-300
                  ${
                    activeSection === item.href.slice(1)
                      ? 'bg-primary text-[var(--button-text)]'
                      : item.isSpecial
                        ? 'text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 bg-amber-500/5'
                        : 'text-muted hover:text-text hover:bg-surface-hover'
                  }
                `}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isMobileMenuOpen ? 'fadeInUp 0.5s ease-out forwards' : 'none',
                }}
              >
                {item.isSpecial ? '🎮 ' : ''}
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <MiniGame isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
    </>
  )
}
