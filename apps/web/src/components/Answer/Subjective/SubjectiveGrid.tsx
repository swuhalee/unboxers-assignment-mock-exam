import { memo } from 'react';
import OMRSection from '../../OMR/OMRSection';

// 수능 규격 주관식 9문항, 모의고사도 최대 12문항 이내로 출제된다고 가정하여 상수화
const MAX_SLOTS = 12;

interface SubjectiveGridProps {
    total: number;
    answers: Record<number, string>;
    activeQ: number | null;
    onSelect: (qNum: number) => void;
    renderPlaceholder?: (qNum: number) => string;
}

// answers/activeQ 미변경 시 12칸 재계산 방지
const SubjectiveGrid = memo(({ total, answers, activeQ, onSelect, renderPlaceholder }: SubjectiveGridProps) => {
    return (
        <OMRSection title="주관식답안" className="w-90" headerClassName="text-2xl tracking-[0.5em]">
            <div className="flex flex-1 flex-col">
                {Array.from({ length: MAX_SLOTS }, (_, i) => {
                    const qNum = i + 1;
                    const isActive = activeQ === qNum;
                    const isOver = qNum > total;
                    const value = answers[qNum] ?? '';

                    const slotClass = [
                        'flex flex-1 flex-row',
                        !isOver && qNum !== MAX_SLOTS && 'border-b border-omr-border',
                        !isOver && 'cursor-pointer',
                        isActive && 'bg-omr-bubble-bg',
                    ].filter(Boolean).join(' ');

                    return (
                        <div
                            key={qNum}
                            onClick={isOver ? undefined : () => onSelect(qNum)}
                            className={slotClass}
                        >
                            <div className="w-7 flex items-center justify-center bg-omr-num-bg border-r border-omr-border shrink-0">
                                {!isOver && <span className="text-sm font-semibold text-omr-num">{qNum}</span>}
                            </div>
                            <div className="flex flex-1 items-center justify-center px-3 py-2.5">
                                {!isOver && (value ? (
                                    <span className="text-[17px] font-semibold text-omr-answer">{value}</span>
                                ) : (

                                    <span className="text-[17px] font-semibold text-omr-placeholder">
                                        {renderPlaceholder ? renderPlaceholder(qNum) : "터치해서 주관식 답안 입력"}
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </OMRSection>
    );
});

export default SubjectiveGrid;
