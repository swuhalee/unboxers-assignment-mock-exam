import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ActiveButton from '@/components/Common/Button/ActiveButton'

const AUTO_DISMISS_MS = 3000

interface ExamGuardOverlayProps {
  show: boolean
  warningCount: number
  onDismiss: () => void
}

export default function ExamGuardOverlay({ show, warningCount, onDismiss }: ExamGuardOverlayProps) {
  useEffect(() => {
    if (!show) return
    const timer = setTimeout(onDismiss, AUTO_DISMISS_MS)
    return () => clearTimeout(timer)
  }, [show, onDismiss])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="bg-white rounded-md shadow-card px-8 py-8 flex flex-col items-center gap-5 max-w-xs w-full mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-text-sub font-semibold text-base leading-snug">
                시험 중 화면을 이탈했습니다
              </p>
              <p className="text-text-sub text-sm leading-snug">
                이탈 횟수: {warningCount}회
              </p>
            </div>
            <p className="text-text-sub text-xs text-center leading-relaxed">
              시험 중에는 다른 탭이나 창으로 이동하거나<br />
              커서를 화면 밖으로 내보내지 마세요.
            </p>
            <ActiveButton isActive onClick={onDismiss} className="w-full text-sm font-medium">
              확인
            </ActiveButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
