import { useState } from 'react'
import Timer from '@/components/Common/Timer/Timer'
import StaticButton from '@/components/Common/Button/StaticButton'
import ProblemIcon from '@/assets/problem.svg'
import CheckIcon from '@/assets/check.svg'
import type { ExamPhase } from '@/pages/ExamPage/store/examStore'

const WAITING_SECONDS = 8
const EXAM_SECONDS = 10

interface ExamTimerBarProps {
  phase: ExamPhase
  onTimerEnd: () => void
}

export default function ExamTimerBar({ phase, onTimerEnd }: ExamTimerBarProps) {
  const [called, setCalled] = useState(false)

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white px-15 py-6 flex items-center gap-9 shadow-card">
      <div className="flex-1">
        <Timer
          totalSeconds={phase === 'waiting' ? WAITING_SECONDS : EXAM_SECONDS}
          mode={phase === 'waiting' ? 'before' : 'during'}
          onEnd={onTimerEnd}
        />
      </div>

      <StaticButton
        className="h-13 w-50 gap-1.5 text-[17px] font-semibold text-text-sub"
        onClick={() => setCalled(true)}
        disabled={called}
      >
        <img src={called ? CheckIcon : ProblemIcon} alt="" aria-hidden="true" />
        {called ? '선생님 호출 완료!' : '문제가 생겼나요?'}
      </StaticButton>
    </div>
  )
}
