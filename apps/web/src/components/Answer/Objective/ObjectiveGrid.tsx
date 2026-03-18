import ObjectiveColumn from './ObjectiveColumn';
import OMRSection from '../../OMR/OMRSection';

const PER_COL = 10;

interface ObjectiveGridProps {
    total: number;
    answers: Record<number, number[]>;
    onMark: (qNum: number, choice: number) => void;
}

const ObjectiveGrid = ({ total, answers, onMark }: ObjectiveGridProps) => {
    const columnCount = Math.ceil(total / PER_COL);

    return (
        <OMRSection title="객관식답안" headerClassName="text-2xl tracking-[0.5em]">
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
        </OMRSection>
    );
};

export default ObjectiveGrid;
