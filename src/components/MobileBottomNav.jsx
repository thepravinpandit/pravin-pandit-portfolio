import { motion, useReducedMotion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import {
  BriefcaseBusiness,
  FolderGit2,
  House,
  MessageSquare,
  NotebookPen
} from 'lucide-react'

const iconMap = {
  House,
  FolderGit2,
  BriefcaseBusiness,
  NotebookPen,
  MessageSquare,
}

export default function MobileBottomNav({ sections, activeSection, onNavigate }) {
  const reducedMotion = useReducedMotion()

  return (
    <nav
      aria-label="Mobile section navigation"
      className="fixed inset-x-0 bottom-0 z-[65] border-t border-ringline/60 bg-page/95 px-2 pb-safe pt-1 backdrop-blur-2xl md:hidden"
      style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}
    >
      <ul className="grid grid-cols-5 gap-0.5">
        {sections.map((item) => {
          const Icon = iconMap[item.icon] || House
          const isActive =
            activeSection === item.id ||
            (item.id === 'home' && activeSection === 'home')

          return (
            <li key={item.id}>
              <button
                type="button"
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onNavigate(item.id)}
                className="relative flex w-full flex-col items-center gap-0.5 rounded-xl py-2 text-[10px] font-medium transition-colors duration-150"
              >
                {/* Active pill background */}
                {isActive && !reducedMotion && (
                  <motion.span
                    layoutId="bottom-nav-pill"
                    className="absolute inset-x-1 inset-y-0 rounded-xl bg-accent/15"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    aria-hidden="true"
                  />
                )}
                {isActive && reducedMotion && (
                  <span className="absolute inset-x-1 inset-y-0 rounded-xl bg-accent/15" aria-hidden="true" />
                )}

                <span className={`relative z-10 transition-colors duration-150 ${isActive ? 'text-accent' : 'text-secondary'}`}>
                  <Icon size={20} />
                </span>
                <span className={`relative z-10 transition-colors duration-150 ${isActive ? 'text-accent' : 'text-secondary'}`}>
                  {item.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
