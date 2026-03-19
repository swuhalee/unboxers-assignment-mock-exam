import { create } from 'zustand'
import type { SubmitExamResponse } from '@/types/exam'

export type ExamPhase = 'waiting' | 'in-progress' | 'ended' | 'scanning'

export const isPostExam = (phase: ExamPhase) => phase === 'ended' || phase === 'scanning'

type ExamStore = {
  phase: ExamPhase
  result: SubmitExamResponse | null
  startExam: () => void     // waiting → in-progress
  finishExam: () => void    // in-progress → ended
  startScan: () => void     // ended → scanning
  setResult: (result: SubmitExamResponse) => void  // 결과 저장 (라우팅은 useExamScan에서)
  reset: () => void
}

export const useExamStore = create<ExamStore>((set) => ({
  phase: 'waiting',
  result: null,

  startExam: () => set({ phase: 'in-progress' }),
  finishExam: () => set({ phase: 'ended' }),
  startScan: () => set({ phase: 'scanning' }),
  setResult: (result) => set({ result }),
  reset: () => set({ phase: 'waiting', result: null }),
}))
