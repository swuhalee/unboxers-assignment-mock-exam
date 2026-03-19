import { useEffect, useState } from 'react'
import ObjectiveGrid from '@/components/Answer/Objective/ObjectiveGrid'
import Card from '@/components/Common/Card/Card'
import GuideTooltip from '@/components/Common/Guide/GuideTooltip'
import SimulationStep from '../templates/SimulationStep'

type Props = { onComplete: () => void }

const GUIDE_STEPS = [
    {
        tooltip: '다음으로 넘어가려면 직접 해보세요',
        title: '객관식 답안은 화면을 터치해서 마킹해요',
        subtitle: (
            <>
                <span className="text-highlight font-bold">15번 문제</span>에{' '}
                <span className="text-highlight font-bold">3번</span>으로 답안을 마킹해보세요
            </>
        ),
    },
    {
        tooltip: '다음으로 넘어가려면 직접 해보세요',
        title: '마킹한 곳을 한 번 더 터치하면 지울 수 있어요',
        subtitle: (
            <>
                <span className="text-highlight font-bold">15번 문제</span>에{' '}
                <span className="text-highlight font-bold">3번</span> 답안을 지워보세요
            </>
        ),
    },
    {
        tooltip: '다음으로 넘어가려면 직접 해보세요',
        title: '2개 이상의 답안을 골라야 하는 문제에서는',
        subtitle: <>두 답안 모두 마킹하면 됩니다</>,
    },
    {
        tooltip: '좋아요! 다음으로 넘어볼까요?',
        title: '객관식 답안 입력에 익숙해지셨어요',
        subtitle: <></>,
    },
]

const TOTAL = 30

export default function ObjectiveStep({ onComplete }: Props) {
    const [answers, setAnswers] = useState<Record<number, number[]>>({})
    const [step, setStep] = useState(1)

    useEffect(() => {
        if (step === 4) onComplete()
    }, [step, onComplete])

    const handleMark = (qNum: number, choice: number) => {
        setAnswers(prev => {
            const current = prev[qNum] || []
            const next = current.includes(choice)
                ? current.filter(c => c !== choice)
                : [...current, choice]

            const newAnswers = { ...prev, [qNum]: next }

            if (step === 1 && qNum === 15 && next.includes(3)) setStep(2)
            if (step === 2 && qNum === 15 && next.length === 0) setStep(3)
            if (step === 3 && next.length >= 2) setStep(4)

            return newAnswers
        })
    }

    const { tooltip, title, subtitle } = GUIDE_STEPS[step - 1]

    return (
        <SimulationStep>
            <div className="flex flex-col items-center gap-9">
                <div style={{ zoom: 0.7, transformOrigin: 'top center' }}>
                    <Card>
                        <ObjectiveGrid total={TOTAL} answers={answers} onMark={handleMark} />
                    </Card>
                </div>

                <GuideTooltip message={tooltip} />

                <div className="flex flex-col items-center gap-1 px-6 text-center">
                    <p className="text-[36px] font-extrabold leading-snug text-text-sub">{title}</p>
                    <p className="text-[36px] font-extrabold leading-snug text-text-sub">{subtitle}</p>
                </div>
            </div>
        </SimulationStep>
    )
}
