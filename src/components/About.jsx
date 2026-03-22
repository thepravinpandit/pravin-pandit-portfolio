import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Brain, Sparkles } from 'lucide-react'
import SectionHeading from './SectionHeading'

const SPRING = { type: 'spring', stiffness: 260, damping: 24 }

export default function About({ data, content }) {
  const reducedMotion = useReducedMotion()

  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description || data.headline}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Professional summary */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ ...SPRING, delay: 0.05 }}
            className="glass-card interactive-card rounded-2xl p-6 sm:p-7"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-accent/40 bg-accent/10">
              <Brain size={20} className="text-accent" />
            </div>
            <h3 className="font-display text-xl font-bold text-primary">{content.journeyTitle}</h3>
            <div className="mt-4 space-y-3">
              {data.body.map((para) => (
                <p key={para.slice(0, 20)} className="text-sm leading-relaxed text-secondary sm:text-base">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Career path */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ ...SPRING, delay: 0.1 }}
            className="glass-card interactive-card rounded-2xl p-6 sm:p-7"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-accent/40 bg-accent/10">
              <Sparkles size={20} className="text-accent" />
            </div>
            <h3 className="font-display text-xl font-bold text-primary">{content.pathTitle}</h3>

            {/* Journey arrows */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {data.journey.map((company, i) => (
                <div key={company} className="flex items-center gap-2">
                  <motion.span
                    initial={reducedMotion ? false : { opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ ...SPRING, delay: 0.12 + i * 0.1 }}
                    className="rounded-xl border border-accent/35 bg-accent/10 px-3.5 py-2 font-mono text-sm font-medium text-accent"
                  >
                    {company}
                  </motion.span>
                  {i < data.journey.length - 1 && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.16 + i * 0.1, duration: 0.25 }}
                    >
                      <ArrowRight size={15} className="text-accent/60" />
                    </motion.span>
                  )}
                </div>
              ))}
            </div>

            <div className="my-5 h-px bg-gradient-to-r from-accent/20 via-ringline/40 to-transparent" />

            <p className="text-sm leading-relaxed text-secondary">{content.closing}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
