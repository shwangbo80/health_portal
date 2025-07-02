"use client";

import { CheckIcon } from "@heroicons/react/24/solid";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  steps: {
    title: string;
    description: string;
  }[];
}

export function Stepper({ currentStep, totalSteps, steps }: StepperProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={stepNumber} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`
                  w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${isCompleted 
                    ? 'bg-blue-600 text-white' 
                    : isCurrent 
                      ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-600' 
                      : 'bg-gray-200 text-gray-500'
                  }
                `}>
                  {isCompleted ? (
                    <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <div className="mt-2 text-center max-w-24 sm:max-w-32">
                  <p className={`text-xs sm:text-sm font-medium ${
                    isCurrent ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-400 hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </div>
              {stepNumber < totalSteps && (
                <div className={`flex-1 h-0.5 mx-2 sm:mx-4 ${
                  isCompleted ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
