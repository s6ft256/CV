import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../components/Hero'

// Mock pdfExport to avoid actual PDF generation in tests
vi.mock('../utils/pdfExport', () => ({
  generateResumePDF: vi.fn(),
}))

describe('Hero', () => {
  it('renders the name', () => {
    render(<Hero />)
    expect(screen.getByText('Elius Niwamanya')).toBeInTheDocument()
  })

  it('renders the title/eyebrow', () => {
    render(<Hero />)
    expect(screen.getByText(/Full-Stack Developer/i)).toBeInTheDocument()
  })

  it('renders the summary', () => {
    render(<Hero />)
    expect(screen.getByText(/Full-stack engineer/i)).toBeInTheDocument()
  })

  it('renders contact button with WhatsApp link', () => {
    render(<Hero />)
    const contactBtn = screen.getByRole('link', { name: /Contact Me/i })
    expect(contactBtn).toHaveAttribute('href', expect.stringContaining('wa.me'))
  })

  it('renders View Projects button', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /View Projects/i })).toBeInTheDocument()
  })

  it('renders Resume button', () => {
    render(<Hero />)
    expect(screen.getByRole('button', { name: /Resume/i })).toBeInTheDocument()
  })

  it('renders scroll indicator', () => {
    render(<Hero />)
    expect(screen.getByLabelText(/Scroll to experience section/i)).toBeInTheDocument()
  })
})
