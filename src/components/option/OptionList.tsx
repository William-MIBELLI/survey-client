import { useState, type FC } from "react";
import Option from "./Option";
import UpdateOption from "./UpdateOption";
import type { FieldArrayWithId } from "react-hook-form";
import type { TQuestionSchema } from "../../lib/zod";

export type TOptionField = FieldArrayWithId<TQuestionSchema, "options", "id">;

interface IProps {
  options: TOptionField[];
  onRemove: (position: number) => void;
  onUpdate: (index: number, data: any) => void;
}

const OptionList: FC<IProps> = ({ options, onRemove, onUpdate }) => {
  const [currentSelectedPosition, setCurrentSelectedPosition] =
    useState<number>();

  return (
    <li className="flex flex-col gap-1 max-h-[350px] overflow-y-auto">
      {options.length > 0 ? (
        options
          .map((option, index) =>
            currentSelectedPosition === index ? (
              <UpdateOption
                key={option.id}
                position={index}
                data={option}
                onUpdate={(data) => onUpdate(index, data)}
                setCurrentSelectedPosition={setCurrentSelectedPosition}
              />
            ) : (
              <Option
                key={option.id}
                position={index}
                data={option}
                setCurrentSelectedPosition={setCurrentSelectedPosition}
                onRemove={onRemove}
              />
            ),
          )
      ) : (
        <div className="text-center font-semibold text-sm text-white bg-red-400 m-fi py-2">
          No options... 😢
        </div>
      )}
    </li>
  );
};

export default OptionList;
