import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download, MapPin, Sparkles, Zap } from 'lucide-react'
import VisitorBadge from './VisitorBadge'
import { scrollToSection } from '../utils/scroll'
import { trackCtaClick } from '../utils/analytics'

const SPRING = { type: 'spring', stiffness: 260, damping: 24 }
const EASE_OUT = { duration: 0.55, ease: [0.16, 1, 0.3, 1] }

/* ── Role Typewriter ── */
function RoleTypewriter({ roles, reducedMotion }) {
  const [roleIdx, setRoleIdx] = useState(0)
  const [text, setText] = useState(reducedMotion ? roles[0] : '')
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    if (reducedMotion) { setText(roles[0]); return }
    const current = roles[roleIdx]
    let timeout
    if (phase === 'typing') {
      if (text.length < current.length) timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 55)
      else timeout = setTimeout(() => setPhase('pausing'), 1800)
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('erasing'), 400)
    } else if (phase === 'erasing') {
      if (text.length > 0) timeout = setTimeout(() => setText(text.slice(0, -1)), 28)
      else { setRoleIdx((i) => (i + 1) % roles.length); setPhase('typing') }
    }
    return () => clearTimeout(timeout)
  }, [text, phase, roleIdx, roles, reducedMotion])

  return (
    <span className="typing-cursor font-mono text-accent text-base sm:text-lg">
      {text || '\u00A0'}
    </span>
  )
}

function buildCounters(stats, reducedMotion) {
  return stats.map((item) => (reducedMotion ? item.value : 0))
}

export default function Hero({ data }) {
  const reducedMotion = useReducedMotion()
  const statsRef = useRef(null)
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 })
  const [counters, setCounters] = useState(() => buildCounters(data.heroStats, reducedMotion))

  useEffect(() => {
    if (!isStatsInView) return undefined
    if (reducedMotion) { setCounters(data.heroStats.map((item) => item.value)); return undefined }
    const duration = 1400
    const start = performance.now()
    let raf = null
    const tick = (ts) => {
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setCounters(data.heroStats.map((item) => Math.floor(item.value * eased)))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { if (raf) cancelAnimationFrame(raf) }
  }, [data.heroStats, isStatsInView, reducedMotion])

  const statItems = useMemo(
    () => data.heroStats.map((item, i) => ({ ...item, counter: counters[i] ?? item.value })),
    [counters, data.heroStats],
  )

  const handleProjectsClick = () => { trackCtaClick('view_projects', 'hero'); scrollToSection('projects') }
  const handleContactClick  = () => { trackCtaClick('contact', 'hero');       scrollToSection('contact') }
  const handleResumeClick   = () => { trackCtaClick('resume', 'hero') }

  const bulletVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
  }
  const bulletItem = {
    hidden: { opacity: 0, x: -14 },
    show:   { opacity: 1, x: 0, transition: SPRING },
  }

  return (
    /* 
      Mobile: single column, py reduced so content fits above fold.
      Desktop (lg+): two-column grid, full min-h-screen.
    */
    <section id="home" className="relative pt-16 sm:pt-24 pb-28 sm:pb-14 lg:min-h-screen lg:flex lg:items-center">
      {/* Aurora Orbs — toned down on mobile for perf */}
      <div className="aurora-bg" aria-hidden="true">
        <div className="orb-1 opacity-60 sm:opacity-100" />
        <div className="orb-2 opacity-40 sm:opacity-100" />
        <div className="orb-3 opacity-30 sm:opacity-100" />
        <div className="particle-field absolute inset-0" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Mobile: stacked; Desktop: side-by-side ── */}
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">

          {/* ── Left / Main Content ── */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...EASE_OUT, delay: 0.05 }}
            className="text-center lg:text-left"
          >
            {/* Badge row */}
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <motion.p
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...SPRING, delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-accent backdrop-blur-sm"
              >
                <Sparkles size={12} />
                {data.heroLabels.badge}
              </motion.p>
              <VisitorBadge counter={data.visitorCounter} />
            </div>

            {/* Name — large on desktop, comfortable on mobile */}
            <motion.h1
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...EASE_OUT, delay: 0.18 }}
              className="font-display text-[2rem] font-bold leading-tight sm:text-5xl lg:text-6xl"
            >
              <span className="gradient-shimmer">{data.name}</span>
            </motion.h1>

            {/* Role typewriter */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-2.5 min-h-[1.75rem] text-base font-semibold text-secondary sm:text-xl"
              aria-live="polite"
            >
              <RoleTypewriter roles={data.roles ?? [data.title]} reducedMotion={reducedMotion} />
            </motion.p>

            {/* Location — hidden on xs to save space */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.38, duration: 0.4 }}
              className="mt-1.5 hidden items-center justify-center gap-1.5 text-xs text-secondary sm:flex lg:justify-start"
            >
              <MapPin size={11} className="text-accent" />
              {data.location}
            </motion.p>

            {/* Tagline — shorter on mobile */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...EASE_OUT, delay: 0.42 }}
              className="mt-4 text-sm leading-relaxed text-secondary sm:text-base lg:max-w-xl"
            >
              {data.tagline}
            </motion.p>

            {/* CTA Buttons — full-width on small screens, auto on larger */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...EASE_OUT, delay: 0.62 }}
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start"
            >
              <button
                type="button"
                onClick={handleProjectsClick}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(45,212,191,0.35)] transition-all duration-200 hover:scale-105 hover:bg-accent-strong hover:shadow-[0_0_32px_rgba(45,212,191,0.55)] sm:w-auto"
                aria-label="View projects section"
              >
                {data.ctaLabels.projects}
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <div className="flex w-full gap-3 sm:w-auto">
                <button
                  type="button"
                  onClick={handleContactClick}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-ringline bg-panel/80 px-5 py-3 text-sm font-semibold text-primary backdrop-blur-sm transition-all duration-200 hover:border-accent/60 hover:text-accent sm:w-auto sm:flex-none"
                  aria-label="Go to contact section"
                >
                  {data.ctaLabels.contact}
                </button>

                <a
                  href={data.resumeLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleResumeClick}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-ringline px-5 py-3 text-sm font-semibold text-secondary transition-all duration-200 hover:border-accent/60 hover:text-accent sm:w-auto sm:flex-none"
                  aria-label="Download resume"
                >
                  {data.ctaLabels.resume}
                  <Download size={13} />
                </a>
              </div>
            </motion.div>

            {/* Highlights list — vertical on mobile */}
            <motion.ul
              variants={bulletVariants}
              initial="hidden"
              animate="show"
              className="mt-6 space-y-2 text-left"
              aria-label="Key highlights"
            >
              {data.heroHighlights.map((item) => (
                <motion.li
                  key={item}
                  variants={bulletItem}
                  className="flex items-start gap-2 text-sm text-secondary"
                >
                  <Zap size={12} className="mt-0.5 shrink-0 text-accent" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            {/* Stats — 3-col row on mobile too, just smaller */}
            <div ref={statsRef} className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
              {statItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ ...SPRING, delay: 0.9 + i * 0.1 }}
                  className="glass-card interactive-card rounded-2xl px-2 py-3 text-center sm:px-4 sm:py-4"
                >
                  <p className="font-display text-xl font-bold text-primary sm:text-3xl">
                    {item.counter}
                    <span className="text-accent">{item.suffix}</span>
                  </p>
                  <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-secondary sm:mt-1 sm:text-[11px] sm:tracking-[0.18em]">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right / Profile Card — hidden on mobile, shown lg+ ── */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 32, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ ...EASE_OUT, delay: 0.22 }}
            className="hidden lg:relative lg:block"
          >
            <div
              className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-accent/10 via-glow-violet/5 to-transparent blur-2xl"
              aria-hidden="true"
            />
            <div className="glass-card relative rounded-3xl p-6 shadow-[0_0_60px_rgba(45,212,191,0.12)]">
              {/* Avatar */}
              <div className="relative mx-auto h-28 w-28">
                <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-accent/30" aria-hidden="true" />
                <div className="absolute -inset-1 animate-ping-slow rounded-full bg-accent/10" aria-hidden="true" />
                <div className="relative h-full w-full rounded-2xl border-2 border-accent/50 bg-panel-soft p-1.5 shadow-[0_0_30px_rgba(45,212,191,0.3)]">
                  <img
                    src={data.profileImage}
                    alt={`${data.name} profile`}
                    loading="eager"
                    className="h-full w-full rounded-xl object-cover"
                  />
                </div>
              </div>

              <p className="mt-5 text-center font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {data.heroLabels.currentRole}
              </p>
              <p className="mt-1.5 text-center text-lg font-semibold text-primary">{data.role}</p>
              <p className="mt-0.5 flex items-center justify-center gap-1.5 text-center text-sm text-secondary">
                <MapPin size={12} className="text-accent/70" />
                {data.location}
              </p>

              <div className="my-5 h-px bg-gradient-to-r from-transparent via-ringline/60 to-transparent" />

              <ul className="space-y-2.5" aria-label="Key highlights sidebar">
                {data.heroHighlights.slice(0, 3).map((item) => (
                  <li
                    key={item}
                    className="glass-card interactive-card rounded-xl px-3.5 py-2.5 text-xs leading-relaxed text-secondary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
