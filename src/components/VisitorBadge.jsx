import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'

export default function VisitorBadge({ counter }) {
  const [visits, setVisits] = useState(null)

  useEffect(() => {
    if (!counter?.namespace || !counter?.key) return

    const cacheKey = `${counter.namespace}:${counter.key}`
    const cached = window.sessionStorage.getItem(cacheKey)

    if (cached) {
      setVisits(cached)
      return
    }

    fetch(`https://api.countapi.xyz/hit/${counter.namespace}/${counter.key}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data?.value) return
        const value = Number(data.value).toLocaleString()
        setVisits(value)
        window.sessionStorage.setItem(cacheKey, value)
      })
      .catch(() => {
        setVisits(null)
      })
  }, [counter])

  if (!visits) return null

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-ringline/80 bg-panel/90 px-3 py-1.5 text-xs font-medium text-secondary backdrop-blur">
      <Users size={13} className="text-accent" />
      <span>{visits} visitors</span>
    </div>
  )
}
