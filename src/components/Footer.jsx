import { motion } from 'framer-motion'
import { Github, Heart, Linkedin, Twitter } from 'lucide-react'

const SOCIAL = [
  { icon: Github, href: 'https://github.com/thepravinpandit', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/pravinpandit', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/impravin0708', label: 'X / Twitter' },
]

export default function Footer({ name, tagline }) {
  return (
    <footer className="border-t border-ringline/60 py-8 pb-24 md:pb-8">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Divider gradient */}
        <div className="mb-6 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Brand */}
          <div>
            <p className="font-display text-sm font-semibold text-primary">
              <span className="text-accent">&lt;/&gt;</span> {name}
            </p>
            <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              {tagline}
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="social-link inline-flex h-9 w-9 items-center justify-center rounded-xl border border-ringline/60 bg-panel text-secondary hover:border-accent/60 hover:text-accent"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.94 }}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="flex items-center gap-1.5 text-xs text-secondary">
            © {new Date().getFullYear()} {name} · Built with{' '}
            <Heart size={11} className="text-accent" aria-hidden="true" /> React + Vite
          </p>
        </div>
      </div>
    </footer>
  )
}
