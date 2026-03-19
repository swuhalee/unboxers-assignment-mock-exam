import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OMRCard from './components/OMRCard/OMRCard'
import { useAnswerStore } from '@/pages/ExamPage/store/answerStore'
import { useExamQuery } from '@/hooks/useExam'
import { useExamStore, isPostExam } from '@/pages/ExamPage/store/examStore'
import { useExamScan } from './hooks/useExamScan'
import { useExamGuard } from './hooks/useExamGuard'
import ExamHeader from './components/ExamHeader/ExamHeader'
import ExamTimerBar from './components/ExamTimerBar/ExamTimerBar'
import ScanOverlay from './components/ScanOverlay/ScanOverlay'
import ExamEndView from './components/ExamEndView/ExamEndView'
import ScanningView from './components/ScanningView/ScanningView'
import ExamGuardOverlay from './components/ExamGuardOverlay/ExamGuardOverlay'

export default function ExamPage() {
  const { phase, startExam, finishExam, reset } = useExamStore()
  const { setActiveQ, reset: resetAnswer } = useAnswerStore()
  const { data: exam } = useExamQuery()
  const handleScan = useExamScan()
  const { warningCount, showWarning, dismissWarning } = useExamGuard(phase)

  useEffect(() => {
    reset()
    resetAnswer()
  }, [reset, resetAnswer])

  useEffect(() => {
    if (phase === 'ended') setActiveQ(null)
  }, [phase, setActiveQ])

  const handleTimerEnd = () => {
    if (phase === 'waiting') startExam()
    else if (phase === 'in-progress') finishExam()
  }

  const postExam = isPostExam(phase)

  return (
    <motion.div className="min-h-screen bg-bg-base flex flex-col">
      <ExamGuardOverlay show={showWarning} warningCount={warningCount} onDismiss={dismissWarning} />
      <AnimatePresence>
        {phase !== 'scanning' && (
          <motion.div exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
            <ExamHeader />
          </motion.div>
        )}
      </AnimatePresence>

      <main
        className={`flex-1 flex flex-col items-center justify-center pt-16 px-4 gap-10 overflow-auto ${postExam ? 'pb-12' : 'pb-36'}`}
      >
        <div className={`relative inline-flex ${postExam ? 'pointer-events-none' : ''}`}>
          <motion.div
            animate={{ scale: postExam ? 0.6 : 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ transformOrigin: 'center center' }}
            className="relative"
          >
            <OMRCard
              exam={exam?.title ?? ''}
              subject={exam?.subject ?? ''}
              supervisor={exam?.supervisorName ?? ''}
              totalMultiple={exam?.totalObjective ?? 0}
              totalShort={exam?.totalSubjective ?? 0}
            />

            <AnimatePresence>
              {phase === 'waiting' && (
                <motion.div
                  className="absolute inset-0 bg-white/60 z-10 rounded-4xl"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
              )}
            </AnimatePresence>

            {phase === 'scanning' && <ScanOverlay />}
          </motion.div>
        </div>

        <AnimatePresence>
          {phase === 'ended' && (
            <motion.div
              key="ended-view"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex flex-col items-center gap-6 w-full"
            >
              <ExamEndView onScan={handleScan} />
            </motion.div>
          )}
          {phase === 'scanning' && (
            <motion.div
              key="scanning-view"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex flex-col items-center gap-6 w-full"
            >
              <ScanningView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {!postExam && (
          <motion.div exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
            <ExamTimerBar phase={phase} onTimerEnd={handleTimerEnd} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
