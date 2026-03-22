import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, BookOpen, Clock } from 'lucide-react'
import SectionHeading from './SectionHeading'

const SPRING = { type: 'spring', stiffness: 260, damping: 24 }

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

function ArticleCard({ article, index, reducedMotion }) {
  return (
    <motion.a
      href={article.link}
      target="_blank"
      rel="noreferrer"
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...SPRING, delay: index * 0.08 }}
      className="glass-card interactive-card group block rounded-2xl p-5 sm:p-6 relative overflow-hidden"
      aria-label={`Read article: ${article.title}`}
    >
      {/* Subtle gradient hover overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-glow-violet/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />

      {/* Article icon */}
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-ringline/60 bg-panel-soft transition-all duration-200 group-hover:border-accent/50 group-hover:bg-accent/10">
        <BookOpen size={18} className="text-secondary transition-colors duration-200 group-hover:text-accent" />
      </div>

      {/* Meta */}
      <div className="mb-3 flex flex-wrap items-center gap-3">
        {article.date && (
          <span className="font-mono text-xs text-secondary">{formatDate(article.date)}</span>
        )}
        {article.readTime && (
          <span className="flex items-center gap-1 font-mono text-xs text-secondary">
            <Clock size={11} />
            {article.readTime} read
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-display text-base font-bold leading-snug text-primary transition-colors duration-200 group-hover:text-accent">
        {article.title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm leading-relaxed text-secondary line-clamp-2">
        {article.description}
      </p>

      {/* Read CTA — slides up on hover */}
      <div className="mt-4 flex items-center gap-1.5 font-medium text-sm text-accent opacity-0 translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
        Read Article
        <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </motion.a>
  )
}

export default function LatestWriting({ articles, content }) {
  const reducedMotion = useReducedMotion()

  return (
    <section id="writing" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {articles.map((article, i) => (
            <ArticleCard
              key={article.link}
              article={article}
              index={i}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
