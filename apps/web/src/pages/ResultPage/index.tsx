import { Navigate, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useExamStore } from '@/pages/ExamPage/store/examStore'
import logoSrc from '@/assets/logo.svg'
import ActiveButton from '@/components/Common/Button/ActiveButton'

export default function ResultPage() {
  const navigate = useNavigate()
  const { result } = useExamStore()

  if (!result) return <Navigate to="/exam" replace />

  const { title, score, correctCount, wrongCount } = result

  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center gap-8 px-6">
      <div className="flex flex-col items-center gap-3">
        <img src={logoSrc} alt="" aria-hidden="true" className="w-20 h-20" />
        <div className="text-center">
          <p className="text-[14px] font-medium text-text-sub">채점이 완료되었어요!</p>
          <p className="text-[32px] font-bold text-black mt-0.5">{title}</p>
        </div>
      </div>

      <div className="flex gap-3 w-full max-w-lg">
        {[
          { label: '점수', value: `${score}점` },
          { label: '맞힌 문제', value: `${correctCount}개` },
          { label: '복습해야 할 오답', value: `${wrongCount}개` },
        ].map(({ label, value }, i) => (
          <motion.div
            key={label}
            className="flex-1 bg-white rounded-2xl shadow-card flex flex-col items-center justify-center py-6 gap-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.12, ease: 'easeOut' }}
          >
            <span className="text-[13px] text-text-sub font-medium">{label}</span>
            <span className="text-[28px] font-bold text-black leading-none">{value}</span>
          </motion.div>
        ))}
      </div>

      <ActiveButton isActive className="w-60.75 text-[17px] font-semibold" onClick={() => navigate('/')}>
        복습 시작
      </ActiveButton>
    </div>
  )
}
