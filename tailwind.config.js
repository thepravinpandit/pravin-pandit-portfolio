/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        page:           'rgb(var(--bg-page) / <alpha-value>)',
        panel:          'rgb(var(--bg-panel) / <alpha-value>)',
        'panel-soft':   'rgb(var(--bg-panel-soft) / <alpha-value>)',
        primary:        'rgb(var(--text-primary) / <alpha-value>)',
        secondary:      'rgb(var(--text-secondary) / <alpha-value>)',
        accent:         'rgb(var(--accent) / <alpha-value>)',
        'accent-strong':'rgb(var(--accent-strong) / <alpha-value>)',
        ringline:       'rgb(var(--ringline) / <alpha-value>)',
        // Extended glow palette
        'glow-teal':    'rgb(var(--glow-teal) / <alpha-value>)',
        'glow-violet':  'rgb(var(--glow-violet) / <alpha-value>)',
        'glow-amber':   'rgb(var(--glow-amber) / <alpha-value>)',
        'glow-pink':    'rgb(var(--glow-pink) / <alpha-value>)',
        'glow-cyan':    'rgb(var(--glow-cyan) / <alpha-value>)',
      },
      boxShadow: {
        glow:         '0 0 0 1px rgba(0,0,0,0.03), 0 0 30px rgba(18,130,146,0.25)',
        'glow-lg':    '0 0 60px rgba(45,212,191,0.3)',
        'glow-violet':'0 0 40px rgba(139,92,246,0.3)',
        'glow-amber': '0 0 40px rgba(245,158,11,0.3)',
        panel:        '0 12px 28px rgba(0,0,0,0.18)',
        card:         '0 4px 6px rgba(0,0,0,0.04), 0 16px 32px rgba(0,0,0,0.12)',
      },
      fontFamily: {
        display: ['Space Grotesk', 'ui-sans-serif', 'sans-serif'],
        body:    ['Manrope', 'ui-sans-serif', 'sans-serif'],
        mono:    ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        'grid-move': {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '80px 80px' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        pulseglow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(45,212,191,0.0)' },
          '50%':      { boxShadow: '0 0 40px rgba(45,212,191,0.35)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to:   { transform: 'translateX(0)', opacity: '1' },
        },
        'scale-in': {
          from: { transform: 'scale(0.92)', opacity: '0' },
          to:   { transform: 'scale(1)', opacity: '1' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'ping-slow': {
          '75%, 100%': { transform: 'scale(1.8)', opacity: '0' },
        },
      },
      animation: {
        'grid-move':      'grid-move 14s linear infinite',
        shimmer:          'shimmer 3.8s linear infinite',
        float:            'float 4s ease-in-out infinite',
        pulseglow:        'pulseglow 3s ease-in-out infinite',
        'fade-in-up':     'fade-in-up 0.5s ease forwards',
        'slide-in-right': 'slide-in-right 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in':       'scale-in 0.35s cubic-bezier(0.16,1,0.3,1) forwards',
        'spin-slow':      'spin-slow 8s linear infinite',
        'ping-slow':      'ping-slow 2s cubic-bezier(0,0,0.2,1) infinite',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
