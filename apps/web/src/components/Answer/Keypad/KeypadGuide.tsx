import { memo } from 'react';

const FEATURE_CHIPS = [
    { label: '소수점', symbol: '.' },
    { label: '분수', symbol: '/' },
    { label: '음수', symbol: '-' },
] as const;

const INPUT_EXAMPLES = [
    { description: '제3사분면', input: '3' },
    { description: '3,700만원', input: '37000000' },
    { description: '마이너스 2/3', input: '-2/3' },
    { description: '95%', input: '95' },
] as const;

const KeypadGuide = memo(() => (
    <>
        <hr className="border-omr-placeholder/30 mx-1" />

        <div className="flex gap-2 px-1">
            {FEATURE_CHIPS.map(({ label, symbol }) => (
                <span
                    key={label}
                    className="text-[12px] text-omr-placeholder border border-omr-placeholder/40 rounded-full px-2.5 py-0.5"
                >
                    {label} {symbol}
                </span>
            ))}
        </div>
        <div className="px-1">
            <p className="text-[11px] font-semibold text-omr-answer/40 mb-1.5">어떻게 입력하나요?</p>
            <div className="flex flex-col gap-1">
                {INPUT_EXAMPLES.map(({ description, input }) => (
                    <div key={description} className="flex justify-between items-center">
                        <span className="text-[12px] text-omr-placeholder">{description}</span>
                        <span className="text-[12px] font-semibold text-omr-placeholder/80 rounded-md px-2 py-0.5">
                            {input}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </>
));

KeypadGuide.displayName = 'KeypadGuide';

export default KeypadGuide;
