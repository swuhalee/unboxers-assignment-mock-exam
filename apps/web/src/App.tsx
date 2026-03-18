import ObjectiveSimulation from "./components/Answer/Objective/ObjectiveSimulation";
import SubjectiveSimulation from "./components/Answer/Subjective/SubjectiveSimulation";
import Timer from "./components/Common/Timer/Timer";
import OMRCard from "./components/OMR/OMRCard/OMRCard"

function App() {

  return (
    <div className="flex flex-col justify-start items-center min-h-screen py-30 gap-10">
      <OMRCard
        exam="TEN-UP 모의고사"
        subject="공통수학2"
        supervisor="신희철"
        totalMultiple={20}
        totalShort={11}
      />
      <ObjectiveSimulation />
      <SubjectiveSimulation />
      <Timer totalSeconds={197} examDurationMinutes={60} mode="before" />
      <Timer totalSeconds={60} examDurationMinutes={1} mode="during" />
    </div>
  )
}

export default App
