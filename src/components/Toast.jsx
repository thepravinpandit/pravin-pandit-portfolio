import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, AlertCircle } from 'lucide-react'

export default function Toast({ toast, onClose }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-2 rounded-xl border border-ringline bg-panel px-4 py-3 text-sm shadow-panel md:bottom-8"
        >
          {toast.type === 'success' ? (
            <CheckCircle2 size={16} className="text-accent" />
          ) : (
            <AlertCircle size={16} className="text-amber-500" />
          )}
          <span className="text-primary">{toast.message}</span>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 text-xs text-secondary underline-offset-2 hover:underline"
            aria-label="Dismiss notification"
          >
            Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
