import { Outlet, useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.svg'
import StaticButton from '@/components/Common/Button/StaticButton'

export default function TutorialLayout() {
  const navigate = useNavigate()
  // 과제 범위상 별도 홈 페이지가 없어서 '/' 로 이동
  const handleHome = () => navigate('/')

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 h-16 bg-white">
        <button type="button" onClick={handleHome} aria-label="홈으로">
          <img src={logo} alt="Unboxers 로고" className="h-10 w-10" />
        </button>

        <span className="text-[20px] font-bold text-text-sub">모의고사 모드</span>

        <div className="flex items-center gap-3">
          <StaticButton
            onClick={handleHome}
            className="h-11 w-19 text-[17px] font-semibold text-text-sub"
          >
            홈으로
          </StaticButton>
        </div>
      </header>

      <main className="flex flex-col flex-1 min-w-300 py-20">
        <div className="w-300 mx-auto flex flex-col flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
