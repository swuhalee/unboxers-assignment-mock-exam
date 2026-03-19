import Bubble from '../../Common/Bubble/Bubble';

interface ObjectiveColumnProps {
    colIdx: number;
    colStart: number;
    total: number;
    isLast: boolean;
    answers: Record<number, number[]>;
    onMark: (qNum: number, choice: number) => void;
}

const PER_COL = 10;

const ObjectiveColumn = ({ colIdx, colStart, total, isLast, answers, onMark }: ObjectiveColumnProps) => {
    // total을 초과하는 칸은 null로 채워 레이아웃 높이 유지
    const rows = Array.from({ length: PER_COL }, (_, i) => {
        const qNum = colStart + i;
        return qNum <= total ? qNum : null;
    });

    // 짝수 열은 하단 5행, 홀수 열은 상단 5행에 배경
    const hasBackground = (rowIdx: number) => (colIdx % 2 === 0) === (rowIdx > 4);

    // 5번째 행 하단에 점선 구분선
    const hasDivider = (rowIdx: number) => rowIdx === 4;

    return (
        <div className={`flex flex-row ${isLast ? '' : 'border-r-[1.5px] border-omr-border'}`}>
            {/* 번호 칸 */}
            <div className="w-7 flex flex-col bg-omr-num-bg border-r-[1.5px] border-omr-border">
                {rows.map((qNum, i) => (
                    <div key={qNum ?? `empty-${i}`} className="flex flex-1 items-center justify-center first:pt-1 last:pb-1">
                        {qNum !== null && (
                            <span className="inline-block text-center text-sm font-semibold text-omr-num">
                                {qNum}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {/* 버블 칸 */}
            <div className="flex-1 flex flex-col">
                {rows.map((qNum, i) => (
                    <div
                        key={qNum ?? `empty-${i}`}
                        className={[
                            'flex flex-1 px-2 py-1.5 items-center first:pt-2.5 last:pb-2.5',
                            hasBackground(i) && 'bg-omr-bubble-bg',
                            hasDivider(i) && 'relative after:absolute after:bottom-0 after:left-0 after:right-0 after:border-b-[1.5px] after:border-dashed after:border-omr-border',
                        ].filter(Boolean).join(' ')}
                    >
                        {qNum !== null && (
                            <Bubble
                                marked={answers[qNum] ?? []}
                                onMark={(choice) => onMark(qNum, choice)}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ObjectiveColumn;
