"use client"

import { useState } from "react"




// create a multi-step form



const Step = ({ nextStep, prevStep, currentStep }: {
  currentStep: number
  nextStep: () => void
  prevStep?: () => void
}) => {
  return (
    <div className="flex items-center justify-between">

      <span>
        {currentStep}
      </span>


    </div>
  )
}

export const MultiStepForm = () => {
  const [steps, setSteps] = useState(1)


  const nextStep = () => {
    setSteps(steps + 1)
  }

  const prevStep = () => {
    setSteps(steps - 1)
  }

  return (
    <div>
      <h1>Step {steps}</h1>
      <Step nextStep={nextStep}
        currentStep={steps}
        prevStep={prevStep}
      />
    </div>
  )
}