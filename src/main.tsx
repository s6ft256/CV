import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import '../styles.css'
import './index.css'
import './i18n'

// Register service worker for PWA support
if ('serviceWorker' in window && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      registration => {
        console.log('SW registered: ', registration)
      },
      registrationError => {
        console.log('SW registration failed: ', registrationError)
      }
    )
  })
}

const el =
  document.getElementById('root') ||
  (() => {
    const d = document.createElement('div')
    d.id = 'root'
    document.body.appendChild(d)
    return d
  })()

createRoot(el).render(
  <StrictMode>
    <App />
  </StrictMode>
)
