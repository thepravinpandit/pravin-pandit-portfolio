export function getNavbarOffset() {
  const navbar = document.querySelector('[data-navbar="true"]')
  return navbar ? navbar.getBoundingClientRect().height + 12 : 88
}

export function scrollToSection(id) {
  if (!id) return
  const target = document.getElementById(id)
  if (!target) return

  const offset = getNavbarOffset()
  const top = window.scrollY + target.getBoundingClientRect().top - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
