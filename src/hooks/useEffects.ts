import { useEffect } from 'react'

type GtagArgs =
  | ['js', Date]
  | ['config', string, Record<string, unknown>?]
  | ['event', string, Record<string, unknown>?]

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: GtagArgs) => void
    plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void
  }
}

export function usePageTracking() {
  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_TRACKING_ID as string | undefined
    if (gaId) {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
      document.head.appendChild(script)

      script.onload = () => {
        window.dataLayer = window.dataLayer || []
        const gtag = (...args: GtagArgs) => {
          window.dataLayer!.push(args)
        }
        window.gtag = gtag
        gtag('js', new Date())
        gtag('config', gaId)
      }
    }

    const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined
    if (plausibleDomain) {
      const script = document.createElement('script')
      script.async = true
      script.defer = true
      script.setAttribute('data-domain', plausibleDomain)
      script.src = 'https://plausible.io/js/script.js'
      document.head.appendChild(script)
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
