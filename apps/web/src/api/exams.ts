import apiClient from '@/lib/axios'
import type { ApiResponse } from '@/types/api'
import type { ExamResponse, SubmitExamRequest, SubmitExamResponse } from '@/types/exam'

export async function getExam(): Promise<ExamResponse> {
  const { data } = await apiClient.get<ApiResponse<ExamResponse>>('/exams')
  return data.data
}

export async function submitExam(payload: SubmitExamRequest): Promise<SubmitExamResponse> {
  const { data } = await apiClient.post<ApiResponse<SubmitExamResponse>>('/exams/submit', payload)
  return data.data
}
