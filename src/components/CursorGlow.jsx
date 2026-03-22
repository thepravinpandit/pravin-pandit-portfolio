import { useEffect, useState } from 'react'

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -200, y: -200 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return undefined
    }

    let raf = null
    const handleMove = (event) => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setPosition({ x: event.clientX, y: event.clientY })
      })
    }

    window.addEventListener('mousemove', handleMove)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', handleMove)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] hidden md:block"
      style={{
        background: `radial-gradient(420px circle at ${position.x}px ${position.y}px, rgba(45,212,191,0.14), transparent 55%)`
      }}
    />
  )
}
