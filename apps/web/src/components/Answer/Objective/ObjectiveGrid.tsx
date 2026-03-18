import ObjectiveColumn from './ObjectiveColumn';

const PER_COL = 10;

interface ObjectiveGridProps {
    total: number;
    answers: Record<number, number[]>;
    onMark: (qNum: number, choice: number) => void;
}

const ObjectiveGrid = ({ total, answers, onMark }: ObjectiveGridProps) => {
    const columnCount = Math.ceil(total / PER_COL);

    return (
        <div className="inline-flex flex-col border-[1.5px] border-omr-border">
            {/* 헤더 */}
            <div className="flex items-center justify-center h-10 border-b-[1.5px] border-omr-border text-2xl font-semibold text-omr-num tracking-[0.5em]">
                객관식답안
            </div>

            <div className="inline-flex flex-row">
                {Array.from({ length: columnCount }, (_, colIdx) => (
                    <ObjectiveColumn
                        key={colIdx}
                        colIdx={colIdx}
                        colStart={colIdx * PER_COL + 1}
                        total={total}
                        isLast={colIdx === columnCount - 1}
                        answers={answers}
                        onMark={onMark}
                    />
                ))}
            </div>
        </div>
    );
};

export default ObjectiveGrid;
