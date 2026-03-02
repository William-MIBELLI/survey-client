import React, { type FC } from "react";
import Option from "./Option";
import type { TCreateOption } from "../../contexts/option.context";

interface IProps {
  options: TCreateOption[];
}

const OptionList: FC<IProps> = ({ options }) => {

  const onDeleteOption = (index: number) => {

  }
  return (
    <li className="flex flex-col gap-1 bg-red-200">
      {options.length > 0 &&
        options.map((option, index) => <Option key={index} data={option} />)}
    </li>
  );
};

export default OptionList;
