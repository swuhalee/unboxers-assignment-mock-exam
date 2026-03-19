import ActiveButton from '@/components/Common/Button/ActiveButton'

interface ExamEndViewProps {
  onScan: () => void
}

export default function ExamEndView({ onScan }: ExamEndViewProps) {
  return (
    <>
      <p className="text-center text-[36px] font-extrabold leading-snug text-text-sub">
        시험 종료!
        <br />
        고생 많았어요. 결과를 바로 확인해볼까요?
      </p>
      <ActiveButton isActive onClick={onScan} className="w-60.75 text-[17px] font-semibold">
        결과 보기
      </ActiveButton>
    </>
  )
}
