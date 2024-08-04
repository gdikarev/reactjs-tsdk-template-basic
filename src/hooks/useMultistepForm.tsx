import {ReactElement, useState} from "react";

export function useMultistepForm(steps: ReactElement[]) {
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0)
    const isFirstStep = currentStepIndex === 0
    const isLastStep = currentStepIndex === steps.length - 1

    function next(): void {
        setCurrentStepIndex(i => {
            if (i >= steps.length - 1) return i
            return i + 1
        })
    }

    function back(): void {
        setCurrentStepIndex(i => {
            if (i <= 0) return i
            return i - 1
        })
    }

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        isFirstStep: isFirstStep,
        isLastStep: isLastStep,
        next, back
    }
}