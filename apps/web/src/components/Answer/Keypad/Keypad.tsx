import { useCallback } from 'react';
import StaticButton from '../../Common/Button/StaticButton';
import ActiveButton from '../../Common/Button/ActiveButton';
import deleteIcon from '@/assets/delete.svg';
import KeyButton from './KeyButton';
import KeypadDisplay from './KeypadDisplay';
import KeypadGuide from './KeypadGuide';
import { SPECIAL_KEYS, NUMBER_KEYS } from './constants';

interface KeypadProps {
    value: string;
    questionNumber?: number;
    onChange: (updater: (prev: string) => string) => void;
    onConfirm: () => void;
    showGuide?: boolean;
}

const Keypad = ({ value, questionNumber, onChange, onConfirm, showGuide = true }: KeypadProps) => {
    const handleKey = useCallback((key: string) => onChange((prev) => {
        if (key === '-' && prev.includes('-')) return prev;
        if (key === '/' && prev.includes('/')) return prev;
        if (key === '.' && prev.includes('.')) return prev;
        if (key === '.' && prev.endsWith('-')) return prev;
        return prev + key;
    }), [onChange]);
    const handleDelete = useCallback(() => onChange((prev) => prev.slice(0, -1)), [onChange]);

    return (
        <div className="flex flex-col gap-3 p-4 w-64">
            <KeypadDisplay value={value} questionNumber={questionNumber} />

            {/* 특수 키 */}
            <div className="grid grid-cols-3 gap-3">
                {SPECIAL_KEYS.map((key) => (
                    <KeyButton key={key} label={key} onClick={() => handleKey(key)} />
                ))}
            </div>

            {/* 숫자 키 */}
            {NUMBER_KEYS.map((row) => (
                <div key={row[0]} className="grid grid-cols-3 gap-3">
                    {row.map((key) => (
                        <KeyButton key={key} label={key} onClick={() => handleKey(key)} />
                    ))}
                </div>
            ))}

            {/* 0 + 백스페이스 */}
            <div className="grid grid-cols-3 gap-3">
                <KeyButton label="0" onClick={() => handleKey('0')} className="col-span-2" />
                <StaticButton onClick={handleDelete} className="h-14">
                    <img src={deleteIcon} alt="지우기" />
                </StaticButton>
            </div>

            <ActiveButton
                isActive={value.length > 0}
                onClick={value.length > 0 ? onConfirm : undefined}
                variant='blue'
                className="w-full h-14 text-[17px] font-semibold"
            >
                완료
            </ActiveButton>

            {showGuide && <KeypadGuide />}
        </div>
    );
};

export default Keypad;
