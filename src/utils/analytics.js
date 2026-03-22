const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
let initialized = false

export function initAnalytics() {
  if (!GA_ID || initialized || typeof window === 'undefined') {
    return
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { send_page_view: true })

  initialized = true
}

export function trackEvent(eventName, params = {}) {
  if (!window.gtag) return
  window.gtag('event', eventName, params)
}

export function trackCtaClick(label, location) {
  trackEvent('cta_click', { label, location })
}

export function trackScrollDepth(depth) {
  trackEvent('scroll_depth', { depth_percent: depth })
}
