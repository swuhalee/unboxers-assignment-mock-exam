import { memo } from 'react';
import StaticButton from '../../Common/Button/StaticButton';

const KeyButton = memo(({ label, onClick, className = '' }: { label: string; onClick: (key: string) => void; className?: string }) => (
    <StaticButton onClick={() => onClick(label)} className={`h-14 text-[22px] font-semibold text-text-sub ${className}`}>
        {label}
    </StaticButton>
));

KeyButton.displayName = 'KeyButton';


export default KeyButton;
