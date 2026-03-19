import { useNavigate } from 'react-router-dom'
import exitIcon from '@/assets/exit.svg'
import StaticButton from '@/components/Common/Button/StaticButton'

export default function ExamHeader() {
  const navigate = useNavigate()

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-end px-5 py-6">
      <StaticButton
        onClick={() => navigate('/')}
        className="h-11 px-4 gap-1.5 text-[17px] font-semibold text-text-sub"
      >
        종료하기<img src={exitIcon} alt="" aria-hidden="true" />
      </StaticButton>
    </header>
  )
}
