import { create } from 'zustand'

export type TutorialStep = 'intro' | 'omr' | 'objective' | 'subjective' | 'timer'

export const STEPS: TutorialStep[] = ['intro', 'omr', 'objective', 'subjective', 'timer']

export const isFirstStep = (step: TutorialStep) => step === STEPS[0]
export const isLastStep = (step: TutorialStep) => step === STEPS[STEPS.length - 1]

const SIMULATION_STEPS = new Set<TutorialStep>(['objective', 'subjective'])
export const isNextEnabled = (step: TutorialStep, simulationCompleted: boolean) =>
  !SIMULATION_STEPS.has(step) || simulationCompleted

type TutorialStore = {
  step: TutorialStep
  simulationCompleted: boolean
  goNext: () => void
  goPrev: () => void
  completeSimulation: () => void
  reset: () => void
}

export const useTutorialStore = create<TutorialStore>((set, get) => ({
  step: 'intro',
  simulationCompleted: false,

  goNext: () => {
    const idx = STEPS.indexOf(get().step)
    if (idx < STEPS.length - 1) set({ step: STEPS[idx + 1], simulationCompleted: false })
  },

  goPrev: () => {
    const idx = STEPS.indexOf(get().step)
    if (idx > 0) set({ step: STEPS[idx - 1], simulationCompleted: false })
  },

  completeSimulation: () => set({ simulationCompleted: true }),

  reset: () => set({ step: 'intro', simulationCompleted: false }),
}))
