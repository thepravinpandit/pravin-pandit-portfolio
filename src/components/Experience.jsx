import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { BriefcaseBusiness, ChevronDown, ChevronUp } from 'lucide-react'
import SectionHeading from './SectionHeading'

const SPRING = { type: 'spring', stiffness: 280, damping: 26 }

export default function Experience({ items, content }) {
  const reducedMotion = useReducedMotion()
  const [expanded, setExpanded] = useState(0)
  const timelineRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'end 25%'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 22, mass: 0.2 })

  return (
    <section id="experience" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />

        <div ref={timelineRef} className="relative ml-3 sm:ml-5">
          {/* ── Glowing Timeline Line ── */}
          <div
            className="timeline-line absolute bottom-0 left-0 top-0 w-[2px] rounded-full"
            aria-hidden="true"
          />
          {/* Animated progress overlay */}
          <motion.div
            className="absolute left-0 top-0 w-[2px] origin-top rounded-full bg-accent shadow-[0_0_10px_rgba(45,212,191,0.6)]"
            style={{ scaleY: progress, transformOrigin: 'top' }}
            aria-hidden="true"
          />

          <div className="space-y-8 pl-7 sm:pl-10">
            {items.map((item, index) => {
              const isExpanded = expanded === index
              return (
                <motion.article
                  key={item.company}
                  initial={reducedMotion ? false : { opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.22 }}
                  transition={{ ...SPRING, delay: index * 0.08 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <span
                    className="timeline-dot absolute -left-[2.25rem] top-7 h-4 w-4 rounded-full bg-accent sm:-left-[2.75rem]"
                    aria-hidden="true"
                  />

                  <div className="glass-card interactive-card rounded-2xl p-5 sm:p-7">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-start gap-3 sm:gap-4">
                        {/* Logo or fallback icon */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ringline/60 bg-panel-soft">
                          {item.logo ? (
                            <img
                              src={item.logo}
                              alt={`${item.company} logo`}
                              loading="lazy"
                              className="h-8 w-8 object-contain"
                              onError={(e) => { e.target.style.display = 'none' }}
                            />
                          ) : (
                            <BriefcaseBusiness size={22} className="text-accent" />
                          )}
                        </div>

                        <div>
                          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                            {item.period}
                          </p>
                          <h3 className="mt-1.5 font-display text-lg font-bold text-primary sm:text-xl">
                            {item.company}
                          </h3>
                          <p className="mt-0.5 text-sm font-medium text-secondary">{item.role}</p>
                        </div>
                      </div>

                      {item.details?.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setExpanded((prev) => (prev === index ? -1 : index))}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-ringline px-3 py-2 text-xs font-medium text-secondary transition-all duration-200 hover:border-accent/60 hover:text-accent"
                          aria-expanded={isExpanded}
                          aria-controls={`exp-details-${index}`}
                        >
                          {isExpanded ? 'Hide Details' : 'More Details'}
                          {isExpanded
                            ? <ChevronUp size={14} />
                            : <ChevronDown size={14} />}
                        </button>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="my-4 h-px bg-gradient-to-r from-accent/20 via-ringline/40 to-transparent" />

                    {/* Highlights */}
                    <ul className="space-y-2.5" aria-label={`${item.company} highlights`}>
                      {item.highlights.map((point, pi) => (
                        <motion.li
                          key={point}
                          initial={reducedMotion ? false : { opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ ...SPRING, delay: index * 0.06 + pi * 0.06 }}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-secondary"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_6px_rgba(45,212,191,0.6)]" />
                          {point}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Expandable details */}
                    <motion.div
                      id={`exp-details-${index}`}
                      initial={false}
                      animate={
                        isExpanded
                          ? { height: 'auto', opacity: 1, marginTop: 16 }
                          : { height: 0, opacity: 0, marginTop: 0 }
                      }
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="rounded-xl border border-ringline/50 bg-panel-soft/50 p-4 space-y-2">
                        {item.details?.map((detail) => (
                          <p key={detail} className="text-sm leading-relaxed text-secondary">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
