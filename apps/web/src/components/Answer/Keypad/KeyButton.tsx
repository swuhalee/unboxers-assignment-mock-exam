import StaticButton from '../../Common/Button/StaticButton';

const KeyButton = ({ label, onClick, className = '' }: { label: string; onClick: () => void; className?: string }) => (
    <StaticButton onClick={onClick} className={`h-14 text-[22px] font-semibold text-omr-answer ${className}`}>
        {label}
    </StaticButton>
);

export default KeyButton;
