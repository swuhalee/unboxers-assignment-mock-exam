import { useCallback } from 'react';
import ObjectiveGrid from '@/components/Answer/Objective/ObjectiveGrid';
import SubjectiveGrid from '@/components/Answer/Subjective/SubjectiveGrid';
import Card from '@/components/Common/Card/Card';
import OMRHeader from './OMRHeader/OMRHeader';
import GradeSelector from './GradeSelector/GradeSelector';
import NumberSelector from './NumberSelector/NumberSelector';
import KeypadAnimation from '@/components/Answer/Keypad/KeypadAnimation';
import Keypad from '@/components/Answer/Keypad/Keypad';
import { useAnswerStore } from '@/pages/ExamPage/store/answerStore';

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
    } = useAnswerStore();

    const handleNumberChange = useCallback(
        (t: number | null, u: number | null) => { setTens(t); setUnits(u); },
        [setTens, setUnits],
    );

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
                        onChange={handleNumberChange}
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

            <div style={{ height: 0, overflow: 'visible', alignSelf: 'flex-start' }}>
                <KeypadAnimation show={activeQ !== null}>
                    <Keypad
                        value={activeQ !== null ? (subjectiveAnswers[activeQ] ?? '') : ''}
                        questionNumber={activeQ ?? undefined}
                        onChange={(updater) => { if (activeQ !== null) setSubjectiveAnswer(activeQ, updater); }}
                        onConfirm={() => setActiveQ(null)}
                    />
                </KeypadAnimation>
            </div>
        </div>
    );
};

export default OMRCard;
