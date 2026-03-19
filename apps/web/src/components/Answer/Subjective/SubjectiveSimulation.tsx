import { useState } from 'react';
import SubjectiveGrid from './SubjectiveGrid';
import Card from '../../Common/Card/Card';
import Keypad from '../Keypad/Keypad';
import KeypadAnimation from '../Keypad/KeypadAnimation';
import GuideTooltip from '../../Common/Guide/GuideTooltip';

const TOTAL = 12;
const DEMO_Q = 4;

const SubjectiveSimulation = () => {
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [activeQ, setActiveQ] = useState<number | null>(null);
    const [step, setStep] = useState(1);

    const handleSelect = (qNum: number) => {
        setActiveQ(qNum);
        if (step === 1 && qNum === DEMO_Q) setStep(2);
        if (step === 3 && qNum === DEMO_Q) setStep(4);
    };

    const handleChange = (updater: (prev: string) => string) => {
        if (activeQ === null) return;
        setAnswers(prev => ({ ...prev, [activeQ]: updater(prev[activeQ] ?? '') }));
    };

    const handleConfirm = () => {
        if (step === 2 && answers[DEMO_Q]) setStep(3);
        setActiveQ(null);
    };

    const renderPlaceholder = (qNum: number) => {
        if (qNum === DEMO_Q) {
            if (step === 1) return "여기를 터치해줘요!";
            if (step === 2) return "답안을 입력하세요";
        }
        return "터치해서 주관식 답안 입력";
    };

    const guideContent = () => {
        switch (step) {
            case 1:
                return {
                    tooltip: '다음으로 넘어가려면 직접 해보세요',
                    title: '주관식 답안을 입력하려면 입력할 곳을 터치해요',
                    subtitle: (
                        <>
                            <span className="text-highlight font-bold">4번 문제</span>의 답안을 입력해볼까요?
                        </>
                    ),
                };
            case 2:
                return {
                    tooltip: '다음으로 넘어가려면 직접 해보세요',
                    title: '아무 숫자나 입력하고',
                    subtitle: (
                        <>
                            <span className="text-highlight font-bold">완료</span> 버튼을 눌러서 답안을 작성해요
                        </>
                    ),
                };
            case 3:
                return {
                    tooltip: '다음으로 넘어가려면 직접 해보세요',
                    title: '입력한 답안을 수정하려면',
                    subtitle: <>해당 문제를 다시 한 번 터치해요</>,
                };
            default:
                return {
                    tooltip: '좋아요! 다음으로 넘어볼까요?',
                    title: '주관식 답안 입력에 익숙해지셨어요',
                    subtitle: <></>,
                };
        }
    };

    const { tooltip, title, subtitle } = guideContent();

    return (
        <div className="flex flex-col items-center gap-9">
            <div className="flex flex-row items-end">
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
                <p className="text-[28px] font-bold leading-snug">{title}</p>
                <p className="text-[28px] font-bold leading-snug">{subtitle}</p>
            </div>
        </div>
    );
};

export default SubjectiveSimulation;
