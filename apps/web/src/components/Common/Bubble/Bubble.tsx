interface BubbleItemProps {
    number: number;
    selected: boolean;
    onClick: (value: number) => void;
}

const BubbleItem = ({ number, selected, onClick }: BubbleItemProps) => {
    return (
        <div
            onClick={() => onClick(number)}
            className={`flex items-center justify-center w-5 h-11 rounded-[20px] ${selected ? 'bg-bubble-selected' : 'bg-bubble-default'} text-white font-bold text-xs cursor-pointer`}
        >
            {number}
        </div>
    );
};

interface BubbleProps {
    count?: number;
    marked: number[];
    onMark: (choice: number) => void;
    direction?: 'row' | 'col';
    startFrom?: number;
}

const Bubble = ({ count = 5, marked, onMark, direction = 'row', startFrom = 1 }: BubbleProps) => {
    const directionClass = direction === 'row'
        ? 'flex flex-row gap-[10px]'
        : 'flex flex-col gap-3';

    return (
        <div className={directionClass}>
            {Array.from({ length: count }, (_, i) => (
                <BubbleItem
                    key={startFrom + i}
                    number={startFrom + i}
                    selected={marked.includes(startFrom + i)}
                    onClick={onMark}
                />
            ))}
        </div>
    );
};

export default Bubble;
