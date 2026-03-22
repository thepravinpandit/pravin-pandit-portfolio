import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Github, Lightbulb, Star, Target, Wrench, X, Zap } from 'lucide-react'
import SectionHeading from './SectionHeading'

const SPRING = { type: 'spring', stiffness: 280, damping: 26 }

/* ── Category badge colours ── */
const CATEGORY_COLORS = {
  GenAI:      'border-glow-teal/50 bg-glow-teal/10 text-[rgb(var(--glow-teal))]',
  ML:         'border-glow-violet/50 bg-glow-violet/10 text-[rgb(var(--glow-violet))]',
  Automation: 'border-glow-amber/50 bg-glow-amber/10 text-[rgb(var(--glow-amber))]',
  Web:        'border-glow-pink/50 bg-glow-pink/10 text-[rgb(var(--glow-pink))]',
  default:    'border-accent/40 bg-accent/10 text-accent',
}
function catColor(cat) { return CATEGORY_COLORS[cat] ?? CATEGORY_COLORS.default }

/* ── Screenshot Carousel inside modal ── */
function ScreenshotCarousel({ images, title }) {
  const [idx, setIdx] = useState(0)
  if (!images?.length) return null

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length)
  const next = () => setIdx((i) => (i + 1) % images.length)

  return (
    <div className="relative mt-5 overflow-hidden rounded-xl border border-ringline/60">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[idx]}
          src={images[idx]}
          alt={`${title} screenshot ${idx + 1}`}
          loading="lazy"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.22 }}
          className="h-48 w-full object-cover"
        />
      </AnimatePresence>
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous screenshot"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-ringline/60 bg-panel/80 p-1.5 text-secondary backdrop-blur-sm transition hover:border-accent hover:text-accent"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next screenshot"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-ringline/60 bg-panel/80 p-1.5 text-secondary backdrop-blur-sm transition hover:border-accent hover:text-accent"
          >
            <ChevronRight size={16} />
          </button>
          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Screenshot ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === idx ? 'w-4 bg-accent' : 'w-1.5 bg-ringline hover:bg-accent/60'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ── Tilt Card wrapper ── */
function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const handleMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -10
    ref.current.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`
  }, [])
  const handleLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)'
    }
  }, [])
  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  )
}

/* ── Featured Project Hero Card ── */
function FeaturedProject({ project, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="featured-card mb-8 overflow-hidden rounded-3xl"
    >
      <div className="flex flex-col sm:grid sm:grid-cols-[1fr_0.9fr]">
        {/* Image */}
        <div className="relative h-44 sm:h-56 sm:min-h-full overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title} thumbnail`}
            loading="eager"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg-panel/30" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-glow-amber/60 bg-glow-amber/15 px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-[rgb(var(--glow-amber))]">
            <Star size={11} className="fill-current" /> Featured
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-5 sm:p-6 md:p-8">
          <span className={`mb-3 inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.15em] ${catColor(project.category)}`}>
            {project.category}
          </span>
          <h3 className="font-display text-xl font-bold text-primary md:text-2xl">{project.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-secondary">{project.description || project.problem}</p>

          {project.tags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="rounded-full border border-ringline/60 bg-panel-soft px-2.5 py-0.5 font-mono text-xs text-secondary">
                  {t}
                </span>
              ))}
            </div>
          )}

          <p className="mt-4 flex items-start gap-2 rounded-xl border border-accent/30 bg-accent/8 px-3.5 py-2.5 text-sm font-medium text-accent">
            <Zap size={14} className="mt-0.5 shrink-0" />
            {project.impact}
          </p>

          <div className="mt-5 flex gap-2">
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all duration-200 hover:scale-105 hover:bg-accent-strong"
            >
              View Details
            </button>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-ringline px-4 py-2 text-sm text-secondary transition hover:border-accent hover:text-accent"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={14} /> GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Project Grid Card ── */
function ProjectCard({ project, onOpen, index, reducedMotion }) {
  return (
    <motion.article
      layout
      key={project.title}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? {} : { opacity: 0, y: -14, scale: 0.96 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
    >
      <TiltCard className="glass-card h-full overflow-hidden rounded-2xl">
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`Open project details for ${project.title}`}
          className="block w-full text-left"
        >
          {/* Thumbnail */}
          <div className="relative h-44 overflow-hidden">
            <img
              src={project.image}
              alt={`${project.title} thumbnail`}
              loading="lazy"
              className="h-full w-full border-b border-ringline/50 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {project.year && (
              <span className="absolute right-3 top-3 rounded-lg border border-ringline/60 bg-panel/80 px-2 py-0.5 font-mono text-xs text-secondary backdrop-blur-sm">
                {project.year}
              </span>
            )}
          </div>

          <div className="p-5">
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className="font-display text-base font-semibold leading-snug text-primary">
                {project.title}
              </h3>
              <span className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${catColor(project.category)}`}>
                {project.category}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-secondary line-clamp-2">
              {project.description || project.problem}
            </p>

            {project.tags && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.slice(0, 4).map((t) => (
                  <span key={t} className="rounded-full border border-ringline/60 bg-panel-soft px-2 py-0.5 font-mono text-[11px] text-secondary">
                    {t}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="rounded-full border border-ringline/60 bg-panel-soft px-2 py-0.5 font-mono text-[11px] text-secondary">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>
            )}

            <p className="mt-3 rounded-lg border border-accent/25 bg-accent/8 px-3 py-2 text-xs font-medium text-accent line-clamp-2">
              {project.impact}
            </p>
          </div>
        </button>

        <div className="flex gap-2 px-5 pb-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`GitHub for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-ringline px-3 py-1.5 text-xs text-secondary transition hover:border-accent hover:text-accent"
            >
              <Github size={13} /> GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              aria-label={`Demo for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-ringline px-3 py-1.5 text-xs text-secondary transition hover:border-accent hover:text-accent"
            >
              <ExternalLink size={13} /> Demo
            </a>
          )}
        </div>
      </TiltCard>
    </motion.article>
  )
}

/* ── Main Projects Section ── */
export default function Projects({ projects, filters, content }) {
  const reducedMotion = useReducedMotion()
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const closeButtonRef = useRef(null)
  const lastFocusedRef = useRef(null)

  const featuredProject = useMemo(() => projects.find((p) => p.featured), [projects])
  const gridProjects = useMemo(() => {
    const nonFeatured = projects.filter((p) => !p.featured)
    if (activeFilter === 'All') return nonFeatured
    return nonFeatured.filter((p) => p.category === activeFilter)
  }, [activeFilter, projects])

  /* Modal a11y */
  useEffect(() => {
    if (!selectedProject) return undefined

    lastFocusedRef.current = document.activeElement
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const t = window.setTimeout(() => closeButtonRef.current?.focus(), 80)

    const onKey = (e) => {
      if (e.key === 'Escape') setSelectedProject(null)
      if (e.key === 'Tab') {
        const modal = document.getElementById('project-modal')
        if (!modal) return
        const els = modal.querySelectorAll('button, a[href], input, textarea, [tabindex]:not([tabindex="-1"])')
        if (!els.length) return
        const first = els[0]
        const last = els[els.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      lastFocusedRef.current?.focus?.()
    }
  }, [selectedProject])

  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />

        {/* Featured */}
        {featuredProject && activeFilter === 'All' && (
          <FeaturedProject project={featuredProject} onOpen={setSelectedProject} />
        )}

        {/* Filter tabs */}
        <div className="mb-7 no-scrollbar flex flex-nowrap gap-2 overflow-x-auto pb-1 sm:flex-wrap" role="tablist" aria-label="Project category filters">
          {filters.map((filter) => {
            const isActive = activeFilter === filter
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'border-accent/50 bg-accent/15 text-accent shadow-[0_0_16px_rgba(45,212,191,0.15)]'
                    : 'border-ringline bg-panel text-secondary hover:border-accent/35 hover:text-accent'
                }`}
              >
                {filter}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <motion.div layout className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {gridProjects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                onOpen={setSelectedProject}
                index={i}
                reducedMotion={reducedMotion}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-page/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              id="project-modal"
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedProject.title} details`}
              initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? {} : { opacity: 0, y: 16, scale: 0.97 }}
              transition={SPRING}
              className="glass-card max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="relative mb-5 pr-12">
                <div>
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.15em] ${catColor(selectedProject.category)}`}>
                    {selectedProject.category}
                  </span>
                  <h3 className="mt-2.5 font-display text-2xl font-bold leading-tight text-primary md:text-3xl">
                    {selectedProject.title}
                  </h3>
                  {selectedProject.year && (
                    <p className="mt-1.5 font-mono text-sm font-medium text-accent">{selectedProject.year}</p>
                  )}
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-0 top-0 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ringline bg-panel-soft text-secondary transition-all hover:border-accent hover:bg-accent/10 hover:text-accent"
                  aria-label="Close project details"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Screenshot carousel */}
              <ScreenshotCarousel images={selectedProject.screenshots} title={selectedProject.title} />

              {/* Details (Problem, Solution, Implementation) */}
              <div className="mt-6 flex flex-col gap-6 text-sm leading-relaxed sm:text-base">
                <div>
                  <h4 className="mb-2 flex items-center gap-2 font-display text-lg font-bold text-primary">
                    <Target size={18} className="text-accent" />
                    The Problem
                  </h4>
                  <p className="text-secondary">{selectedProject.problem}</p>
                </div>
                <div>
                  <h4 className="mb-2 flex items-center gap-2 font-display text-lg font-bold text-primary">
                    <Lightbulb size={18} className="text-accent" />
                    The Solution
                  </h4>
                  <p className="text-secondary">{selectedProject.solution}</p>
                </div>
                {selectedProject.details && (
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 font-display text-lg font-bold text-primary">
                      <Wrench size={18} className="text-accent" />
                      Implementation Details
                    </h4>
                    <p className="text-secondary">{selectedProject.details}</p>
                  </div>
                )}
              </div>

              {/* Tech tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {(selectedProject.tags || selectedProject.stack || []).map((t) => (
                  <span key={t} className="rounded-full border border-ringline bg-panel-soft px-2.5 py-1 font-mono text-xs text-secondary">
                    {t}
                  </span>
                ))}
              </div>

              {/* Impact */}
              <p className="mt-4 flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/8 px-4 py-3 text-sm font-semibold text-accent">
                <Zap size={15} className="shrink-0" />
                {selectedProject.impact}
              </p>

              {/* Links */}
              <div className="mt-5 flex flex-wrap gap-2">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-ringline px-4 py-2 text-sm text-secondary transition hover:border-accent hover:text-accent"
                  >
                    <Github size={14} /> GitHub
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-ringline px-4 py-2 text-sm text-secondary transition hover:border-accent hover:text-accent"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
