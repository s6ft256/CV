import { useState, useEffect, useCallback, useRef } from 'react'

interface GameState {
  pattern: number[]
  userInput: number[]
  currentLevel: number
  showingPattern: boolean
  gameOver: boolean
  score: number
  isPlaying: boolean
  streak: number
  highScore: number
  timeLeft: number
  multiplier: number
  particles: Particle[]
  perfectRounds: number
  showCelebration: boolean
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
}

const GRID_SIZE = 3
const SHOW_PATTERN_TIME = 800
const TIME_PER_LEVEL = 15000
const PERFECT_STREAK_THRESHOLD = 3

export default function MiniGame({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [gameState, setGameState] = useState<GameState>({
    pattern: [],
    userInput: [],
    currentLevel: 1,
    showingPattern: false,
    gameOver: false,
    score: 0,
    isPlaying: false,
    streak: 0,
    highScore: parseInt(localStorage.getItem('memory_challenge_best') || '0'),
    timeLeft: TIME_PER_LEVEL,
    multiplier: 1,
    particles: [],
    perfectRounds: 0,
    showCelebration: false,
  })

  const gameLoopRef = useRef<number>()
  const timerRef = useRef<number>()
  const audioContextRef = useRef<AudioContext>()
  const particleIdRef = useRef(0)

  // Sound effects using Web Audio API
  const playSound = useCallback(
    (frequency: number, duration: number, type: 'sine' | 'square' | 'triangle' = 'sine') => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)

      oscillator.frequency.value = frequency
      oscillator.type = type

      gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContextRef.current.currentTime + duration
      )

      oscillator.start(audioContextRef.current.currentTime)
      oscillator.stop(audioContextRef.current.currentTime + duration)
    },
    []
  )

  // Create explosion particles
  const createParticles = useCallback(
    (x: number, y: number, count: number = 15, color: string = '#60a5fa') => {
      const newParticles: Particle[] = []
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: particleIdRef.current++,
          x,
          y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          life: 1,
          maxLife: 1,
          color,
        })
      }
      setGameState(prev => ({
        ...prev,
        particles: [...prev.particles, ...newParticles],
      }))
    },
    []
  )

  const updateParticles = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      particles: prev.particles
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.2, // gravity
          life: p.life - 0.02,
        }))
        .filter(p => p.life > 0),
    }))
  }, [])

  const generatePattern = useCallback((level: number) => {
    const baseLength = Math.min(3 + Math.floor(level / 2), 9)
    const bonusLength = level > 5 ? Math.floor(level / 3) : 0
    const patternLength = Math.min(baseLength + bonusLength, 9)
    const pattern = []

    // Ensure no immediate repeats for better challenge
    let lastIndex = -1
    for (let i = 0; i < patternLength; i++) {
      let index
      do {
        index = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE))
      } while (index === lastIndex && GRID_SIZE * GRID_SIZE > 1)
      pattern.push(index)
      lastIndex = index
    }
    return pattern
  }, [])

  const startGame = useCallback(() => {
    const pattern = generatePattern(1)
    setGameState(prev => ({
      pattern,
      userInput: [],
      currentLevel: 1,
      showingPattern: true,
      gameOver: false,
      score: 0,
      isPlaying: true,
      streak: 0,
      timeLeft: TIME_PER_LEVEL,
      multiplier: 1,
      particles: [],
      perfectRounds: 0,
      showCelebration: false,
      highScore: prev.highScore,
    }))

    // Play start sound
    playSound(523, 0.2, 'sine') // C note

    setTimeout(() => {
      setGameState(prev => ({ ...prev, showingPattern: false }))
      // Start timer
      timerRef.current = window.setInterval(() => {
        setGameState(prev => {
          if (prev.timeLeft <= 100) {
            // Game over due to time
            clearInterval(timerRef.current)
            playSound(200, 0.5, 'square') // Game over sound
            return { ...prev, gameOver: true, isPlaying: false, timeLeft: 0 }
          }
          return { ...prev, timeLeft: prev.timeLeft - 100 }
        })
      }, 100)
    }, SHOW_PATTERN_TIME + 500)
  }, [generatePattern, playSound])

  const handleCellClick = useCallback(
    (index: number) => {
      if (gameState.showingPattern || gameState.gameOver || !gameState.isPlaying) return

      const newUserInput = [...gameState.userInput, index]

      // Play click sound
      playSound(800 + index * 100, 0.1, 'sine')

      // Check if the input matches the pattern so far
      const isCorrect = gameState.pattern
        .slice(0, newUserInput.length)
        .every((val, i) => val === newUserInput[i])

      if (!isCorrect) {
        // Wrong answer - game over
        clearInterval(timerRef.current)
        playSound(150, 0.8, 'square') // Error sound

        // Save high score
        if (gameState.score > gameState.highScore) {
          localStorage.setItem('memory_challenge_best', gameState.score.toString())
        }

        setGameState(prev => ({
          ...prev,
          gameOver: true,
          isPlaying: false,
          highScore: Math.max(prev.score, prev.highScore),
        }))

        // Create error particles
        const rect = document.querySelector('.grid-container')?.getBoundingClientRect()
        if (rect) {
          createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 20, '#ef4444')
        }
        return
      }

      // Check if pattern is complete
      if (newUserInput.length === gameState.pattern.length) {
        const newLevel = gameState.currentLevel + 1
        const newStreak = gameState.streak + 1
        const timeBonus = Math.floor(gameState.timeLeft / 100)
        const streakBonus = newStreak * 5
        const perfectBonus = gameState.perfectRounds >= PERFECT_STREAK_THRESHOLD ? 50 : 0
        const levelMultiplier = Math.floor(gameState.currentLevel / 3) + 1

        const baseScore = gameState.currentLevel * 10
        const totalScore =
          gameState.score + (baseScore + timeBonus + streakBonus + perfectBonus) * levelMultiplier

        const newPattern = generatePattern(newLevel)
        const bonusTime = Math.min(3000 + newLevel * 200, 8000)
        const newTimeLeft = Math.min(gameState.timeLeft + bonusTime, TIME_PER_LEVEL)
        const newPerfectRounds =
          gameState.perfectRounds + (gameState.timeLeft > TIME_PER_LEVEL * 0.7 ? 1 : 0)

        // Success sound - higher pitch for higher levels
        playSound(659 + newLevel * 50, 0.3, 'triangle')

        // Create success particles
        const rect = document.querySelector('.grid-container')?.getBoundingClientRect()
        if (rect) {
          const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b']
          createParticles(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            25,
            colors[newLevel % colors.length]
          )
        }

        // Show celebration for milestone levels
        const showCelebration = newLevel % 5 === 0

        setGameState({
          pattern: newPattern,
          userInput: [],
          currentLevel: newLevel,
          showingPattern: true,
          gameOver: false,
          score: totalScore,
          isPlaying: true,
          streak: newStreak,
          timeLeft: newTimeLeft,
          multiplier: levelMultiplier,
          particles: gameState.particles,
          perfectRounds: newPerfectRounds,
          showCelebration,
          highScore: Math.max(totalScore, gameState.highScore),
        })

        setTimeout(
          () => {
            setGameState(prev => ({
              ...prev,
              showingPattern: false,
              showCelebration: false,
            }))
          },
          Math.max(SHOW_PATTERN_TIME - newLevel * 50, 400)
        )
      } else {
        setGameState(prev => ({
          ...prev,
          userInput: newUserInput,
        }))
      }
    },
    [gameState, generatePattern, playSound, createParticles]
  )

  const resetGame = useCallback(() => {
    clearInterval(timerRef.current)
    cancelAnimationFrame(gameLoopRef.current!)
    setGameState(prev => ({
      pattern: [],
      userInput: [],
      currentLevel: 1,
      showingPattern: false,
      gameOver: false,
      score: 0,
      isPlaying: false,
      streak: 0,
      timeLeft: TIME_PER_LEVEL,
      multiplier: 1,
      particles: [],
      perfectRounds: 0,
      showCelebration: false,
      highScore: prev.highScore,
    }))
  }, [])

  const getCellClass = (index: number) => {
    const isUserInput = gameState.userInput.includes(index)
    const isCurrentlyShowing = gameState.showingPattern && gameState.pattern.includes(index)
    const isCorrectInPattern = gameState.pattern
      .slice(0, gameState.userInput.length + 1)
      .includes(index)
    const isWrongClick =
      gameState.gameOver &&
      gameState.userInput.includes(index) &&
      !gameState.pattern.slice(0, gameState.userInput.length).includes(index)

    let baseClass =
      'matrix-grid-cell w-20 h-20 border-2 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center text-lg font-bold relative overflow-hidden group '

    if (isWrongClick) {
      baseClass +=
        'bg-gradient-to-br from-red-500/40 to-red-600/60 border-red-400 animate-pulse shadow-lg shadow-red-500/25 glow-effect'
    } else if (isCurrentlyShowing) {
      const patternIndex = gameState.pattern.indexOf(index)
      const colors = [
        'bg-gradient-to-br from-blue-400/60 to-blue-500/80 border-blue-300',
        'bg-gradient-to-br from-emerald-400/60 to-emerald-500/80 border-emerald-300',
        'bg-gradient-to-br from-purple-400/60 to-purple-500/80 border-purple-300',
        'bg-gradient-to-br from-amber-400/60 to-amber-500/80 border-amber-300',
      ]
      baseClass +=
        colors[patternIndex % colors.length] + ' pattern-glow shadow-lg shadow-blue-500/40'
    } else if (isUserInput && isCorrectInPattern) {
      baseClass +=
        'bg-gradient-to-br from-green-400/30 to-green-500/50 border-green-300 shadow-md shadow-green-500/20'
    } else if (isUserInput) {
      baseClass += 'bg-gradient-to-br from-primary/30 to-primary/50 border-primary shadow-md'
    } else {
      baseClass +=
        'bg-gradient-to-br from-card-bg to-surface-hover border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10'
    }

    return baseClass
  }

  // Game loop for particles
  useEffect(() => {
    if (gameState.particles.length > 0) {
      gameLoopRef.current = requestAnimationFrame(() => {
        updateParticles()
      })
    }
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameState.particles, updateParticles])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current)
      cancelAnimationFrame(gameLoopRef.current!)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      resetGame()
    }
  }, [isOpen, resetGame])

  if (!isOpen) return null

  const timePercentage = (gameState.timeLeft / TIME_PER_LEVEL) * 100
  const timeColor =
    timePercentage > 60 ? 'bg-green-500' : timePercentage > 30 ? 'bg-yellow-500' : 'bg-red-500'

  return (
    <div className="fixed inset-0 bg-bg/95 backdrop-blur-xl z-[9999] flex items-center justify-center p-4">
      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {gameState.particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              backgroundColor: particle.color,
              opacity: particle.life,
              transform: `scale(${particle.life})`,
            }}
          />
        ))}
      </div>

      {/* Celebration overlay */}
      {gameState.showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-4xl font-bold text-yellow-500 animate-bounce">
            Level {gameState.currentLevel}!
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-card-bg via-card-bg to-surface-hover border border-border/50 rounded-2xl p-6 max-w-md w-full shadow-2xl shadow-primary/5 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div>
            <h2 className="text-2xl font-bold text-text mb-1">Memory Challenge</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-surface-hover hover:bg-red-500/10 border border-border hover:border-red-500/30 flex items-center justify-center text-muted hover:text-red-400 transition-all transform hover:scale-110"
            aria-label="Close game"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 relative z-10">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/20 border border-blue-500/20 rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-blue-400">{gameState.currentLevel}</div>
            <div className="text-xs text-blue-300/80">Level</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/20 border border-emerald-500/20 rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-emerald-400">
              {gameState.score.toLocaleString()}
            </div>
            <div className="text-xs text-emerald-300/80">Points</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/20 border border-purple-500/20 rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-purple-400">{gameState.streak}</div>
            <div className="text-xs text-purple-300/80">Streak</div>
          </div>
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/20 border border-amber-500/20 rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-amber-400">
              {gameState.highScore.toLocaleString()}
            </div>
            <div className="text-xs text-amber-300/80">Best</div>
          </div>
        </div>

        {/* Time Progress Bar */}
        {gameState.isPlaying && (
          <div className="mb-6 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted">Time Remaining</span>
              <span className="text-sm font-mono text-text">
                {Math.ceil(gameState.timeLeft / 1000)}s
              </span>
            </div>
            <div className="w-full bg-surface-hover rounded-full h-3 overflow-hidden">
              <div
                className={`h-full ${timeColor} transition-all duration-300 rounded-full relative`}
                style={{ width: `${timePercentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* Status Messages */}
        <div className="text-center mb-6 h-8 relative z-10">
          {gameState.showingPattern && (
            <p className="text-blue-400 font-medium">Memorizing pattern...</p>
          )}

          {!gameState.isPlaying && !gameState.gameOver && (
            <p className="text-muted text-sm">Watch the pattern, then repeat it</p>
          )}

          {gameState.gameOver && (
            <div className="space-y-1">
              <p className="text-red-400 font-bold">Game Over</p>
              <p className="text-sm text-muted">
                Score:{' '}
                <span className="text-accent font-bold">{gameState.score.toLocaleString()}</span>
                {gameState.score === gameState.highScore && gameState.score > 0 && (
                  <span className="text-yellow-400 ml-2">New Best!</span>
                )}
              </p>
            </div>
          )}

          {gameState.isPlaying && !gameState.showingPattern && gameState.multiplier > 1 && (
            <p className="text-green-400 text-sm">{gameState.multiplier}x multiplier!</p>
          )}
        </div>

        {/* Game Grid */}
        <div className="grid-container grid grid-cols-3 gap-2 mb-6 justify-items-center relative z-10">
          {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              className={getCellClass(index)}
              disabled={gameState.showingPattern || gameState.gameOver}
            >
              {/* Cell number for pattern display */}
              {gameState.showingPattern && gameState.pattern.includes(index) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 bg-white/90 text-black rounded-full flex items-center justify-center text-xs font-bold animate-bounce">
                    {gameState.pattern.indexOf(index) + 1}
                  </div>
                </div>
              )}

              {/* Ripple effect on click */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-100 bg-primary/20 transition-opacity duration-150" />

              {/* Glow effect for pattern cells */}
              {gameState.showingPattern && gameState.pattern.includes(index) && (
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-sm animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 relative z-10">
          {!gameState.isPlaying && !gameState.gameOver && (
            <button
              onClick={startGame}
              className="flex-1 bg-gradient-to-r from-primary to-primary-dark text-white py-3 px-4 rounded-xl font-medium hover:from-primary-dark hover:to-primary transition-all shadow-lg shadow-primary/25"
            >
              Start Game
            </button>
          )}

          {gameState.gameOver && (
            <button
              onClick={startGame}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/25"
            >
              Play Again
            </button>
          )}

          {gameState.isPlaying && (
            <button
              onClick={resetGame}
              className="flex-1 bg-gradient-to-r from-red-500/80 to-red-600/80 text-white py-3 px-4 rounded-xl font-medium hover:from-red-600/90 hover:to-red-700/90 border border-red-400/30 transition-all shadow-lg shadow-red-500/20"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
