import { useEffect, useRef, useState } from 'react'

export function useTutorialAnimation(isFirst: boolean, isLast: boolean) {
  const directionRef = useRef(1) // 1: forward, -1: backward
  const setDirection = (dir: 1 | -1) => { directionRef.current = dir }

  const [prevInLayout, setPrevInLayout] = useState(() => !isFirst)
  useEffect(() => {
    if (!isFirst) setPrevInLayout(true)
  }, [isFirst])

  const [navDirection, setNavDirection] = useState(1) // 1: forward, -1: backward
  const prevIsLastRef = useRef(isLast)
  useEffect(() => {
    const wasLast = prevIsLastRef.current
    if (wasLast !== isLast) {
      setNavDirection(isLast ? 1 : -1)
      prevIsLastRef.current = isLast
    }
  }, [isLast])

  return { directionRef, setDirection, prevInLayout, setPrevInLayout, navDirection }
}
