"use client";
import { useState, useEffect } from "react";
import type React from "react";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProgressIndicator } from "../sub-components/progress-indicator";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import SubStepForm from "../subStepForm/sub-step-form";
import { StaticImageData } from "next/image";
import MKCompImg from "../../../public/assets/images/company-data/1.png"
import ROCompImg from "../../../public/assets/images/company-data/2.png"
import RSCompImg from "../../../public/assets/images/company-data/3.png"
import ASRCompImg from "../../../public/assets/images/company-data/4.png"
import CWCompImg from "../../../public/assets/images/company-data/5.png"
import SRCompImg from "../../../public/assets/images/company-data/6.png"
import RRCompImg from "../../../public/assets/images/company-data/7.png"
import RomanCompImg from "../../../public/assets/images/company-data/8.png"
import KRCompImg from "../../../public/assets/images/company-data/9.png"
import CrowtherCompImg from "../../../public/assets/images/company-data/10.png"

interface StepFormProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}
type RoofMaterial = "shingle" | "metal" | "tile";

interface Step1Info {
  name: string;
  phone: string;
  email: string;
  isOwner: string;
}

interface Step2Info {
  roofLeak: string;
  roofAge: string;
}

interface Step3Info {
  yourRoof: string;
  roofMaterial: string;
}

interface Step4Info {
  company: Company[];
}

interface OwnershipState {
  step1Info: Step1Info;
  step2Info: Step2Info;
  step3Info: Step3Info;
  step4Info: Step4Info;
}

interface Company {
  name: string;
  shingle: string;
  metal: string;
  tile: string;
  image: StaticImageData,
  desc: string,
  subDesc: string
}

const API_KEY = "AIzaSyAKk0-KsCS2mJ6IBtUVNBpZ8Js1kWCZblU";

const companies: Company[] = [
  {
    name: "Mark Kaufman Roofing",
    shingle: "$4-$6",
    metal: "$8-$12",
    tile: "$11-$15",
    image: MKCompImg,
    desc: "4.7 tar in bus",
    subDesc: "BBB Accredited"
  },
  {
    name: "Roof Smart of SW Florida",
    shingle: "$4.5-$6.5",
    metal: "$9-$13",
    tile: "$14-$18",
    image: ROCompImg,
    desc: "4.9 tar in bus",
    subDesc: "BBB Accredited"
  },
  {
    name: "Roofs Only Florida",
    shingle: "$5-$7",
    metal: "$10-$14",
    tile: "$14-$18",
    image: RSCompImg,
    desc: "4.5 tar in bus",
    subDesc: "BBB Accredited"
  },
  {
    name: "CW's Quality Roofing, Inc.",
    shingle: "$5-$7",
    metal: "$10-$14",
    tile: "$10-$15",
    image: CWCompImg,
    desc: "4.6 tar in bus",
    subDesc: "BBB Accredited"
  },
  {
    name: "Able Sterling Roofing",
    shingle: "$4-$6",
    metal: "$8-$12",
    tile: "$11-$15",
    image: ASRCompImg,
    desc: "4.7 tar in bus",
    subDesc: "BBB Accredited"
  },
  {
    name: "Suncastle Roofing, Inc.",
    shingle: "$4.5-$6.5",
    metal: "$9-$13",
    tile: "$14-$18",
    image: SRCompImg,
    desc: "4.7 tar in bus",
    subDesc: "BBB Accredited"
  },
  {
    name: "Resolute Roofing LLC",
    shingle: "$4.5-$6.5",
    metal: "$10-$14",
    tile: "$14-$18",
    image: RRCompImg,
    desc: "4.7 tar in bus",
    subDesc: "BBB Accredited"
  },
  {
    name: "Roman Roofing Inc",
    shingle: "$5-$7",
    metal: "$8-$12",
    tile: "$10-$15",
    image: RomanCompImg,
    desc: "4.8 tar in bus",
    subDesc: "BBB Accredited"
  },
  {
    name: "Crowther Roofing & Cooling",
    shingle: "$4-$6",
    metal: "$8-$12",
    tile: "$11-$15",
    image: CrowtherCompImg,
    desc: "4.7 tar in bus",
    subDesc: "BBB Accredited"
  },
  {
    name: "Kuykendall Roofing",
    shingle: "$4.5-$6.5",
    metal: "$9-$13",
    tile: "$14-$18",
    image: KRCompImg,
    desc: "4.8 tar in bus",
    subDesc: "BBB Accredited"
  },
]

export function StepForm({ currentStep, setCurrentStep }: StepFormProps) {
  const totalSteps = 5;
  const { toast } = useToast();
  const [currentSubStep, setCurrentSubStep] = useState<number>(1);
  const totalSubStepsForStep4 = 4;
  const grandSqft = Cookies.get("grandSqft") ? JSON.parse(Cookies.get("grandSqft") as string) : [];


  // Form state
  const [formData, setFormData] = useState({
    zipCode: "",
    address: "",
    confirmAddress: "",
  });
  const [ownership, setOwnership] = useState<OwnershipState>({
    step1Info: {
      name: "",
      phone: "",
      email: "",
      isOwner: "",
    },
    step2Info: {
      roofLeak: "",
      roofAge: "",
    },
    step3Info: {
      yourRoof: "",
      roofMaterial: "",
    },
    step4Info: {
      company: [],
    },
  });

  useEffect(() => {
    const material = ownership.step3Info.roofMaterial as RoofMaterial;
    const selectedCompanies = ownership.step4Info.company; // Array

    if (!material || !selectedCompanies || selectedCompanies.length === 0) return;

    const sqft = Cookies.get("areaDisplay")?.split(" ")[0] || "0";

    const allGrandTotals = selectedCompanies.map((selected: any) => {
      const company = companies.find((c) => c.name === selected.name);

      if (company && company[material]) {
        const rateRange = company[material]; // e.g., "$5 - $7"
        const [firstNumber, secondNumber] = rateRange
          .split("-")
          .map((rate) => rate.replace("$", "").trim());

        const firstTotal = Number(firstNumber) * Number(sqft);
        const secondTotal = Number(secondNumber) * Number(sqft);

        const grandTotal = `$${Math.round(firstTotal).toFixed(2)} - $${Math.round(secondTotal).toFixed(2)}`;
        return {
          name: company.name,
          grandTotal,
        };
      }
      return null;
    }).filter(Boolean); // remove nulls

    // Store in cookie as JSON string (optional)
    Cookies.set("grandSqft", JSON.stringify(allGrandTotals));

    console.log("All Grand Totals:", allGrandTotals);

  }, [
    JSON.stringify(ownership.step3Info.roofMaterial),
    JSON.stringify(ownership.step4Info.company),
    JSON.stringify(companies)
  ]);

  const [ownershipError, setOwnershipError] = useState<OwnershipState>({
    step1Info: {
      name: "",
      phone: "",
      email: "",
      isOwner: "",
    },
    step2Info: {
      roofLeak: "",
      roofAge: "",
    },
    step3Info: {
      yourRoof: "",
      roofMaterial: "",
    },
    step4Info: {
      company: [],
    },
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
    if (id === "zipCode") {
      Cookies.set("zipCode", value);
    }
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

  // Validate current step
  const validateStep = () => {
    let isValid = true;

    const newFormErrors = { ...errors };
    const newOwnershipErrors: OwnershipState = {
      step1Info: { name: "", phone: "", email: "", isOwner: "" },
      step2Info: { roofLeak: "", roofAge: "" },
      step3Info: { yourRoof: "", roofMaterial: "" },
      step4Info: { company: [] },
    };

    if (currentStep === 1) {
      if (!formData.zipCode.trim()) {
        newFormErrors.zipCode = "Zip code is required";
        isValid = false;
      }
    } else if (currentStep === 2) {
      if (!formData.address.trim()) {
        newFormErrors.address = "Address is required";
        isValid = false;
      }
    } else if (currentStep === 4) {
      // Step 1 Info
      if (currentSubStep === 1) {
        if (!ownership.step1Info.name.trim()) {
          newOwnershipErrors.step1Info.name = "Name is required";
          isValid = false;
        }
        if (!ownership.step1Info.phone.trim()) {
          newOwnershipErrors.step1Info.phone = "Phone is required";
          isValid = false;
        }
        if (!ownership.step1Info.email.trim()) {
          newOwnershipErrors.step1Info.email = "Email is required";
          isValid = false;
        }
        if (!ownership.step1Info.isOwner.trim()) {
          newOwnershipErrors.step1Info.isOwner = "Ownership status is required";
          isValid = false;
        }
      }

      // Step 2 Info
      else if (currentSubStep === 2) {
        if (!ownership.step2Info.roofLeak.trim()) {
          newOwnershipErrors.step2Info.roofLeak = "Roof leak info is required";
          isValid = false;
        }
        if (!ownership.step2Info.roofAge.trim()) {
          newOwnershipErrors.step2Info.roofAge = "Roof age is required";
          isValid = false;
        }
      }

      // Step 3 Info
      else if (currentSubStep === 3) {
        if (!ownership.step3Info.yourRoof.trim()) {
          newOwnershipErrors.step3Info.yourRoof = "Your roof info is required";
          isValid = false;
        }
        if (!ownership.step3Info.roofMaterial.trim()) {
          newOwnershipErrors.step3Info.roofMaterial =
            "Roof material is required";
          isValid = false;
        }
      }

      // Step 4 Info
      else if (currentSubStep === 4) {
        // if (!ownership.step4Info.company.trim()) {
        //   newOwnershipErrors.step4Info.company = "Company info is required";
        //   isValid = false;
        // }
      }
    }

    setErrors(newFormErrors);
    setOwnershipError(newOwnershipErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep === 4) {
        // Nested step handling
        if (currentSubStep < totalSubStepsForStep4) {
          setCurrentSubStep(currentSubStep + 1);
        } else {
          setCurrentSubStep(1); // Reset for next use
          setCurrentStep(currentStep + 1); // Move to Step 5
        }
      } else if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep === 4 && currentSubStep > 1) {
      setCurrentSubStep(currentSubStep - 1);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setCurrentSubStep(1); // Reset substep on going back
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
      title: "Please Enter Your Information?",
      subtitle: "Please fill your information so we can get in touch with you.",
    },
    5: {
      title: `Your Project Quote is ${grandSqft?.map((sqft: any) => `${sqft?.name} - ${sqft?.grandTotal || 0} sqft`).join(", ")}`,
      subtitle:
        "A display text style is intended for use at large sizes for headings, rather than for extended passages of body text.",
    },
  };

  const checkAddressProximity = (place: any) => {
    try {
      const addressComponents = place?.address_components;
      const localZipCode = Cookies.get("zipCode");

      const addressZipCode = addressComponents?.find((component: any) =>
        component.types.includes("postal_code")
      )?.short_name;

      if (!addressZipCode) {
        setErrors((prev) => ({
          ...prev,
          address: "Could not verify zip code for this address",
        }));
        return;
      }

      if (addressZipCode !== localZipCode) {
        setErrors((prev) => ({
          ...prev,
          address: "The selected address is not in your entered zip code",
        }));
        return;
      }

      setErrors((prev) => ({ ...prev, address: "" }));
      setFormData({ ...formData, address: place.formatted_address });
      Cookies.set("address", place.formatted_address);

      toast({
        title: "Address verified",
        description: "The address matches your zip code",
      });
    } catch (error) {
      console.log("error:", error);
      setErrors((prev) => ({ ...prev, address: "Error verifying address" }));
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center flex-col">
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      <hr className="border-[#D9DBE9] my-6" />

      {
        currentStep === 5 ? <div className="mb-2">
          <h2 className="text-2xl font-semibold text-gray-800">Your Project Quote is</h2>
          <ul>
            {grandSqft?.map((sqft: any) => (
              <li key={sqft?.name}>
                <h5 className="text-gray-800 text-xl font-semibold">   <span className="font-semibold">{sqft?.name}:</span> {sqft?.grandTotal || 0}</h5>
              </li>
            ))}
          </ul>
        </div> : <h2 className="mb-2 text-2xl font-semibold text-gray-800">
          {stepContent[currentStep as keyof typeof stepContent]?.title}
        </h2>
      }

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
              className={`mt-1 p-4 h-12 ${errors.zipCode ? "border-red-500" : ""
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
            <ReactGoogleAutocomplete
              apiKey={API_KEY}
              id="address"
              placeholder="Enter address"
              className={`mt-1 p-4 h-12 ${errors.address ? "border-red-500" : ""
                }`}
              onPlaceSelected={(place) => {
                checkAddressProximity(place);
              }}
              style={{
                backgroundColor: "#EFF0F6",
                display: "flex",
                height: "3rem",
                width: "100%",
                minWidth: "0",
                borderRadius: "9999px",
                border: "1px solid #D1D5DB",
                paddingLeft: "0.75rem",
                paddingRight: "0.75rem",
                fontSize: "1rem",
                boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                transition: "color 0.2s, box-shadow 0.2s",
                outline: "none",
                color: "#111827",
                pointerEvents: "auto",
                cursor: "text",
                opacity: 1,
                fontFamily: "inherit",
              }}
              required
              options={{
                types: ["address"],
                componentRestrictions: {
                  country: ["us", "gb", "au"],
                },
              }}
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
              className={`mt-1 p-4 h-12 ${errors.confirmAddress ? "border-red-500" : ""
                }`}
              value={Cookies.get("address") || ""}
              onChange={() => { }}
              disabled
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
        <SubStepForm
          currentSubStep={currentSubStep}
          setOwnership={setOwnership}
          companyName={companies}
          errors={ownershipError}
          ownership={ownership}
          nextStep={nextStep}
          prevStep={prevStep}
        />
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
