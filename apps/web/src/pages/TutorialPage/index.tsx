import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import StaticButton from '@/components/Common/Button/StaticButton'
import ActiveButton from '@/components/Common/Button/ActiveButton'
import IntroStep from './components/IntroStep/IntroStep'
import OmrStep from './components/OmrStep/OmrStep'
import ObjectiveStep from './components/ObjectiveStep/ObjectiveStep'
import SubjectiveStep from './components/SubjectiveStep/SubjectiveStep'
import TimerStep from './components/TimerStep/TimerStep'
import {
  type TutorialStep,
  useTutorialStore,
  isFirstStep,
  isLastStep,
  isNextEnabled,
} from './store/tutorialStore'
import { useTutorialAnimation } from './hooks/useTutorialAnimation'
import arrowIcon from '@/assets/left_arrow.svg'

const STEP_CONTENT: Record<TutorialStep, (onComplete: () => void) => React.ReactElement> = {
  intro: () => <IntroStep />,
  omr: () => <OmrStep />,
  objective: (onComplete) => <ObjectiveStep onComplete={onComplete} />,
  subjective: (onComplete) => <SubjectiveStep onComplete={onComplete} />,
  timer: () => <TimerStep />,
}

export default function TutorialPage() {
  const { step, simulationCompleted, completeSimulation, goNext, goPrev, reset } = useTutorialStore()
  const navigate = useNavigate()
  
  useEffect(() => {
    return () => reset()
  }, [reset])

  const isFirst = isFirstStep(step)
  const isLast = isLastStep(step)

  const { directionRef, setDirection, prevInLayout, setPrevInLayout, navDirection } = useTutorialAnimation(isFirst, isLast)

  const handleNext = () => {
    if (isLast) {
      navigate('/exam')
    } else {
      setDirection(1)
      goNext()
    }
  }

  const handlePrev = () => {
    setDirection(-1)
    goPrev()
  }

  const handleSkip = () => navigate('/exam')

  return (
    <div className='flex flex-1 flex-col justify-between'>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: directionRef.current * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: directionRef.current * -40 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="flex flex-1 flex-col items-center justify-center min-h-[calc(100vh-19rem)]"
        >
          {STEP_CONTENT[step](completeSimulation)}
        </motion.div>
      </AnimatePresence>

      <nav className={`px-6 py-4 flex items-center gap-3 ${prevInLayout ? 'justify-between' : 'justify-center'}`}>
        <AnimatePresence onExitComplete={() => setPrevInLayout(false)}>
          {!isFirst && (
            <motion.div
              key="prev-btn"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <StaticButton onClick={handlePrev} className="w-60.75 text-[17px] font-semibold text-text-sub items-center gap-2">
                <img src={arrowIcon} alt="" aria-hidden="true" /> 이전으로
              </StaticButton>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div layout transition={{ duration: 0.4, ease: 'easeInOut' }} className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            {isLast ? (
              <motion.div
                key="last"
                initial={{ opacity: 0, x: navDirection * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: navDirection * -20 }}
                transition={{ duration: 0.2 }}
              >
                <ActiveButton onClick={handleNext} isActive className="w-60.75 text-[17px] font-semibold">
                  시험 화면으로 이동
                </ActiveButton>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0, x: navDirection * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: navDirection * -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3"
              >
                <StaticButton onClick={handleSkip} className="w-60.75 text-[17px] font-semibold text-text-sub">
                  튜토리얼 건너뛰기
                </StaticButton>

                <ActiveButton
                  onClick={handleNext}
                  isActive={isNextEnabled(step, simulationCompleted)}
                  className="w-60.75 text-[17px] font-semibold"
                >
                  다음
                </ActiveButton>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </nav>
    </div>
  )
}
