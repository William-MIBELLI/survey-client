import type { FC } from "react";

interface IProps {
  currentStep: number;
  maxStep: number;
  isSuccess: boolean;
}

const Stepper: FC<IProps> = ({ currentStep, maxStep, isSuccess }) => {
  const stepper = new Array(maxStep).fill(null, 0, maxStep);
  return (
    <div className="flex justify-around items-center gap-3 w-full mb-7">
      {stepper.map((val, index) => {
        const stepNumber = index + 1;
        const isCompleted = isSuccess || stepNumber < currentStep;
        const isActive = !isSuccess && stepNumber === currentStep;

        const bgColor = isCompleted
          ? "bg-green-400"
          : isActive
          ? "bg-blue-300"
          : "bg-white";

        return (
          <>
            <div className="flex  gap-2 items-center mx-auto" key={index}>
              <div
                className={`flex items-center ${
                  index % 2 ? "rotate-5" : "-rotate-5"
                } justify-center border-3 h-10 w-10 text-center border-black ${bgColor} shadowButton text-lg font-semibold`}
              >
                {index + 1}
              </div>
            </div>
            {index + 1 < maxStep && (
              <hr className=" border-2 border-black grow" />
            )}
          </>
        );
      })}
    </div>
  );
};

export default Stepper;
