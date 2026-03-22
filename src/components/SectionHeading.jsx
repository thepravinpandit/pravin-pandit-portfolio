import { motion, useReducedMotion } from 'framer-motion'

const SPRING = { type: 'spring', stiffness: 260, damping: 24 }

export default function SectionHeading({ eyebrow, title, description }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={SPRING}
      className="mb-10 max-w-2xl"
    >
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.22em] text-accent backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl">{title}</h2>
      )}
      {description && (
        <p className="mt-3 text-base leading-relaxed text-secondary sm:text-lg">{description}</p>
      )}
    </motion.div>
  )
}
