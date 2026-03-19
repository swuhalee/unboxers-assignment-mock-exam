import React from 'react'
import PageFadeIn from "../Animation/PageFadeIn"

function FadeRoute({ element }: { element: React.ReactNode }) {
  return <PageFadeIn>{element}</PageFadeIn>
}

export default FadeRoute;