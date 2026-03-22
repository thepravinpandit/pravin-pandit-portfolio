import { useState, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'

const SPRING = { type: 'spring', stiffness: 260, damping: 24 }

/* ── Animated progress bar ── */
function SkillBar({ proficiency, inView, reducedMotion }) {
  return (
    <div className="skill-bar-track" role="progressbar" aria-valuenow={proficiency} aria-valuemin={0} aria-valuemax={100}>
      <motion.div
        className="skill-bar-fill"
        initial={{ width: 0 }}
        animate={{ width: inView || reducedMotion ? `${proficiency}%` : 0 }}
        transition={{ duration: reducedMotion ? 0 : 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />
    </div>
  )
}

/* ── Single skill item with tooltip ── */
function SkillItem({ item }) {
  const [showCtx, setShowCtx] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onMouseEnter={() => setShowCtx(true)}
        onMouseLeave={() => setShowCtx(false)}
        onFocus={() => setShowCtx(true)}
        onBlur={() => setShowCtx(false)}
        className="flex w-full items-center gap-2 rounded-lg border border-ringline/50 bg-panel-soft/60 px-3 py-2 text-xs text-secondary transition-all duration-200 hover:border-accent/50 hover:text-accent"
        aria-label={`${item.name}: ${item.context}`}
      >
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
        <span className="font-medium">{item.name}</span>
      </button>

      {/* Tooltip */}
      {showCtx && item.context && (
        <div
          role="tooltip"
          className="absolute bottom-full left-0 z-30 mb-2 w-56 rounded-xl border border-ringline/60 bg-panel p-3 text-xs leading-relaxed text-secondary shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-sm"
        >
          {item.context}
          <div className="absolute -bottom-1.5 left-4 h-3 w-3 rotate-45 border-b border-r border-ringline/60 bg-panel" />
        </div>
      )}
    </div>
  )
}

/* ── Category card ── */
function SkillCategory({ group, index, reducedMotion }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...SPRING, delay: index * 0.07 }}
      className="glass-card interactive-card rounded-2xl p-5 sm:p-6"
    >
      {/* Category header */}
      <div className="mb-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="font-display text-base font-bold text-primary">{group.category}</h3>
          <span className="font-mono text-sm font-bold text-accent">{group.proficiency}%</span>
        </div>
        {/* Progress bar */}
        <SkillBar proficiency={group.proficiency} inView={inView} reducedMotion={reducedMotion} />
        <p className="mt-2 text-xs text-secondary">{group.description}</p>
      </div>

      {/* Skill chips */}
      <div className="grid gap-2 sm:grid-cols-1">
        {group.items.map((item) => (
          <SkillItem key={item.name} item={item} />
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills({ skillGroups, content }) {
  const reducedMotion = useReducedMotion()
  const [activeIdx, setActiveIdx] = useState(null)

  const categories = skillGroups.map((g) => g.category)

  const filtered = activeIdx !== null
    ? [skillGroups[activeIdx]]
    : skillGroups

  return (
    <section id="skills" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />

        {/* Category filter pills */}
        <div className="mb-8 flex no-scrollbar flex-nowrap overflow-x-auto pb-1 sm:flex-wrap gap-2" role="tablist" aria-label="Skill category filters">
          <button
            type="button"
            role="tab"
            aria-selected={activeIdx === null}
            onClick={() => setActiveIdx(null)}
            className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeIdx === null
                ? 'border-accent/50 bg-accent/15 text-accent shadow-[0_0_16px_rgba(45,212,191,0.15)]'
                : 'border-ringline bg-panel text-secondary hover:border-accent/35 hover:text-accent'
            }`}
          >
            All Skills
          </button>
          {categories.map((cat, i) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeIdx === i}
              onClick={() => setActiveIdx((prev) => (prev === i ? null : i))}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeIdx === i
                  ? 'border-accent/50 bg-accent/15 text-accent shadow-[0_0_16px_rgba(45,212,191,0.15)]'
                  : 'border-ringline bg-panel text-secondary hover:border-accent/35 hover:text-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((group, i) => (
            <SkillCategory
              key={group.category}
              group={group}
              index={activeIdx !== null ? 0 : i}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
