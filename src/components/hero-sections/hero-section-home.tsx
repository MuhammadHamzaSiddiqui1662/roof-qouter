"use client"

import { useState } from "react"
import TriangleImage from "../sub-components/triangleImage"
import { StepForm } from "../form/form"

export default function HomeHeroSection() {
  const [currentStep, setCurrentStep] = useState(1)

  // Array of background images for each step
  const backgroundImages = [
    "/assets/images/hero.jpg", // Default/Step 1
    "/assets/images/hero2.png", // Step 2
    "/assets/images/hero3.jpg", // Step 3
    "/assets/images/hero.jpg", // Step 4
    "/assets/images/hero.jpg", // Step 5
  ]

  // Get current background image based on step
  const currentBgImage = backgroundImages[currentStep - 1] || backgroundImages[0]

  return (
    <div className="relative">
      {/* Hero Section */}
      <div
        className={`relative flex w-full items-center overflow-hidden ${
          currentStep === 1 ? "min-h-[500px]" : "min-h-[350px]"
        }`}
      >
        {/* Background Image with White Triangle Shape */}
        <div className="absolute inset-0 z-0">
          <TriangleImage src={currentBgImage} alt="hero-sec" className="brightness-50" priority />
        </div>

        {/* Content Container */}
        <div className="container relative z-10 mx-auto flex flex-col items-center px-5 py-6 md:flex-row md:items-start md:gap-16 lg:gap-24 lg:px-10 lg:py-12">
          {/* Left Column - Text (Only visible on step 1) */}
          {currentStep === 1 && (
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-6xl">
                Estimate Your Roof Replacement Costs Instantly
              </h1>
            </div>
          )}

          {/* Form Container - Positioned differently based on step */}
          <div
            className={`w-full ${
              currentStep === 1
                ? "md:w-1/2 max-lg:mt-4"
                : "md:w-2/3 lg:w-1/2 absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2"
            }`}
          >
            {/* Only render the form container here for step 1 */}
            {currentStep === 1 && (
              <div className="rounded-4xl bg-white p-6 shadow-lg">
                <StepForm currentStep={currentStep} setCurrentStep={setCurrentStep} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Form for steps 2-5, positioned half on background and half below */}
      {currentStep > 1 && (
        <div className="container mx-auto px-5 lg:px-10">
          <div className="rounded-4xl bg-white p-6 shadow-lg md:w-2/3 lg:w-1/2 mx-auto -mt-[150px] relative z-20">
            <StepForm currentStep={currentStep} setCurrentStep={setCurrentStep} />
          </div>
        </div>
      )}
    </div>
  )
}
