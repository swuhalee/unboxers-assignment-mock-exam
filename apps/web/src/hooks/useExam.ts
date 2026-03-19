import { useQuery, useMutation } from '@tanstack/react-query'
import { getExam, submitExam } from '@/api/exams'
import type { SubmitExamRequest } from '@/types/exam'

export function useExamQuery() {
  return useQuery({
    queryKey: ['exam'],
    queryFn: getExam,
    staleTime: Infinity,
  })
}

export function useSubmitExam() {
  return useMutation({
    mutationFn: (payload: SubmitExamRequest) => submitExam(payload),
  })
}
