import { motion, useReducedMotion } from 'framer-motion'
import { Award } from 'lucide-react'
import SectionHeading from './SectionHeading'

const SPRING = { type: 'spring', stiffness: 260, damping: 24 }

function CertCard({ item, index, reducedMotion }) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ ...SPRING, delay: index * 0.08 }}
      className="flip-card group"
      aria-label={`${item.name} by ${item.org}, ${item.year}`}
    >
      <div className="flip-card-inner">
        {/* ── Front ── */}
        <div className="flip-card-front glass-card flex-col gap-3 text-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/40 bg-accent/10">
            {item.badge ? (
              <img
                src={item.badge}
                alt={`${item.name} badge`}
                loading="lazy"
                className="h-8 w-8 object-contain"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            ) : (
              <Award size={22} className="text-accent" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold leading-snug text-primary">{item.name}</p>
            <p className="mt-1 font-mono text-xs text-accent">{item.org}</p>
          </div>
          <p className="mt-auto rounded-lg border border-ringline/60 bg-panel-soft px-2.5 py-0.5 font-mono text-xs text-secondary">
            {item.year}
          </p>
        </div>

        {/* ── Back ── */}
        <div className="flip-card-back flex-col gap-3 text-center">
          <Award size={24} className="text-accent" aria-hidden="true" />
          <p className="font-display text-sm font-bold text-primary">{item.org}</p>
          <p className="text-xs leading-relaxed text-secondary">
            {item.description || item.name}
          </p>
          <p className="font-mono text-xs font-semibold text-accent">{item.year}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Certifications({ items, content }) {
  const reducedMotion = useReducedMotion()

  return (
    <section id="certifications" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items.map((item, i) => (
            <CertCard
              key={item.name}
              item={item}
              index={i}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
