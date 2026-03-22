import { useEffect, useState } from 'react'

export default function useActiveSection(sectionIds = []) {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    if (!sectionIds.length) return undefined

    let observer = null
    const visible = new Map()

    const observeSections = () => {
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean)

      if (!sections.length) return
      if (observer) observer.disconnect()

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visible.set(entry.target.id, entry.intersectionRatio)
            } else {
              visible.delete(entry.target.id)
            }
          })

          if (window.scrollY < 120) {
            setActiveSection('home')
            return
          }

          if (visible.size) {
            const sorted = [...visible.entries()].sort((a, b) => b[1] - a[1])
            setActiveSection(sorted[0][0])
          }
        },
        {
          threshold: [0.2, 0.4, 0.6, 0.8],
          rootMargin: '-120px 0px -45% 0px'
        }
      )

      sections.forEach((section) => observer.observe(section))
    }

    observeSections()

    const domObserver = new MutationObserver(() => observeSections())
    domObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      if (observer) observer.disconnect()
      domObserver.disconnect()
    }
  }, [sectionIds])

  return activeSection
}
