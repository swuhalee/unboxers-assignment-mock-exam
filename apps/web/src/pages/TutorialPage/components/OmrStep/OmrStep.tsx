import paperSvg from '@/assets/paper.svg'
import cardSvg from '@/assets/card.svg'
import InfoStep from '../templates/InfoStep'

export default function OmrStep() {
  return (
    <InfoStep
      visual={
        <div className="flex flex-row items-center gap-4">
          <img src={paperSvg} width={315} alt="" />
          <img src={cardSvg} width={590} alt="" />
        </div>
      }
      description={<>실제 시험지 크기에 인쇄된 시험지에 문제를 풀고<br />화면에 표시된 OMR카드에 답을 마킹해요</>}
    />
  )
}
