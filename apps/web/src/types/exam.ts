export type AnswerType = 'objective' | 'subjective'

export interface ExamResponse {
  title: string
  subject: string | null
  supervisorName: string
  totalQuestions: number
  totalObjective: number
  totalSubjective: number
  totalScore: number
}

export type SubmitAnswer =
  | { answerType: 'objective'; number: number; answer: number[] }
  | { answerType: 'subjective'; number: number; answer: number }

export interface SubmitExamRequest {
  name: string
  school: string
  grade: number
  studentNumber: number
  seatNumber: number
  answers: SubmitAnswer[]
}

export interface QuestionResult {
  answerType: AnswerType
  number: number
  result: 'correct' | 'wrong' | 'unanswered'
}

export interface SubmitExamResponse {
  title: string
  score: number
  correctCount: number
  wrongCount: number
  unansweredCount: number
  results: QuestionResult[]
}
