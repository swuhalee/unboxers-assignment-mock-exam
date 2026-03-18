import Bubble from '../../Common/Bubble/Bubble';

interface NumberSelectorProps {
    tens: number | null;
    units: number | null;
    onChange: (tens: number | null, units: number | null) => void;
}

const NumberSelector = ({ tens, units, onChange }: NumberSelectorProps) => (
    <div className="inline-flex flex-col border-[1.5px] border-omr-border">
        {/* 헤더 */}
        <div className="flex items-center justify-center h-10 border-b-[1.5px] border-omr-border text-[17px] font-semibold text-omr-num">
            번호
        </div>

        <div className="flex divide-x-[1.5px] divide-omr-border">
            <div className="px-2 py-2.5">
                <Bubble
                    count={10}
                    marked={tens !== null ? [tens] : []}
                    onMark={(d) => onChange(d, units)}
                    direction="col"
                    startFrom={0}
                />
            </div>
            <div className="px-2 py-2.5">
                <Bubble
                    count={10}
                    marked={units !== null ? [units] : []}
                    onMark={(d) => onChange(tens, d)}
                    direction="col"
                    startFrom={0}
                />
            </div>
        </div>
    </div>
);

export default NumberSelector;
