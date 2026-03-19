import Bubble from '../../Common/Bubble/Bubble';
import OMRSection from '../OMRSection';

interface NumberSelectorProps {
    tens: number | null;
    units: number | null;
    onChange: (tens: number | null, units: number | null) => void;
}

const NumberSelector = ({ tens, units, onChange }: NumberSelectorProps) => (
    <OMRSection title="번호" headerClassName="text-[17px]">
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
    </OMRSection>
);

export default NumberSelector;
