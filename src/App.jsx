import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'
import MobileBottomNav from './components/MobileBottomNav'
import ScrollProgressBar from './components/ScrollProgressBar'
import ScrollToTopButton from './components/ScrollToTopButton'
import SectionSkeleton from './components/SectionSkeleton'
import useActiveSection from './hooks/useActiveSection'
import {
  about,
  articles,
  certifications,
  experience,
  mobileNavSections,
  navSections,
  portfolioData,
  projectFilters,
  projects,
  sectionContent,
  skillGroups,
  testimonials
} from './data/portfolioData'
import { initAnalytics, trackScrollDepth } from './utils/analytics'
import { scrollToSection, scrollToTop } from './utils/scroll'

const Hero = lazy(() => import('./components/Hero'))
const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const Experience = lazy(() => import('./components/Experience'))
const Certifications = lazy(() => import('./components/Certifications'))
const LatestWriting = lazy(() => import('./components/LatestWriting'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const Contact = lazy(() => import('./components/Contact'))

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  const stored = window.localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [scrolled, setScrolled] = useState(false)

  const sectionIds = useMemo(() => navSections.map((section) => section.id), [])
  const activeSection = useActiveSection(sectionIds)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    initAnalytics()

    const reached = new Set()
    const thresholds = [25, 50, 75, 100]

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = total > 0 ? Math.round((window.scrollY / total) * 100) : 0
      setScrolled(window.scrollY > 18)

      thresholds.forEach((depth) => {
        if (progress >= depth && !reached.has(depth)) {
          reached.add(depth)
          trackScrollDepth(depth)
        }
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onAnchorClick = (event) => {
      if (!(event.target instanceof Element)) return
      const anchor = event.target.closest('a[href^="#"]')
      if (!anchor) return

      const href = anchor.getAttribute('href') || ''
      const id = href.replace('#', '')
      if (!id) return

      event.preventDefault()
      if (id === 'home') {
        scrollToTop()
      } else {
        scrollToSection(id)
      }
    }

    document.addEventListener('click', onAnchorClick)
    return () => document.removeEventListener('click', onAnchorClick)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const handleNavigate = (id) => {
    if (id === 'home') {
      scrollToTop()
      return
    }
    scrollToSection(id)
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-hidden font-body text-primary">
        <a
          href="#main-content"
          className="sr-only z-[80] rounded-md bg-panel px-3 py-2 text-sm text-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>

        <ScrollProgressBar />
        <CursorGlow />

        <div className="pointer-events-none fixed inset-0 -z-20 bg-page" />
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(35,170,190,0.2),_transparent_48%),radial-gradient(circle_at_80%_20%,_rgba(245,158,11,0.13),_transparent_45%)]" />
          <div className="particle-field absolute inset-0" />
          <div className="page-noise absolute inset-0" />
        </div>

        <Navbar
          name={portfolioData.name}
          theme={theme}
          onToggleTheme={toggleTheme}
          navSections={navSections}
          activeSection={activeSection}
          onNavigate={handleNavigate}
          scrolled={scrolled}
        />

        <motion.main
          id="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
          className="relative pb-20 md:pb-6"
        >
          <Suspense fallback={<SectionSkeleton />}>
            <Hero data={portfolioData} />
            <About data={about} content={sectionContent.about} />
            <Skills skillGroups={skillGroups} content={sectionContent.skills} />
            <Projects projects={projects} filters={projectFilters} content={sectionContent.projects} />
            <Experience items={experience} content={sectionContent.experience} />
            <Certifications items={certifications} content={sectionContent.certifications} />
            <LatestWriting articles={articles} content={sectionContent.writing} />
            <Testimonials items={testimonials} content={sectionContent.testimonials} />
            <Contact contact={portfolioData.contact} content={sectionContent.contact} />
          </Suspense>
        </motion.main>

        <Footer name={portfolioData.name} tagline={portfolioData.footerTagline} />
        <ScrollToTopButton />
        <MobileBottomNav
          sections={mobileNavSections}
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />
      </div>
    </MotionConfig>
  )
}
