import React from 'react';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { ArrowLeft, Star } from 'lucide-react';
import { StaticImageData } from 'next/image';

interface Company {
    name: string;
    shingle: string;
    metal: string;
    tile: string;
    image: StaticImageData;
    desc: string;
    subDesc: string;
}

interface SubStepFormProps {
    currentSubStep: number;
    errors: any;
    ownership: any;
    setOwnership: any;
    companyName: Array<Company>;
    prevStep: () => void;
    nextStep: () => void;
}

const SubStepForm = ({ currentSubStep, errors, ownership, setOwnership, companyName, prevStep, nextStep }: SubStepFormProps) => {

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        stepKey: 'step1Info' | 'step2Info' | 'step3Info' | 'step4Info'
    ) => {
        const { id, value } = e.target;
        setOwnership((prev: any) => ({
            ...prev,
            [stepKey]: {
                ...prev[stepKey],
                [id]: value,
            },
        }));
    };

    const handleRadioChange = (
        value: string,
        stepKey: 'step1Info' | 'step2Info' | 'step3Info' | 'step4Info',
        id: string
    ) => {
        setOwnership((prev: any) => ({
            ...prev,
            [stepKey]: {
                ...prev[stepKey],
                [id]: value,
            },
        }));
    };


    return (
        <div className="space-y-6">
            {currentSubStep === 1 && (
                <>
                    {/* Name */}
                    <div>
                        <Input
                            id="name"
                            placeholder="Enter Name"
                            className={`mt-1 p-4 h-12 ${errors.step1Info?.name ? "border-red-500" : ""}`}
                            value={ownership.step1Info.name}
                            onChange={(e) =>
                                handleInputChange(e, "step1Info")
                            }
                        />
                        {errors.step1Info?.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.step1Info.name}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <Input
                            id="phone"
                            placeholder="Enter Phone"
                            className={`mt-1 p-4 h-12 ${errors.step1Info?.phone ? "border-red-500" : ""}`}
                            value={ownership.step1Info.phone}
                            onChange={(e) =>
                                handleInputChange(e, "step1Info")
                            }
                        />
                        {errors.step1Info?.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.step1Info.phone}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <Input
                            id="email"
                            placeholder="Enter Email"
                            className={`mt-1 p-4 h-12 ${errors.step1Info?.email ? "border-red-500" : ""}`}
                            value={ownership.step1Info.email}
                            onChange={(e) =>
                                handleInputChange(e, "step1Info")
                            }
                        />
                        {errors.step1Info?.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.step1Info.email}</p>
                        )}
                    </div>

                    {/* Ownership */}
                    <div>
                        <RadioGroup
                            value={ownership.step1Info.isOwner}
                            onValueChange={(value) =>
                                handleRadioChange(value, "step1Info", "isOwner")
                            }
                            className="space-y-4"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className={`flex items-center space-x-2 border rounded-full p-4`}>
                                    <RadioGroupItem value="I do own this home" id="own" className="text-orange-400" />
                                    <Label htmlFor="own" className="flex-grow cursor-pointer">
                                        I do own this home
                                    </Label>
                                </div>
                                <div className={`flex items-center space-x-2 border rounded-full p-4`}>
                                    <RadioGroupItem value="I don’t own this home" id="not-own" className="text-orange-400" />
                                    <Label htmlFor="not-own" className="flex-grow cursor-pointer">
                                        I don’t own this home
                                    </Label>
                                </div>
                            </div>
                        </RadioGroup>
                        {errors.step1Info?.isOwner && (
                            <p className="text-red-500 text-sm mt-1">{errors.step1Info.isOwner}</p>
                        )}
                    </div>
                </>
            )}

            {currentSubStep === 2 && (
                <>
                    <div className="flex flex-col gap-5">
                        <p>Does the roof have a leak?</p>
                        <RadioGroup
                            value={ownership.step2Info.roofLeak}
                            onValueChange={(value) =>
                                handleRadioChange(value, "step2Info", "roofLeak")
                            }
                            className="space-y-4"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2 border rounded-full p-4">
                                    <RadioGroupItem value="Yes" id="leak-yes" className="text-orange-400" />
                                    <Label htmlFor="leak-yes" className="flex-grow cursor-pointer">Yes</Label>
                                </div>
                                <div className="flex items-center space-x-2 border rounded-full p-4">
                                    <RadioGroupItem value="No" id="leak-no" className="text-orange-400" />
                                    <Label htmlFor="leak-no" className="flex-grow cursor-pointer">No</Label>
                                </div>
                            </div>
                        </RadioGroup>
                        {errors.step2Info?.roofLeak && (
                            <p className="text-red-500 text-sm mt-1">{errors.step2Info.roofLeak}</p>
                        )}
                    </div>

                    <div>
                        <Input
                            id="roofAge"
                            placeholder="Enter Your Roof Age"
                            className={`mt-1 p-4 h-12 ${errors.step2Info?.roofAge ? "border-red-500" : ""}`}
                            value={ownership.step2Info.roofAge}
                            onChange={(e) =>
                                handleInputChange(e, "step2Info")
                            }
                        />
                        {errors.step2Info?.roofAge && (
                            <p className="text-red-500 text-sm mt-1">{errors.step2Info.roofAge}</p>
                        )}
                    </div>
                </>
            )}

            {currentSubStep === 3 && (
                <>
                    <div>
                        <RadioGroup
                            value={ownership.step3Info.yourRoof}
                            onValueChange={(value) =>
                                handleRadioChange(value, "step3Info", "yourRoof")
                            }
                            className="space-y-4"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2 border rounded-full p-4">
                                    <RadioGroupItem
                                        value="Do you have a shingle, metal, tile roof, other?"
                                        id="have-roof"
                                        className="text-orange-400"
                                    />
                                    <Label htmlFor="have-roof" className="flex-grow cursor-pointer">
                                        Do you have a shingle, metal, tile roof, other?
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2 border rounded-full p-4">
                                    <RadioGroupItem
                                        value="Do you want a shingle, metal, tile roof, other?"
                                        id="want-roof"
                                        className="text-orange-400"
                                    />
                                    <Label htmlFor="want-roof" className="flex-grow cursor-pointer">
                                        Do you want a shingle, metal, tile roof, other?
                                    </Label>
                                </div>
                            </div>
                        </RadioGroup>
                        {errors.step3Info?.yourRoof && (
                            <p className="text-red-500 text-sm mt-1">{errors.step3Info.yourRoof}</p>
                        )}
                    </div>

                    <div className="w-full">
                        <Select
                            value={ownership.step3Info.roofMaterial}
                            onValueChange={(value) =>
                                handleRadioChange(value, "step3Info", "roofMaterial")
                            }
                        >
                            <SelectTrigger size="lg" className="w-full">
                                <SelectValue placeholder="Select roof type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="shingle">Shingle Roof</SelectItem>
                                <SelectItem value="metal">Metal Roof</SelectItem>
                                <SelectItem value="tile">Tile Roof</SelectItem>
                                <SelectItem value="other">Other / Not Sure</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.step3Info?.roofMaterial && (
                            <p className="text-red-500 text-sm mt-1">{errors.step3Info.roofMaterial}</p>
                        )}
                    </div>
                </>
            )}

            {currentSubStep === 4 && (
                <div>


                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {companyName.map((item: any) => {
                            const isChecked = ownership.step4Info.company?.some((c: any) => c.name === item.name);

                            const handleToggleCompany = () => {
                                setOwnership((prev: any) => {
                                    const alreadySelected = prev.step4Info.company?.some((c: any) => c.name === item.name);
                                    const updatedCompanies = alreadySelected
                                        ? prev.step4Info.company.filter((c: any) => c.name !== item.name) // remove
                                        : [...prev.step4Info.company, item]; // add

                                    return {
                                        ...prev,
                                        step4Info: {
                                            ...prev.step4Info,
                                            company: updatedCompanies,
                                        },
                                    };
                                });
                            };

                            return (
                                <div
                                    key={item.name}
                                    onClick={handleToggleCompany}
                                    className="flex justify-between items-center gap-2 p-2 rounded-md hover:bg-accent/30 cursor-pointer w-full border"
                                >
                                    {/* Left: Image + Info */}
                                    <div className="flex items-start gap-2">
                                        <img
                                            src={item.image?.src}
                                            alt="company"
                                            className="w-12 h-10 object-contain rounded-sm"
                                        />
                                        <div className="flex flex-col text-sm">
                                            <span className="font-semibold">{item.name}</span>
                                            <span className="flex gap-1 items-center text-xs text-yellow-500">
                                                {[1, 1, 1, 1, 1].map((_, i) => (
                                                    <Star key={i} size={10} fill="#FFD700" />
                                                ))}
                                                {item.desc}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {item.subDesc}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Right: Checkbox */}
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        readOnly
                                        className="ml-auto"
                                    />
                                </div>
                            );
                        })}

                    </div>


                </div>
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
                    {currentSubStep === 4 ? "Submit" : "Next Step"}
                </Button>
            </div>
        </div>
    );
};

export default SubStepForm;
