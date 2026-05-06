import { useEffect, useRef } from 'react'

/**
 * Adds a `data-revealed="true"` attribute to the element when it scrolls into view.
 * Pair with the `.reveal` CSS class (defined in src/index.css) to animate.
 *
 * Honors `prefers-reduced-motion`: in that case the element is revealed immediately.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (reduced || !('IntersectionObserver' in window)) {
      node.setAttribute('data-revealed', 'true')
      return
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          ;(entry.target as HTMLElement).setAttribute('data-revealed', 'true')
          observer.unobserve(entry.target)
        }
      })
    }, options)

    observer.observe(node)
    return () => observer.disconnect()
  }, [options])

  return ref
}
