import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Experience from '../components/Experience'

describe('Experience', () => {
  it('renders section title', () => {
    render(<Experience />)
    expect(screen.getByText('Experience')).toBeInTheDocument()
  })

  it('renders section subtitle', () => {
    render(<Experience />)
    expect(screen.getByText(/professional journey/i)).toBeInTheDocument()
  })

  it('renders experience cards', () => {
    render(<Experience />)
    // Should render at least one job title from resume data
    expect(screen.getByText(/Senior Full-Stack Developer/i)).toBeInTheDocument()
  })

  it('renders company name', () => {
    render(<Experience />)
    expect(screen.getByText('Example Corp')).toBeInTheDocument()
  })

  it('renders location', () => {
    render(<Experience />)
    expect(screen.getByText(/Dubai, UAE/i)).toBeInTheDocument()
  })

  it('renders current badge for active position', () => {
    render(<Experience />)
    expect(screen.getByText('Current')).toBeInTheDocument()
  })

  it('renders technologies', () => {
    render(<Experience />)
    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('Django')).toBeInTheDocument()
  })
})
