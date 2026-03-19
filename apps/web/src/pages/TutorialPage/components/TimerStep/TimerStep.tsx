import Timer from '@/components/Common/Timer/Timer'
import StaticButton from '@/components/Common/Button/StaticButton'
import ProblemIcon from '@/assets/problem.svg'
import SimulationStep from '../templates/SimulationStep'

const DEMO_SECONDS = 10

export default function TimerStep() {
  return (
    <SimulationStep>
    <div className="flex flex-col items-center justify-center gap-12 w-full">
      {/* ExamTimerBar 미리보기 */}
      <div className="w-full bg-white rounded-2xl shadow-card px-10 py-6 flex items-center gap-9" style={{ zoom: 0.6, transformOrigin: 'top center' }}>
        <div className="flex-1">
          <Timer
            totalSeconds={DEMO_SECONDS}
            examDurationMinutes={60}
            mode="during"
          />
        </div>
        <StaticButton
          className="h-13 w-50 gap-1.5 text-[17px] font-semibold text-text-sub"
          disabled
        >
          <img src={ProblemIcon} alt="" aria-hidden="true" />
          문제가 생겼나요?
        </StaticButton>
      </div>

      {/* 설명 텍스트 */}
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-[36px] font-extrabold leading-snug text-text-sub">
          시간이 모두 지나면 시험은 종료되고 OMR카드는 자동으로 제출돼요
        </p>
        <p className="text-[36px] font-extrabold leading-snug text-highlight">
          마킹하지 못한 답안은 모두 오답 처리되니 미리 마킹하세요
        </p>
      </div>
    </div>
    </SimulationStep>
  )
}
