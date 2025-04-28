"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProgressIndicator } from "@/components/sub-components/progress-indicator";

export function StepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(1);
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center flex-col">
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      <hr className="border-[#D9DBE9] mb-6"/>
      <h2 className="mb-2 text-2xl font-semibold">
        {currentStep < totalSteps
          ? "Please enter your information"
          : "Your Project Quote is $500"}
      </h2>

      <p className="mb-6 text-lg text-gray-500">
        {currentStep < totalSteps
          ? "Provide your information so we can get you a quote right away."
          : "Based on your input, we estimate it will be larger sized for buildings, which you'll be interested regardless of today this."}
      </p>

      {/* Step 1 */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div>
            <Input
              id="zip-code"
              placeholder="Enter Company Address"
              className="mt-1"
            />
          </div>

          <div className="flex justify-end">
            <Button
              onClick={nextStep}
              className="rounded-full w-34 font-bold h-12 bg-orange-400 text-white transition duration-700 delay-150 ease-in-out hover:bg-orange-400 hover:scale-110"
            >
              Next Step
            </Button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <div>
            <Input
              id="full-name"
              placeholder="Enter your name"
              className="mt-1"
            />
          </div>

          <div>
            <Input
              id="phone"
              placeholder="Enter phone number"
              className="mt-1"
            />
          </div>

          <div>
            <Input
              id="email"
              placeholder="Enter email"
              type="email"
              className="mt-1"
            />
          </div>

          <div className="flex justify-end">
            <Button
              onClick={nextStep}
              className="rounded-full w-34 font-bold h-12 bg-orange-400 text-white transition duration-700 delay-150 ease-in-out hover:bg-orange-400 hover:scale-110"
            >
              Next Step
            </Button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <div>
            <Input
              id="roof-size"
              placeholder="Enter roof size"
              className="mt-1"
            />
          </div>

          <div>
            <Input
              id="roof-age"
              placeholder="Enter roof age"
              className="mt-1"
            />
          </div>

          <div>
            <Input
              id="roof-damage"
              placeholder="Describe any issues"
              className="mt-1"
            />
          </div>

          <div className="flex justify-end">
            <Button
              onClick={nextStep}
              className="rounded-full w-34 font-bold h-12 bg-orange-400 text-white transition duration-700 delay-150 ease-in-out hover:bg-orange-400 hover:scale-110"
            >
              Next Step
            </Button>
          </div>
        </div>
      )}

      {/* Step 4 */}
      {currentStep === 4 && (
        <div className="space-y-4">
          <div>
            <Select>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asphalt">Asphalt Shingles</SelectItem>
                <SelectItem value="metal">Metal Roof</SelectItem>
                <SelectItem value="tile">Tile Roof</SelectItem>
                <SelectItem value="slate">Slate Roof</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gable">Gable</SelectItem>
                <SelectItem value="hip">Hip</SelectItem>
                <SelectItem value="flat">Flat</SelectItem>
                <SelectItem value="mansard">Mansard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={nextStep}
              className="rounded-full w-34 font-bold h-12 bg-orange-400 text-white transition duration-700 delay-150 ease-in-out hover:bg-orange-400 hover:scale-110"
            >
              Next Step
            </Button>
          </div>
        </div>
      )}

      {/* Step 5 - Final Quote */}
      {currentStep === 5 && (
        <div className="space-y-4">
          <div className="flex justify-center">
            <Button
              onClick={prevStep}
              variant="outline"
              className="w-full text-[#4A4A5F] bg-[#EFF0F6] font-bold h-12 rounded-full mt-4"
            >
              Back
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
