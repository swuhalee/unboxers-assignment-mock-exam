import { useCallback, useEffect, useState } from 'react'
import SubjectiveGrid from '@/components/Answer/Subjective/SubjectiveGrid'
import Card from '@/components/Common/Card/Card'
import Keypad from '@/components/Answer/Keypad/Keypad'
import KeypadAnimation from '@/components/Answer/Keypad/KeypadAnimation'
import GuideTooltip from '@/components/Common/Guide/GuideTooltip'
import SimulationStep from '../templates/SimulationStep'

type Props = { onComplete: () => void }

const TOTAL = 12
const DEMO_Q = 4

const GUIDE_STEPS = [
    {
        tooltip: '다음으로 넘어가려면 직접 해보세요',
        title: '주관식 답안을 입력하려면 입력할 곳을 터치해요',
        subtitle: (
            <>
                <span className="text-highlight font-bold">4번 문제</span>의 답안을 입력해볼까요?
            </>
        ),
    },
    {
        tooltip: '다음으로 넘어가려면 직접 해보세요',
        title: '아무 숫자나 입력하고',
        subtitle: (
            <>
                <span className="text-highlight font-bold">완료</span> 버튼을 눌러서 답안을 작성해요
            </>
        ),
    },
    {
        tooltip: '다음으로 넘어가려면 직접 해보세요',
        title: '입력한 답안을 수정하려면',
        subtitle: <>해당 문제를 다시 한 번 터치해요</>,
    },
    {
        tooltip: '좋아요! 다음으로 넘어볼까요?',
        title: '주관식 답안 입력에 익숙해지셨어요',
        subtitle: <></>,
    },
]

export default function SubjectiveStep({ onComplete }: Props) {
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const [activeQ, setActiveQ] = useState<number | null>(null)
    const [step, setStep] = useState(1)

    useEffect(() => {
        if (step === 4) onComplete()
    }, [step, onComplete])

    const handleSelect = (qNum: number) => {
        setActiveQ(qNum)
        if (step === 1 && qNum === DEMO_Q) setStep(2)
        if (step === 3 && qNum === DEMO_Q) setStep(4)
    }

    const handleChange = (updater: (prev: string) => string) => {
        if (activeQ === null) return
        setAnswers(prev => ({ ...prev, [activeQ]: updater(prev[activeQ] ?? '') }))
    }

    const handleConfirm = () => {
        if (step === 2 && answers[DEMO_Q]) setStep(3)
        setActiveQ(null)
    }

    const renderPlaceholder = useCallback((qNum: number) => {
        if (qNum === DEMO_Q) {
            if (step === 1) return '여기를 터치해줘요!'
            if (step === 2) return '답안을 입력하세요'
        }
        return '터치해서 주관식 답안 입력'
    }, [step])

    const { tooltip, title, subtitle } = GUIDE_STEPS[step - 1]

    return (
        <SimulationStep>
            <div className="flex flex-col items-center gap-9">
                <div className="flex flex-row items-end" style={{ zoom: 0.7, transformOrigin: 'top center' }}>
                    <Card>
                        <SubjectiveGrid
                            total={TOTAL}
                            answers={answers}
                            activeQ={activeQ}
                            onSelect={handleSelect}
                            renderPlaceholder={renderPlaceholder}
                        />
                    </Card>
                    <KeypadAnimation show={activeQ !== null}>
                        <Keypad
                            value={activeQ !== null ? (answers[activeQ] ?? '') : ''}
                            questionNumber={activeQ ?? undefined}
                            onChange={handleChange}
                            onConfirm={handleConfirm}
                            showGuide={false}
                        />
                    </KeypadAnimation>
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
