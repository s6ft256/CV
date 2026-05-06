export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (typeof window === 'undefined') return

  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', eventName, properties)
  }

  // Plausible Analytics
  if (window.plausible) {
    window.plausible(eventName, { props: properties })
  }

  // Console log in development
  if (import.meta.env.DEV) {
    console.log('📊 Analytics Event:', eventName, properties)
  }
}

export const trackPageView = (url: string) => {
  trackEvent('page_view', { page_path: url })
}

export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location,
  })
}

export const trackDownload = (fileName: string) => {
  trackEvent('file_download', {
    file_name: fileName,
  })
}

export const trackFormSubmission = (formName: string) => {
  trackEvent('form_submission', {
    form_name: formName,
  })
}
