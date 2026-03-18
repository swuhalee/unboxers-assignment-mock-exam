import { useState } from 'react';
import ObjectiveGrid from './ObjectiveGrid';
import Card from '../../Common/Card/Card';
import GuideTooltip from '../../Common/Guide/GuideTooltip';

const ObjectiveSimulation = () => {
    const [answers, setAnswers] = useState<Record<number, number[]>>({});
    const [step, setStep] = useState(1);
    const total = 30;

    const handleMark = (qNum: number, choice: number) => {
        setAnswers(prev => {
            const current = prev[qNum] || [];
            const next = current.includes(choice)
                ? current.filter(c => c !== choice)
                : [...current, choice];

            const newAnswers = { ...prev, [qNum]: next };

            if (step === 1 && qNum === 15 && next.includes(3)) setStep(2);
            if (step === 2 && qNum === 15 && next.length === 0) setStep(3);
            if (step === 3 && qNum === 15 && next.length >= 2) setStep(4);

            return newAnswers;
        });
    };

    const guideContent = () => {
        switch (step) {
            case 1:
                return {
                    tooltip: '다음으로 넘어가려면 직접 해보세요',
                    title: '객관식 답안은 화면을 터치해서 마킹해요',
                    subtitle: (
                        <>
                            <span className="text-highlight font-bold">15번 문제</span>에{' '}
                            <span className="text-highlight font-bold">3번</span>으로 답안을 마킹해보세요
                        </>
                    ),
                };
            case 2:
                return {
                    tooltip: '다음으로 넘어가려면 직접 해보세요',
                    title: '마킹한 곳을 한 번 더 터치하면 지울 수 있어요',
                    subtitle: (
                        <>
                            <span className="text-highlight font-bold">15번 문제</span>에{' '}
                            <span className="text-highlight font-bold">3번</span> 답안을 지워보세요
                        </>
                    ),
                };
            case 3:
                return {
                    tooltip: '다음으로 넘어가려면 직접 해보세요',
                    title: '2개 이상의 답안을 골라야 하는 문제에서는',
                    subtitle: <>두 답안 모두 마킹하면 됩니다</>,
                };
            default:
                return {
                    tooltip: '좋아요! 다음으로 넘어볼까요?',
                    title: '객관식 답안 입력에 익숙해지셨어요',
                    subtitle: <></>,
                };
        }
    };

    const { tooltip, title, subtitle } = guideContent();

    return (
        <div className="flex flex-col items-center gap-9">
            <div>
                <Card>
                    <ObjectiveGrid total={total} answers={answers} onMark={handleMark} />
                </Card>
            </div>

            <GuideTooltip message={tooltip} />

            <div className="flex flex-col items-center gap-1 px-6 text-center">
                <p className="text-[28px] font-bold leading-snug">{title}</p>
                <p className="text-[28px] leading-snug">{subtitle}</p>
            </div>
        </div>
    );
};

export default ObjectiveSimulation;
