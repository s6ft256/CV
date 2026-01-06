import { useEffect } from 'react'

export function usePageTracking() {
  useEffect(() => {
    // Track initial page load
    if (import.meta.env.VITE_GA_TRACKING_ID) {
      // Initialize Google Analytics
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_TRACKING_ID}`
      document.head.appendChild(script)

      script.onload = () => {
        ;(window as any).dataLayer = (window as any).dataLayer || []
        function gtag(...args: any[]) {
          ;(window as any).dataLayer.push(arguments)
        }
        ;(window as any).gtag = gtag
        gtag('js', new Date())
        gtag('config', import.meta.env.VITE_GA_TRACKING_ID)
      }
    }

    // Initialize Plausible Analytics
    if (import.meta.env.VITE_PLAUSIBLE_DOMAIN) {
      const script = document.createElement('script')
      script.async = true
      script.defer = true
      script.setAttribute('data-domain', import.meta.env.VITE_PLAUSIBLE_DOMAIN)
      script.src = 'https://plausible.io/js/script.js'
      document.head.appendChild(script)
    }
  }, [])
}

export function useLazyLoadImages() {
  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.removeAttribute('data-src')
              observer.unobserve(img)
            }
          }
        })
      })

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img)
      })

      return () => imageObserver.disconnect()
    }
  }, [])
}

export function useKeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip to main content on '/' key
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        const main = document.querySelector('main')
        if (main) {
          e.preventDefault()
          main.focus()
          main.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])
}
