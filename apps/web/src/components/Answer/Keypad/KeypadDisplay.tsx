import { memo } from 'react';

const HINT_TEXT = '숫자만 입력 · 단위 제외 · 분수는 -3/2';

interface KeypadDisplayProps {
    value: string;
    questionNumber?: number;
}

// 키 입력 시 Keypad가 리렌더되지만 value가 바뀌지 않은 경우 재렌더 방지
const KeypadDisplay = memo(({ value, questionNumber }: KeypadDisplayProps) => (
    <>
        <div className="flex items-center justify-center h-14 rounded-2xl bg-white shadow-button px-4">
            {value ? (
                <span className="text-[17px] font-semibold text-omr-answer">{value}</span>
            ) : (
                <span className="text-[17px] font-semibold text-omr-placeholder">
                    {questionNumber !== undefined ? `${questionNumber}번 답안을 입력하세요` : '입력할 곳을 터치해주세요'}
                </span>
            )}
        </div>
        <p className="text-[12px] text-omr-placeholder px-1">
            {HINT_TEXT}
        </p>
    </>
));

KeypadDisplay.displayName = 'KeypadDisplay';

export default KeypadDisplay;
