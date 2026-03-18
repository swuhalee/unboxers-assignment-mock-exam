import { useExamStore } from '@/store/examStore';
import OMRBranding from './OMRBranding';

interface OMRHeaderProps {
    exam: string;
    subject: string;
    supervisor: string;
}

type StaticRow   = { label: string; field: keyof OMRHeaderProps; editable?: false };
type EditableRow = { label: string; field: 'name' | 'school' | 'seatNumber'; editable: true; placeholder: string };
type Row         = StaticRow | EditableRow;
type RowField    = Row['field'];

const ROWS: Row[] = [
    { label: '시험', field: 'exam' },
    { label: '과목', field: 'subject' },
    { label: '성명', field: 'name',       editable: true, placeholder: '이름 입력' },
    { label: '학교', field: 'school',     editable: true, placeholder: '학교 입력' },
    { label: '좌석', field: 'seatNumber', editable: true, placeholder: '좌석 번호 입력' },
    { label: '감독', field: 'supervisor' },
];

const OMRHeader = (props: OMRHeaderProps) => {
    const { name, school, seatNumber, setName, setSchool, setSeatNumber } = useExamStore();

    const values: Record<RowField, string> = { ...props, name, school, seatNumber };
    const setters: Partial<Record<RowField, (v: string) => void>> = {
        name: setName,
        school: setSchool,
        seatNumber: setSeatNumber,
    };

    return (
    <div className='flex flex-col min-w-max'>
        <div className="inline-flex flex-col border-[1.5px] border-omr-border">
            {/* 학생, 시험 정보 */}
            {ROWS.map(({ label, field, editable, ...rest }, i) => (
                <div key={field} className={`flex h-10 ${i < ROWS.length - 1 ? 'border-b-[1.5px] border-omr-border' : ''}`}>
                    <div className="flex flex-col items-center justify-center p-0.5 [writing-mode:vertical-rl] text-omr-num text-[14px] font-semibold border-r border-omr-border">
                        {label}
                    </div>
                    <div className="flex items-center justify-center flex-1 px-3 py-2 text-[17px] font-bold text-omr-num whitespace-nowrap">
                        {editable ? (
                            <input
                                type="text"
                                value={values[field]}
                                onChange={(e) => setters[field]?.(e.target.value)}
                                placeholder={'placeholder' in rest ? rest.placeholder : undefined}
                                className="w-full bg-transparent outline-none text-center text-[17px] font-bold text-omr-num placeholder:font-semibold placeholder:text-omr-num/40"
                            />
                        ) : (
                            values[field]
                        )}
                    </div>
                </div>
            ))}
        </div>

        <OMRBranding />
    </div>
    );
};

export default OMRHeader;
