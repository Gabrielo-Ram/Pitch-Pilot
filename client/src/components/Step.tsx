import { RiArrowDropDownLine } from "react-icons/ri";
import { useRef, useState } from "react";

type StepProps = {
  className?: string;
  stepNumber: string;
  stepTitle: string;
  children: React.ReactNode;
};

function Step({ className, stepNumber, stepTitle, children }: StepProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className={`flex flex-col justify-center [&>*]:border-1 ${className}`}>
      <div
        id="clickable"
        className={`rounded-2xl border-1 border-light-grey bg-gradient-to-br from-light-grey/20 to-blue/80 py-2 w-full mx-auto inline-flex hover:cursor-pointer`}
        onClick={() => setIsVisible((a) => !a)}
      >
        <h1 className="text-2xl lg:text-3xl font-semibold w-[90%] flex items-center">
          <span className="text-6xl font-bold mx-10">{stepNumber}.</span>
          {stepTitle}
        </h1>
        <div className="flex-grow flex items-end">
          <RiArrowDropDownLine className="size-full" />
        </div>
      </div>

      <div
        id="dropdown"
        className={`grid origin-top ${
          isVisible ? "scale-y-[100%]" : "scale-y-0 h-0"
        } transition-all duration-400 ease-in-out overflow-y-hidden bg-light-grey w-[99%] mx-auto rounded-xl grid-cols-1 lg:grid-cols-2 text-dark-grey font-bold scale`}
      >
        {children}
      </div>
    </div>
  );
}

export default Step;
