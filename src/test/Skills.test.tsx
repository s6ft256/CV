import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Skills from '../components/Skills'

describe('Skills', () => {
  it('renders section title', () => {
    render(<Skills />)
    expect(screen.getByText('Skills & Expertise')).toBeInTheDocument()
  })

  it('renders section subtitle', () => {
    render(<Skills />)
    expect(screen.getByText(/Technologies and tools/i)).toBeInTheDocument()
  })

  it('renders skill categories', () => {
    render(<Skills />)
    expect(screen.getByText('Backend Development')).toBeInTheDocument()
    expect(screen.getByText('Frontend Development')).toBeInTheDocument()
    expect(screen.getByText('DevOps & Tools')).toBeInTheDocument()
    expect(screen.getByText('HSE & Compliance')).toBeInTheDocument()
  })

  it('renders individual skills', () => {
    render(<Skills />)
    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()
  })

  it('renders proficiency indicators', () => {
    render(<Skills />)
    // Should have star ratings displayed (SVG stars)
    const stars = document.querySelectorAll('svg[viewBox="0 0 20 20"]')
    expect(stars.length).toBeGreaterThan(0)
  })

  it('renders progress bars', () => {
    render(<Skills />)
    // Progress bars should be present for each skill (now using gradient backgrounds)
    const progressBars = document.querySelectorAll('.bg-gradient-to-r.rounded-full')
    expect(progressBars.length).toBeGreaterThan(0)
  })
})
