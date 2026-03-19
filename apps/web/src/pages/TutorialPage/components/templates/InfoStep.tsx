import type { ReactNode } from 'react'

type Props = {
  visual: ReactNode
  description: ReactNode
}

export default function InfoStep({ visual, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-12 px-8 min-h-full">
      {visual}
      <p className="text-[36px] text-center font-extrabold leading-snug text-text-sub">
        {description}
      </p>
    </div>
  )
}
