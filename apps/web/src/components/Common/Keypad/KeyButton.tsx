import StaticButton from '../Button/StaticButton';

const KeyButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <StaticButton onClick={onClick} className="h-14 text-[22px] font-semibold text-omr-answer">
        {label}
    </StaticButton>
);

export default KeyButton;
