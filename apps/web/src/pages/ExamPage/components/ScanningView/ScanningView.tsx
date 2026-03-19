import ActiveButton from '@/components/Common/Button/ActiveButton'

export default function ScanningView() {
  return (
    <>
      <p className="text-center text-[36px] font-extrabold leading-snug text-text-sub">
        OMR 카드 스캔중
        <br />
        곧 결과가 나와요
      </p>
      <ActiveButton isActive={false} className="w-60.75 text-[17px] font-semibold cursor-not-allowed">
        과연 몇 점일까요?
      </ActiveButton>
    </>
  )
}
