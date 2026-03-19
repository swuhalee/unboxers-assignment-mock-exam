import type { ReactNode } from 'react'

export default function SimulationStep({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center px-8 min-h-full">
      {children}
    </div>
  )
}
