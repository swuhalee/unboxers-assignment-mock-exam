import { useEffect, useRef, useState, useCallback } from 'react'
import type { ExamPhase } from '../store/examStore'

export function useExamGuard(phase: ExamPhase) {
  const [warningCount, setWarningCount] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const lastTriggeredAt = useRef(0)

  const triggerWarning = useCallback(() => {
    const now = Date.now()
    if (now - lastTriggeredAt.current < 500) return
    lastTriggeredAt.current = now
    setWarningCount((prev) => prev + 1)
    setShowWarning(true)
  }, [])

  const dismissWarning = useCallback(() => {
    setShowWarning(false)
  }, [])

  useEffect(() => {
    if (phase !== 'in-progress') return

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
    }

    const handleVisibilityChange = () => {
      if (document.hidden) triggerWarning()
    }

    const handleBlur = () => {
      triggerWarning()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('blur', handleBlur)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('blur', handleBlur)
    }
  }, [phase, triggerWarning])

  return { warningCount, showWarning, dismissWarning }
}
