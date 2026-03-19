import paperSvg from '@/assets/paper.svg'
import InfoStep from '../templates/InfoStep'

export default function IntroStep() {
  return (
    <InfoStep
      visual={<img src={paperSvg} width={315} alt="" />}
      description={<>모의고사 모드는 처음이시죠? 실전 모의고사는<br />실전과 최대한 비슷한 환경으로 진행돼요</>}
    />
  )
}
