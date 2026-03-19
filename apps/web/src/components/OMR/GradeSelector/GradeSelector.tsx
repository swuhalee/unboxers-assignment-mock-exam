import { memo } from 'react';
import Bubble from '../../Common/Bubble/Bubble';
import OMRSection from '../OMRSection';

interface GradeSelectorProps {
    value: number | null;
    onChange: (grade: number) => void;
}

// grade 미변경 시 OMRCard 리렌더 전파 차단
// 헤더: 피그마 요구사항에 따라 세로쓰기 적용
const GradeSelector = memo(({ value, onChange }: GradeSelectorProps) => (
    <OMRSection title="학년" headerClassName="text-[14px] [writing-mode:vertical-rl]">
        <div className="flex flex-col gap-3 px-2 py-2.5">
            <Bubble
                count={3}
                marked={value !== null ? [value] : []}
                onMark={onChange}
                direction="col"
            />
        </div>
    </OMRSection>
));

export default GradeSelector;
