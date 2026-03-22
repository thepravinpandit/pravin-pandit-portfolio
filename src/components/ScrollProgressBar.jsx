import { useEffect, useState } from 'react'

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const current = window.scrollY
      const value = total > 0 ? Math.min(current / total, 1) : 0
      setProgress(value)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed left-0 right-0 top-0 z-[70] h-[3px] bg-transparent">
      <div
        className="h-full origin-left bg-accent shadow-[0_0_20px_rgba(45,212,191,0.6)] transition-[transform] duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
