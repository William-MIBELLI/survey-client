import React, { type FC } from "react";
import Option from "./Option";
import {
  useOptionContext,
  type TCreateOption,
} from "../../contexts/option.context";
import UpdateOption from "./UpdateOption";

type Top = TCreateOption & { id: string };

interface IProps {
  options: Top[];
  onRemove: (position: number) => void;
  onUpdate: (data: any) => void;
}

const OptionList: FC<IProps> = ({ options, onRemove, onUpdate }) => {
  const { currentSelectedOption } = useOptionContext();

  return (
    <li className="flex flex-col gap-1 max-h-[350px] overflow-y-auto">
      {options.length > 0 &&
        options.map((option) =>
          !currentSelectedOption ||
          currentSelectedOption !== option.position ? (
            <Option key={option.id} data={option} onRemove={onRemove} />
          ) : (
            <UpdateOption key={option.id} data={option} onUpdate={onUpdate} />
          ),
        )}
    </li>
  );
};

export default OptionList;
