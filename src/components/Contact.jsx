import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  BarChart3,
  Bot,
  Github,
  Linkedin,
  Mail,
  Send,
  Twitter,
} from 'lucide-react'
import SectionHeading from './SectionHeading'
import Toast from './Toast'
import { trackCtaClick } from '../utils/analytics'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SPRING = { type: 'spring', stiffness: 260, damping: 24 }

function validateField(name, value) {
  if (name === 'name' && !value.trim()) return 'Name is required.'
  if (name === 'email') {
    if (!value.trim()) return 'Email is required.'
    if (!emailPattern.test(value)) return 'Enter a valid email address.'
  }
  if (name === 'message' && value.trim().length < 20) return 'Message should be at least 20 characters.'
  return ''
}

/* Floating-label input */
function FloatInput({ label, type = 'text', name, value, onChange, onBlur, error, required, rows }) {
  const [focused, setFocused] = useState(false)
  const isTextarea = !!rows
  const Tag = isTextarea ? 'textarea' : 'input'
  const hasContent = value.length > 0
  const float = focused || hasContent

  return (
    <div className="relative">
      <label
        htmlFor={`field-${name}`}
        className={`pointer-events-none absolute left-3 z-10 select-none font-medium transition-all duration-200 ${float
          ? 'top-1.5 text-[10px] text-accent'
          : 'top-3.5 text-sm text-secondary'
          }`}
      >
        {label}{required && <span className="ml-0.5 text-accent">*</span>}
      </label>
      <Tag
        id={`field-${name}`}
        name={name}
        type={type}
        value={value}
        rows={rows}
        required={required}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={(e) => { setFocused(false); onBlur(e) }}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full rounded-xl border bg-panel-soft px-3 pb-2.5 pt-6 text-sm text-primary outline-none transition-all duration-200 ${error
          ? 'border-rose-400 focus:border-rose-400'
          : 'border-ringline/70 focus:border-accent focus:shadow-[0_0_0_2px_rgba(45,212,191,0.15)]'
          } ${isTextarea ? 'resize-none' : ''}`}
      />
      {error && (
        <span id={`${name}-error`} className="mt-1 block text-xs text-rose-400">
          {error}
        </span>
      )}
    </div>
  )
}

export default function Contact({ contact, content }) {
  const reducedMotion = useReducedMotion()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({ name: '', email: '', message: '' })
  const [toast, setToast] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const socialLinks = useMemo(
    () => [
      { key: 'linkedin', label: 'LinkedIn', href: contact.linkedin, icon: Linkedin },
      { key: 'github', label: 'GitHub', href: contact.github, icon: Github },
      { key: 'twitter', label: 'X / Twitter', href: contact.twitter, icon: Twitter },
    ],
    [contact],
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = {
      name: validateField('name', form.name),
      email: validateField('email', form.email),
      message: validateField('message', form.message),
    }
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) {
      setToast({ type: 'error', message: 'Please fix the highlighted fields before submitting.' })
      return
    }
    setSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 650))
      setToast({ type: 'success', message: 'Message sent! I\'ll get back to you shortly. 🚀' })
      setForm({ name: '', email: '', message: '' })
      trackCtaClick('contact_form_submit', 'contact')
    } catch {
      setToast({ type: 'error', message: 'Something went wrong. Please try again in a moment.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        {/* Mobile: stacked, Desktop: side-by-side */}
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          {/* ── Direct contact info ── */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={SPRING}
            className="glass-card interactive-card rounded-2xl p-5 sm:p-6"
          >
            <h3 className="font-display text-lg font-bold text-primary sm:text-xl">
              {content.directTitle}
            </h3>

            {/* Contact action links — full-width touch-friendly */}
            <div className="mt-4 space-y-2.5">
              <a
                href={`mailto:${contact.email}`}
                className="glass-card interactive-card flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-secondary"
                aria-label="Email Pravin Pandit"
              >
                <Mail size={16} className="shrink-0 text-accent" />
                <span className="min-w-0 truncate">{contact.email}</span>
              </a>

            </div>

            {/* Social links — 2-col grid on all sizes */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {socialLinks.map(({ key, href, label, icon: Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card interactive-card flex items-center gap-2 rounded-xl px-3 py-3 text-sm text-secondary"
                  aria-label={label}
                >
                  <Icon size={15} className="shrink-0 text-accent" />
                  <span className="truncate font-medium">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Contact form ── */}
          <motion.form
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ ...SPRING, delay: 0.06 }}
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-5 sm:p-6"
            noValidate
          >
            <h3 className="font-display text-lg font-bold text-primary sm:text-xl">
              {content.formTitle}
            </h3>

            <div className="mt-5 space-y-4">
              {/* Name + Email: side-by-side on sm+, stacked on mobile */}
              <div className="grid gap-4 sm:grid-cols-2">
                <FloatInput
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name}
                  required
                />
                <FloatInput
                  label="Email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  required
                />
              </div>

              <FloatInput
                label="Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.message}
                required
                rows={5}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all duration-200 hover:scale-[1.02] hover:bg-accent-strong hover:shadow-[0_0_32px_rgba(45,212,191,0.5)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-6 sm:py-2.5"
              aria-label="Submit contact form"
            >
              {submitting ? 'Sending…' : 'Send Message'}
              <Send size={15} />
            </button>
          </motion.form>
        </div>
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </section>
  )
}
