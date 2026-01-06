import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import '../styles.css'
import './index.css'

const el = document.getElementById('root') || (() => {
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
