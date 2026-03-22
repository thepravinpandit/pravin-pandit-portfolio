import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, MoonStar, Sun, X } from 'lucide-react'

const EASE_OUT = { duration: 0.28, ease: [0.16, 1, 0.3, 1] }

export default function Navbar({ name, theme, onToggleTheme, navSections, activeSection, onNavigate, scrolled }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleNav = (id) => { onNavigate(id); setIsOpen(false) }

  return (
    <header
      data-navbar="true"
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-ringline/70 bg-page/95 py-1 shadow-[0_1px_24px_rgba(0,0,0,0.12)] backdrop-blur-2xl'
          : 'border-transparent bg-page/80 py-2.5 backdrop-blur-xl'
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.button
          type="button"
          onClick={() => handleNav('home')}
          className={`font-display font-bold tracking-tight text-primary transition-all duration-300 ${
            scrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
          }`}
          aria-label="Scroll to home section"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="text-accent">&lt;/&gt;</span>{' '}
          <span className="gradient-shimmer">{name}</span>
        </motion.button>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navSections.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className="relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150"
                aria-label={`Go to ${item.label} section`}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Sliding pill */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="nav-pill"
                    transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                    aria-hidden="true"
                  />
                )}
                <span className={`relative z-10 transition-colors duration-150 ${isActive ? 'text-accent' : 'text-secondary hover:text-accent'}`}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle color theme"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ringline/70 bg-panel text-secondary transition hover:border-accent/60 hover:text-accent"
            whileHover={{ scale: 1.08, rotate: 15 }}
            whileTap={{ scale: 0.93 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -30 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 30 }}
                transition={EASE_OUT}
              >
                {theme === 'dark' ? <Sun size={16} /> : <MoonStar size={16} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ringline/70 bg-panel text-secondary transition hover:border-accent/60 hover:text-accent md:hidden"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -30 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 30 }}
                transition={EASE_OUT}
              >
                {isOpen ? <X size={16} /> : <Menu size={16} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={EASE_OUT}
            className="overflow-hidden border-t border-ringline/60 bg-page/98 backdrop-blur-2xl md:hidden"
            aria-label="Mobile primary navigation"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
              {navSections.map((item, i) => {
                const isActive = activeSection === item.id
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => handleNav(item.id)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.22 }}
                    className={`rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-all ${
                      isActive
                        ? 'border border-accent/40 bg-accent/15 text-accent'
                        : 'text-secondary hover:bg-panel hover:text-accent'
                    }`}
                    aria-label={`Go to ${item.label} section`}
                  >
                    {item.label}
                  </motion.button>
                )
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
