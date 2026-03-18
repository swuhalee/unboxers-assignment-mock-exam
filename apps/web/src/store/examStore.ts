import { create } from 'zustand';

interface ExamStore {
    // 학생 정보
    name: string;
    school: string;
    grade: number | null;
    tens: number | null;    // 학생 번호 십의 자리
    units: number | null;   // 학생 번호 일의 자리
    seatNumber: string;

    // 답안
    objectiveAnswers: Record<number, number[]>;
    subjectiveAnswers: Record<number, string>;

    // 키패드 활성화 변수: 몇번 문항으로 인해 나온건지 표시
    activeQ: number | null;

    // Actions
    setName: (name: string) => void;
    setSchool: (school: string) => void;
    setGrade: (grade: number) => void;
    setTens: (tens: number | null) => void;
    setUnits: (units: number | null) => void;
    setSeatNumber: (seatNumber: string) => void;
    markObjective: (qNum: number, choice: number) => void;
    setSubjectiveAnswer: (qNum: number, updater: (prev: string) => string) => void;
    setActiveQ: (q: number | null) => void;
}

export const useExamStore = create<ExamStore>((set) => ({
    name: '',
    school: '',
    grade: null,
    tens: null,
    units: null,
    seatNumber: '',
    objectiveAnswers: {},
    subjectiveAnswers: {},
    activeQ: null,

    setName: (name) => set({ name }),
    setSchool: (school) => set({ school }),
    setGrade: (grade) => set({ grade }),
    setTens: (tens) => set({ tens }),
    setUnits: (units) => set({ units }),
    setSeatNumber: (seatNumber) => set({ seatNumber }),
    markObjective: (qNum, choice) =>
        set((s) => {
            const current = s.objectiveAnswers[qNum] ?? [];
            const next = current.includes(choice)
                ? current.filter((c) => c !== choice)
                : [...current, choice];
            return { objectiveAnswers: { ...s.objectiveAnswers, [qNum]: next } };
        }),
    setSubjectiveAnswer: (qNum, updater) =>
        set((s) => ({ subjectiveAnswers: { ...s.subjectiveAnswers, [qNum]: updater(s.subjectiveAnswers[qNum] ?? '') } })),
    setActiveQ: (q) => set({ activeQ: q }),
}));

export const buildExamPayload = () => {
    const { name, school, grade, tens, units, seatNumber, objectiveAnswers, subjectiveAnswers } = useExamStore.getState();

    return {
        name,
        school,
        grade,
        studentNumber: (tens ?? 0) * 10 + (units ?? 0),
        seatNumber,
        answers: [
            ...Object.entries(objectiveAnswers).map(([num, answer]) => ({
                answerType: 'objective' as const,
                number: Number(num),
                answer,
            })),
            ...Object.entries(subjectiveAnswers).map(([num, answer]) => ({
                answerType: 'subjective' as const,
                number: Number(num),
                answer,
            })),
        ],
    };
};
