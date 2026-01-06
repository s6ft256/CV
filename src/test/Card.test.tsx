import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from '../components/Card'

describe('Card', () => {
  it('renders children content', () => {
    render(
      <Card>
        <h3>Test Card</h3>
        <p>Card content</p>
      </Card>
    )
    expect(screen.getByText('Test Card')).toBeInTheDocument()
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies hover styles when hover prop is true', () => {
    const { container } = render(<Card hover>Hover Card</Card>)
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('hover:-translate-y-2')
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>)
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('custom-class')
  })
})
