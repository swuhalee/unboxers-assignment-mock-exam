import ObjectiveGrid from '../../Answer/Objective/ObjectiveGrid';
import SubjectiveGrid from '../../Answer/Subjective/SubjectiveGrid';
import Card from '../../Common/Card/Card';
import OMRHeader from '../OMRHeader/OMRHeader';
import GradeSelector from '../GradeSelector/GradeSelector';
import NumberSelector from '../NumberSelector/NumberSelector';
import KeypadAnimation from '../../Common/Keypad/KeypadAnimation';
import Keypad from '../../Common/Keypad/Keypad';
import { useExamStore } from '@/store/examStore';

interface OMRCardProps {
    exam: string;
    subject: string;
    supervisor: string;
    totalMultiple: number;
    totalShort: number;
}

const OMRCard = ({ exam, subject, supervisor, totalMultiple, totalShort }: OMRCardProps) => {
    const {
        grade, tens, units,
        objectiveAnswers, subjectiveAnswers, activeQ,
        setGrade, setTens, setUnits, setSubjectiveAnswer,
        markObjective, setActiveQ,
    } = useExamStore();

    return (
        <div className='flex flex-row items-start'>
            <Card className="[&>*+*]:-ml-[1.5px]">
                <OMRHeader
                    exam={exam}
                    subject={subject}
                    supervisor={supervisor}
                />
                <div className="flex flex-row items-stretch [&>*+*]:-ml-[1.5px]">
                    <GradeSelector value={grade} onChange={setGrade} />
                    <NumberSelector
                        tens={tens}
                        units={units}
                        onChange={(t, u) => { setTens(t); setUnits(u); }}
                    />
                    <ObjectiveGrid
                        total={totalMultiple}
                        answers={objectiveAnswers}
                        onMark={markObjective}
                    />
                    <SubjectiveGrid
                        total={totalShort}
                        answers={subjectiveAnswers}
                        activeQ={activeQ}
                        onSelect={setActiveQ}
                    />
                </div>
            </Card>

            <KeypadAnimation show={activeQ !== null}>
                <Keypad
                    value={activeQ !== null ? (subjectiveAnswers[activeQ] ?? '') : ''}
                    questionNumber={activeQ ?? undefined}
                    onChange={(updater) => { if (activeQ !== null) setSubjectiveAnswer(activeQ, updater); }}
                    onConfirm={() => setActiveQ(null)}
                />
            </KeypadAnimation>
        </div>
    );
};

export default OMRCard;
