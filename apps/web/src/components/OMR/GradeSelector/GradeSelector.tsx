import { memo } from 'react';
import Bubble from '../../Common/Bubble/Bubble';

interface GradeSelectorProps {
    value: number | null;
    onChange: (grade: number) => void;
}

// grade 미변경 시 OMRCard 리렌더 전파 차단
const GradeSelector = memo(({ value, onChange }: GradeSelectorProps) => (
    <div className="inline-flex flex-col border-[1.5px] border-omr-border">
        {/* 헤더: 피그마 요구사항에 따라 세로쓰기 적용 */}
        <div className="flex items-center justify-center h-10 border-b-[1.5px] border-omr-border text-[14px] font-semibold text-omr-num [writing-mode:vertical-rl]">
            학년
        </div>

        <div className="flex flex-col gap-3 px-2 py-2.5">
            <Bubble
                count={3}
                marked={value !== null ? [value] : []}
                onMark={onChange}
                direction="col"
            />
        </div>
    </div>
));

export default GradeSelector;
