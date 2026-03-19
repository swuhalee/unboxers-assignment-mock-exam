import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useExamStore } from '@/pages/ExamPage/store/examStore'
import { useSubmitExam } from '@/hooks/useExam'
import { buildExamPayload } from '@/pages/ExamPage/store/answerStore'

export function useExamScan() {
  const { startScan, finishExam, setResult } = useExamStore()
  const { mutate } = useSubmitExam()
  const navigate = useNavigate()

  return () => {
    startScan()
    const minWait = new Promise<void>((resolve) => setTimeout(resolve, 3000))
    mutate(buildExamPayload(), {
      onSuccess: async (data) => {
        await minWait
        setResult(data)
        navigate('/exam/result')
      },
      onError: () => {
        finishExam()
        toast.error('스캔에 실패했습니다. 다시 시도해 주세요.')
      },
    })
  }
}
