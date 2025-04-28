interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) {
  return (
    <div className="mb-6 w-full">
      <div className="flex items-center justify-center w-full">
        {/* Render all Step Circles */}
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStep;

          return (
            <div key={`step-${index}`} className="flex items-center flex-1">
              <div
                className={`flex items-center justify-center rounded-full border-2 shrink-0 ${
                  isActive
                    ? "border-orange-400 bg-orange-400"
                    : "border-gray-200 bg-white"
                } h-8 w-8`}
              >
                <span
                  className={`text-xs font-medium ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                >
                  {stepNumber}
                </span>
              </div>
              {stepNumber !== totalSteps && (
                <div className="flex-1 mx-2">
                  <div className="h-2 rounded bg-gray-200 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        currentStep > stepNumber
                          ? "bg-orange-400 w-full"
                          : currentStep === stepNumber
                          ? "bg-orange-400 w-1/2"
                          : "bg-gray-200 w-0"
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
