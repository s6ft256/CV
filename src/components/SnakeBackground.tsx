import { useEffect, useRef } from 'react'

export default function SnakeBackground() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const width = window.innerWidth
    const height = window.innerHeight

    // Clear any existing paths
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild)
    }

    // Create red snake path
    const redSnakePath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    redSnakePath.setAttribute('stroke', '#ef4444')
    redSnakePath.setAttribute('stroke-width', '1.5')
    redSnakePath.setAttribute('fill', 'none')
    redSnakePath.setAttribute('stroke-linecap', 'round')
    redSnakePath.setAttribute('stroke-linejoin', 'round')
    redSnakePath.setAttribute('opacity', '0.7')

    // Create blue snake path
    const blueSnakePath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    blueSnakePath.setAttribute('stroke', '#3b82f6')
    blueSnakePath.setAttribute('stroke-width', '1.5')
    blueSnakePath.setAttribute('fill', 'none')
    blueSnakePath.setAttribute('stroke-linecap', 'round')
    blueSnakePath.setAttribute('stroke-linejoin', 'round')
    blueSnakePath.setAttribute('opacity', '0.7')

    svg.appendChild(redSnakePath)
    svg.appendChild(blueSnakePath)

    // Snake movement parameters - realistic snake motion
    let time = 0
    const speed = 0.03
    const snakeLength = 15 // Number of segments in snake body
    const segmentSpacing = 8 // Distance between segments

    // Store red snake body positions
    const redSnakeBody: { x: number; y: number }[] = []
    // Store blue snake body positions
    const blueSnakeBody: { x: number; y: number }[] = []

    // Initialize red snake body
    for (let i = 0; i < snakeLength; i++) {
      redSnakeBody.push({
        x: width / 2,
        y: height / 2 + i * segmentSpacing,
      })
    }

    // Initialize blue snake body (opposite starting position)
    for (let i = 0; i < snakeLength; i++) {
      blueSnakeBody.push({
        x: width / 2,
        y: height / 2 - i * segmentSpacing,
      })
    }

    // Generate snake path with realistic movement
    function generateSnakePath(snakeBody: { x: number; y: number }[]): string {
      if (snakeBody.length === 0) return ''

      let path = `M ${snakeBody[0].x} ${snakeBody[0].y}`

      for (let i = 1; i < snakeBody.length; i++) {
        // Use quadratic bezier curves for smooth snake body
        const prev = snakeBody[i - 1]
        const curr = snakeBody[i]
        const midX = (prev.x + curr.x) / 2
        const midY = (prev.y + curr.y) / 2
        path += ` Q ${prev.x} ${prev.y} ${midX} ${midY}`
      }

      // Add final point
      const last = snakeBody[snakeBody.length - 1]
      path += ` L ${last.x} ${last.y}`

      return path
    }

    // Animation loop with realistic snake movement
    let animationId: number
    function animate() {
      time += speed

      // Red snake head movement - traverse entire screen
      const redHeadX = width / 2 + Math.sin(time * 0.5) * (width * 0.45)
      const redHeadY = height / 2 + Math.cos(time * 0.3) * (height * 0.45)

      // Blue snake head movement - opposite direction
      const blueHeadX = width / 2 + Math.sin(time * 0.5 + Math.PI) * (width * 0.45)
      const blueHeadY = height / 2 + Math.cos(time * 0.3 + Math.PI) * (height * 0.45)

      // Update red snake head position
      redSnakeBody[0] = { x: redHeadX, y: redHeadY }

      // Update blue snake head position
      blueSnakeBody[0] = { x: blueHeadX, y: blueHeadY }

      // Red snake body follows head with delay (snake-like movement)
      for (let i = 1; i < redSnakeBody.length; i++) {
        const prev = redSnakeBody[i - 1]
        const curr = redSnakeBody[i]

        // Calculate direction to previous segment
        const dx = prev.x - curr.x
        const dy = prev.y - curr.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Move towards previous segment
        const followSpeed = 0.15
        const targetDistance = segmentSpacing

        if (distance > targetDistance) {
          const moveX = (dx / distance) * (distance - targetDistance) * followSpeed
          const moveY = (dy / distance) * (distance - targetDistance) * followSpeed
          curr.x += moveX
          curr.y += moveY
        }
      }

      // Blue snake body follows head with delay (snake-like movement)
      for (let i = 1; i < blueSnakeBody.length; i++) {
        const prev = blueSnakeBody[i - 1]
        const curr = blueSnakeBody[i]

        // Calculate direction to previous segment
        const dx = prev.x - curr.x
        const dy = prev.y - curr.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Move towards previous segment
        const followSpeed = 0.15
        const targetDistance = segmentSpacing

        if (distance > targetDistance) {
          const moveX = (dx / distance) * (distance - targetDistance) * followSpeed
          const moveY = (dy / distance) * (distance - targetDistance) * followSpeed
          curr.x += moveX
          curr.y += moveY
        }
      }

      redSnakePath.setAttribute('d', generateSnakePath(redSnakeBody))
      blueSnakePath.setAttribute('d', generateSnakePath(blueSnakeBody))

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      svg.setAttribute('width', window.innerWidth.toString())
      svg.setAttribute('height', window.innerHeight.toString())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <svg
        ref={svgRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </div>
  )
}
