"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
const steps = [
  {
    title: "ADMISSION",
    content: [
      "Fill the Form Online or at the Campus.",
      "Application Fee 900/- (Online Mode) Apply now",
      "Submit the necessary documents for 10th, 12th, and graduation.",
      "Submit your CAT/MAT/XAT/ATMA/CMAT/GMAT score.",
      "Attend the IMM PGDM GD/PI process.",
      "Follow the admission registration procedure in case selected by IMM Admission Committee.",
      "Preference will be given to work experience candidates",
    ],
  },
  {
    title: "ELIGIBILITY",
    content: [
      "Graduation degree in any stream or equivalent.",
      "All applicants must appear in CAT/MAT/XAT/ATMA/CMAT/GMAT score.",
      "Only test qualified applicants shall be considered for admission through the GD/PI subject to fulfilment of eligibility and admission criteria.",
    ],
  },
  {
    title: "FEE STRUCTURE",
    content: [
      "Fee Schedule for PGDM",
      "Registration Fee: Rs. 75,000/-",
      "1st Installment: Rs. 3,50,000/-",
      "2nd Installment: Rs. 2,50,000/-",
      "3rd Installment: Rs. 2,25,000/-",
      "4th Installment: Rs. 1,80,000/-",
      "Total: Rs. 10,80,000/-",
    ],
  },
  {
    title: "APPLY NOW",
    content: ["Apply Now (PGDM)"],
  },
];

const ProcessAndFees = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  return (
    <Card className="w-full pt-8 mx-auto bg-white rounded-md">
      <CardContent>
        <div className="sm:flex grid grid-cols-2 gap-4 justify-between items-center mb-8">
          {steps.map((step, index) => (
            <>
              <div
                key={index}
                className={cn(
                  "flex  flex-col items-center cursor-pointer transition-all",
                  index === activeStep ? "text-primary-color" : "text-gray-500"
                )}
                onClick={() => setActiveStep(index)}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 transition-all",
                    index === activeStep
                      ? "border-primary-color bg-primary-color text-white"
                      : index < activeStep
                      ? "border-primary-color bg-primary-color/20"
                      : "border-gray-400"
                  )}
                >
                  {index + 1}
                </div>
                <div className="text-sm w-max font-medium text-center">
                  {step.title}
                </div>
              </div>
              {index !== steps.length - 1 && (
                <div className="w-full hidden md:block h-[2px] rounded-lg mb-5 bg-primary-color/20"></div>
              )}
            </>
          ))}
        </div>
        <Card className="bg-gray-50 rounded-md">
          <CardHeader>
            <CardTitle className="text-primary-color">
              {steps[activeStep].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className=" space-y-2 text-gray-700">
              {steps[activeStep].content.map((item, index) => (
                <div className="group flex items-start gap-2" key={index}>
                  <div className="flex items-center gap-2">
                    <ArrowRightIcon className="w-4 h-4 mr-2 mt-1 text-primary-color group-hover:text-primary-color/80 transition-all duration-100 group-hover:translate-x-1 scale-100 group-hover:scale-125 " />
                  </div>
                  <div className="flex items-center gap-2">
                    <li className="hover:text-primary-color hover:text-base hover:font-medium transition-all duration-100 cursor-pointer">
                      {item}
                    </li>
                  </div>
                </div>
              ))}
            </ul>
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={handlePrev}
          disabled={activeStep === 0}
          variant="outline"
          className="border-primary-color text-primary-color hover:bg-primary-color hover:text-white"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
          className="bg-primary-color text-white hover:bg-primary-color/90"
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProcessAndFees;
