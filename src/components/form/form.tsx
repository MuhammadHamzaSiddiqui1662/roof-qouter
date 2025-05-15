"use client";
import { useState } from "react";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProgressIndicator } from "../sub-components/progress-indicator";
import { ArrowLeft } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface StepFormProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export function StepForm({ currentStep, setCurrentStep }: StepFormProps) {
  const totalSteps = 5;
  const {} = useToast();

  // Form state
  const [formData, setFormData] = useState({
    zipCode: "",
    address: "",
    confirmAddress: "",
    ownership: "",
  });

  // Form validation errors
  const [errors, setErrors] = useState({
    zipCode: "",
    address: "",
    confirmAddress: "",
    ownership: "",
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    // Clear error when user types
    if (errors[id as keyof typeof errors]) {
      setErrors({
        ...errors,
        [id]: "",
      });
    }
  };

  // Handle radio change
  const handleRadioChange = (value: string) => {
    setFormData({
      ...formData,
      ownership: value,
    });

    // Clear error when user selects
    if (errors.ownership) {
      setErrors({
        ...errors,
        ownership: "",
      });
    }
  };

  // Validate current step
  const validateStep = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (currentStep === 1) {
      if (!formData.zipCode.trim()) {
        newErrors.zipCode = " ";
        isValid = false;
      }
    } else if (currentStep === 2) {
      if (!formData.address.trim()) {
        newErrors.address = " ";
        isValid = false;
      }
    } else if (currentStep === 3) {
      if (!formData.confirmAddress.trim()) {
        newErrors.confirmAddress = " ";
        isValid = false;
      }
    } else if (currentStep === 4) {
      if (!formData.ownership) {
        newErrors.ownership = " ";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Step titles and subtitles
  const stepContent = {
    1: {
      title: "Please enter your zip code",
      subtitle: "Please fill your information so we can get in touch with you.",
    },
    2: {
      title: "Find your roof",
      subtitle: "Please fill your information so we can get in touch with you.",
    },
    3: {
      title: "Move the marker to the center of your roof",
      subtitle: "Please fill your information so we can get in touch with you.",
    },
    4: {
      title:
        "Do you currently own or have authority with respect to this house?",
      subtitle: "Please fill your information so we can get in touch with you.",
    },
    5: {
      title: "Your Project Quote is $500",
      subtitle:
        "A display text style is intended for use at large sizes for headings, rather than for extended passages of body text.",
    },
  };

  return (
    <div>
      <div className="w-full flex justify-center flex-col">
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      <hr className="border-[#D9DBE9] my-6" />

      <h2 className="mb-2 text-2xl font-semibold text-gray-800">
        {stepContent[currentStep as keyof typeof stepContent]?.title}
      </h2>

      <p className="mb-6 text-gray-500">
        {stepContent[currentStep as keyof typeof stepContent]?.subtitle}
      </p>

      {/* Step 1 */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div>
            <Input
              id="zipCode"
              placeholder="Enter zip code"
              className={`mt-1 p-4 h-12 ${
                errors.zipCode ? "border-red-500" : ""
              }`}
              value={formData.zipCode}
              onChange={handleInputChange}
              required
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            {currentStep > 1 && (
              <Button
                onClick={prevStep}
                variant="ghost"
                className="flex items-center gap-2 text-gray-600"
              >
                <ArrowLeft size={16} />
                Back
              </Button>
            )}
            <Button
              onClick={nextStep}
              className="rounded-full px-6 py-2 h-12 bg-orange-400 text-white hover:bg-orange-500 ml-auto"
            >
              Next Step
            </Button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div>
            <Input
              id="address"
              placeholder="Enter address"
              className={`mt-1 p-4 h-12 ${
                errors.address ? "border-red-500" : ""
              }`}
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={prevStep}
              variant="ghost"
              className="flex items-center gap-2 text-gray-600"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <Button
              onClick={nextStep}
              className="rounded-full px-6 py-2 h-12 bg-orange-400 text-white hover:bg-orange-500"
            >
              Next Step
            </Button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div>
            <Input
              id="confirmAddress"
              placeholder="7500 Setzler Pkwy, Minneapolis, MN 55445, USA"
              className={`mt-1 p-4 h-12 ${
                errors.confirmAddress ? "border-red-500" : ""
              }`}
              value={formData.confirmAddress}
              onChange={handleInputChange}
              required
            />
            {errors.confirmAddress && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmAddress}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={prevStep}
              variant="ghost"
              className="flex items-center gap-2 text-gray-600"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <Button
              onClick={nextStep}
              className="rounded-full px-6 py-2 h-12 bg-orange-400 text-white hover:bg-orange-500"
            >
              Next Step
            </Button>
          </div>
        </div>
      )}

      {/* Step 4 */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <RadioGroup
            value={formData.ownership}
            onValueChange={handleRadioChange}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`flex items-center space-x-2 border ${
                  errors.ownership ? "border-red-500" : "border-gray-200"
                } rounded-full p-4`}
              >
                <RadioGroupItem
                  value="yes"
                  id="yes"
                  className="text-orange-400"
                />
                <Label htmlFor="yes" className="flex-grow cursor-pointer">
                  Yes
                </Label>
              </div>
              <div
                className={`flex items-center space-x-2 border ${
                  errors.ownership ? "border-red-500" : "border-gray-200"
                } rounded-full p-4`}
              >
                <RadioGroupItem
                  value="no"
                  id="no"
                  className="text-orange-400"
                />
                <Label htmlFor="no" className="flex-grow cursor-pointer">
                  No
                </Label>
              </div>
            </div>

            <div
              className={`flex items-center space-x-2 border ${
                errors.ownership ? "border-red-500" : "border-gray-200"
              } rounded-full p-4`}
            >
              <RadioGroupItem
                value="considering"
                id="considering"
                className="text-orange-400"
              />
              <Label htmlFor="considering" className="flex-grow cursor-pointer">
                No, but I am considering purchasing it
              </Label>
            </div>
          </RadioGroup>
          {errors.ownership && (
            <p className="text-red-500 text-sm">{errors.ownership}</p>
          )}

          <div className="flex justify-between items-center">
            <Button
              onClick={prevStep}
              variant="ghost"
              className="flex items-center gap-2 text-gray-600"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <Button
              onClick={nextStep}
              className="rounded-full px-6 py-2 h-12 bg-orange-400 text-white hover:bg-orange-500"
            >
              Confirm
            </Button>
          </div>
        </div>
      )}

      {/* Step 5 - Final Quote */}
      {currentStep === 5 && (
        <div className="space-y-6">
          {/* <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-medium text-gray-700 mb-2">Form Summary</h3>
            <p>
              <strong>Zip Code:</strong> {formData.zipCode}
            </p>
            <p>
              <strong>Address:</strong> {formData.address}
            </p>
            <p>
              <strong>Confirmed Address:</strong> {formData.confirmAddress}
            </p>
            <p>
              <strong>Ownership Status:</strong>{" "}
              {formData.ownership === "yes"
                ? "Yes"
                : formData.ownership === "no"
                  ? "No"
                  : formData.ownership === "considering"
                    ? "Considering purchase"
                    : ""}
            </p>
          </div> */}

          <div className="flex justify-center">
            <Button
              onClick={() => setCurrentStep(1)}
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
