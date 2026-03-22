import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import SectionHeading from './SectionHeading'

const AUTO_PLAY_MS = 4000
const SPRING = { type: 'spring', stiffness: 280, damping: 28 }

export default function Testimonials({ items, content }) {
  const reducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [dir, setDir] = useState(1) // 1 = forward, -1 = backward
  const [paused, setPaused] = useState(false)

  const go = useCallback((next) => {
    setDir(next > activeIndex ? 1 : -1)
    setActiveIndex((next + items.length) % items.length)
  }, [activeIndex, items.length])

  const prev = useCallback(() => go(activeIndex - 1), [go, activeIndex])
  const next = useCallback(() => go(activeIndex + 1), [go, activeIndex])

  /* Auto-play */
  useEffect(() => {
    if (paused || reducedMotion) return
    const t = setInterval(() => {
      setDir(1)
      setActiveIndex((i) => (i + 1) % items.length)
    }, AUTO_PLAY_MS)
    return () => clearInterval(t)
  }, [paused, reducedMotion, items.length])

  const variants = {
    enter: (d) => ({
      opacity: 0,
      x: d > 0 ? 48 : -48,
      scale: 0.96,
    }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d) => ({
      opacity: 0,
      x: d > 0 ? -48 : 48,
      scale: 0.96,
    }),
  }

  const current = items[activeIndex]

  return (
    <section id="testimonials" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-live="polite"
          aria-label="Testimonials carousel"
        >
          {/* Card */}
          <div className="relative min-h-[280px] overflow-hidden">
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={activeIndex}
                custom={dir}
                variants={reducedMotion ? {} : variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={SPRING}
                className="glass-card rounded-3xl p-6 sm:p-8 md:p-10"
              >
                {/* Quote icon */}
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
                  <Quote size={18} className="text-accent" />
                </div>

                <blockquote className="mb-7 text-lg leading-relaxed text-primary md:text-xl">
                  "{current.quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-panel-soft">
                    {current.avatar ? (
                      <img
                        src={current.avatar}
                        alt={current.name}
                        loading="lazy"
                        className="h-full w-full rounded-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling?.style.removeProperty('display')
                        }}
                      />
                    ) : null}
                    <span className="text-lg font-bold text-accent" aria-hidden="true">
                      {current.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">{current.name}</p>
                    <p className="text-sm text-secondary">
                      {current.title} · {current.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between">
            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Select testimonial">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => go(i)}
                  className={`rounded-full transition-all duration-250 ${
                    i === activeIndex
                      ? 'h-2.5 w-6 bg-accent shadow-[0_0_10px_rgba(45,212,191,0.5)]'
                      : 'h-2.5 w-2.5 bg-ringline hover:bg-accent/50'
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ringline text-secondary transition hover:border-accent hover:text-accent"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ringline text-secondary transition hover:border-accent hover:text-accent"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
