import { useEffect, useState } from 'react'

interface TimerProps {
    totalSeconds: number
    examDurationMinutes?: number
    mode?: 'before' | 'during'
}

const Timer = ({ totalSeconds, examDurationMinutes, mode = 'before' }: TimerProps) => {
    const [remaining, setRemaining] = useState(totalSeconds)

    useEffect(() => {
        setRemaining(totalSeconds)
    }, [totalSeconds])

    useEffect(() => {
        if (remaining <= 0) return

        const interval = setInterval(() => {
            setRemaining((prev) => Math.max(0, prev - 1))
        }, 1000)

        return () => clearInterval(interval)
    }, [remaining])

    const minutes = Math.floor(remaining / 60)
    const seconds = remaining % 60
    const elapsed = totalSeconds - remaining
    const progressPercent = totalSeconds > 0 ? (elapsed / totalSeconds) * 100 : 100
    const isUrgent = remaining < 5

    const countdownText = minutes > 0 ? `${minutes}분 ${seconds}초` : `${seconds}초`
    const urgentClass = isUrgent ? 'text-timer-urgent' : 'text-text-sub'
    const barClass = isUrgent ? 'bg-timer-urgent' : 'bg-text-sub'

    return (
        <div className="w-full">
            <div className="flex items-end justify-between mb-2">
                <div>
                    {mode === 'before' ? (
                        <>
                            <p className="text-[17px] font-extrabold text-text-sub mb-2">시험이 곧 시작됩니다</p>
                            <p className={`text-[48px] font-extrabold leading-tight transition-colors duration-300 ${urgentClass}`}>
                                {countdownText} 뒤 시작
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="text-[17px] font-extrabold text-text-sub mb-2">시험이 곧 종료됩니다</p>
                            <p className={`text-[48px] font-extrabold leading-tight transition-colors duration-300 ${urgentClass}`}>
                                {countdownText} 뒤에 자동으로 제출됩니다. 답안을 모두 입력해주세요.
                            </p>
                        </>
                    )}
                </div>
                {examDurationMinutes != null && (
                    <p className="text-[17px] font-semibold text-text-sub">시험 시간 {examDurationMinutes}분</p>
                )}
            </div>
            <div className="w-full h-2 bg-bg-base rounded-full">
                <div
                    className={`h-full transition-all duration-1000 ease-linear rounded-full ${barClass}`}
                    style={{ width: `${progressPercent}%` }}
                />
            </div>
        </div>
    )
}

export default Timer
