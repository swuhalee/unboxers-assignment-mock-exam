import { memo } from 'react';
import { FEATURE_CHIPS, INPUT_EXAMPLES } from './constants';

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

export default KeypadGuide;
