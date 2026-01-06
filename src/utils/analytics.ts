export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties)
  }

  // Plausible Analytics
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(eventName, { props: properties })
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
