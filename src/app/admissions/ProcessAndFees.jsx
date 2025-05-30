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
      "Application Fee ₹900.",
      "Submit the necessary documents for 10th, 12th, and graduation.",
      "Submit your CAT / MAT / XAT / ATMA / CMAT / GMAT score.",
      "Attend the IMM PGDM GD/PI process.",
      "Follow the admission registration procedure in case selected by IMM Admission Committee.",
      "Preference will be given to work experience candidates.",
    ],
  },
  {
    title: "ELIGIBILITY",
    content: [
      "Graduation degree in any stream or equivalent.",
      "All applicants must appear in CAT / MAT / XAT / ATMA / CMAT / GMAT score.",
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
  {
    title: "REFUND POLICY",
    content: [
      "IMM Business School will follow AICTE guidelines and policy in this matter and refund the collected fee after deducting an amount of 1,000/- as Processing Fee, to the students withdrawing their admission before the last date of admission, irrespective of the reasons for withdrawal of admission.",
      "However, the Application Fee once paid, is non-refundable",
    ],
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
    <Card className="w-full pt-8 mx-auto bg-white rounded-md sm:max-w-7xl">
      <CardContent>
        <div className="grid items-center justify-between grid-cols-2 gap-4 mb-8 sm:flex">
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
                <div className="text-sm font-medium text-center w-max">
                  {step.title}
                </div>
              </div>
              {index !== steps.length - 1 && (
                <div className="w-full hidden md:block h-[2px] rounded-lg mb-5 bg-primary-color/20"></div>
              )}
            </>
          ))}
        </div>
        <Card className="rounded-md bg-gray-50">
          <CardHeader>
            <CardTitle className="text-primary-color">
              {steps[activeStep].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-700 ">
              {steps[activeStep].content.map((item, index) => (
                <div className="flex items-start gap-2 group" key={index}>
                  <div className="flex items-center gap-2">
                    <ArrowRightIcon className="w-4 h-4 mt-1 mr-2 transition-all duration-100 scale-100 text-primary-color group-hover:text-primary-color/80 group-hover:translate-x-1 group-hover:scale-125 " />
                  </div>
                  <div className="flex items-center gap-2">
                    {item == "Apply Now (PGDM)" ? (
                      <Button
                        onClick={() =>
                          window.open(
                            "https://admissions.immindia.edu.in/",
                            "_blank"
                          )
                        }
                        className="-m-1 text-white break-words transition-all duration-100 cursor-pointer bg-primary-color sm:text-sm hover:text-white hover:font-medium hover:animate-pulse"
                      >
                        {item}
                      </Button>
                    ) : (
                      <li className="break-words transition-all duration-100 cursor-pointer sm:text-sm hover:text-primary-color hover:text-base hover:font-medium">
                        {item}
                      </li>
                    )}
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
          className={`text-white bg-primary-color hover:bg-primary-color/90 ${activeStep === steps.length - 1 ? "hidden" : "block"}`}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProcessAndFees;
