import React, { type FC } from "react";
import Option from "./Option";
import {
  useOptionContext,
  type TCreateOption,
} from "../../contexts/option.context";
import UpdateOption from "./UpdateOption";

interface IProps {
  options: TCreateOption[];
}

const OptionList: FC<IProps> = ({ options }) => {
  const { currentSelectedOption } = useOptionContext();

  console.log("CURRENT DANS OPTIONLIST : ", currentSelectedOption)
  return (
    <li className="flex flex-col gap-1 max-h-[350px] overflow-y-auto">
      {options.length > 0 &&
        options.map((option, index) =>
          !currentSelectedOption || currentSelectedOption !== option.position ? (
            <Option key={index} data={option} />
          ) : (
            <UpdateOption data={option} />
          ),
        )}
    </li>
  );
};

export default OptionList;
