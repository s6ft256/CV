module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  safelist: ['animate-flag-wave'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-alt': 'var(--bg-alt)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        accent: 'var(--accent)',
        'accent-dark': 'var(--accent-dark)',
        'card-bg': 'var(--card-bg)',
        border: 'var(--border)',
        surface: 'var(--card-bg)',
        'surface-hover': 'rgba(148, 163, 184, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        gradient: 'gradient 8s ease infinite',
        'flag-wave': 'flagWave 1.5s ease-in-out infinite',
      },
      keyframes: {
        flagWave: {
          '0%, 100%': { transform: 'rotate(-5deg) scale(1) translateZ(0)' },
          '25%': { transform: 'rotate(5deg) scale(1.1) translateZ(0)' },
          '50%': { transform: 'rotate(-3deg) scale(1.05) translateZ(0)' },
          '75%': { transform: 'rotate(3deg) scale(1.1) translateZ(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateZ(0)' },
          '100%': { opacity: '1', transform: 'translateZ(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px) translateZ(0)' },
          '100%': { opacity: '1', transform: 'translateY(0) translateZ(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px) translateZ(0)' },
          '100%': { opacity: '1', transform: 'translateY(0) translateZ(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px) translateZ(0)' },
          '100%': { opacity: '1', transform: 'translateX(0) translateZ(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px) translateZ(0)' },
          '100%': { opacity: '1', transform: 'translateX(0) translateZ(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateZ(0)' },
          '100%': { opacity: '1', transform: 'scale(1) translateZ(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) translateZ(0)' },
          '50%': { transform: 'translateY(-10px) translateZ(0)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glow: '0 0 40px rgba(56, 189, 248, 0.15)',
        'glow-lg': '0 0 60px rgba(56, 189, 248, 0.25)',
        'glow-accent': '0 0 40px rgba(255, 122, 89, 0.15)',
      },
    },
  },
  plugins: [],
}
