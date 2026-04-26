import React, { type Dispatch, type FC } from "react";

import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { optionSchema } from "../../lib/zod";
import Check from "../ui/Check";
import IconButton from "../ui/IconButton";
import { CheckIcon, CircleX } from "lucide-react";
import type { TCreateOption } from "../../types/types";
import type { TOptionField } from "./OptionList";

interface IProps {
  data: TOptionField;
  onUpdate: (data: TOptionField) => void;
  position: number;
  setCurrentSelectedPosition: Dispatch<number | undefined>;
}

const UpdateOption: FC<IProps> = ({
  data,
  onUpdate,
  position,
  setCurrentSelectedPosition,
}) => {
  const { label, withArgs } = data;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(optionSchema),
    defaultValues: {
      label,
      withArgs,
    },
  });

  const onUpdateHandler = (args: TCreateOption) => {
    onUpdate({ ...data, ...args, position });
    setCurrentSelectedPosition(undefined);
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    handleSubmit(onUpdateHandler)();
  };

  return (
    <div
      // onSubmit={handleSubmit(onUpdateOption)}
      className="p-2 flex items-center gap-3 border-2 bg-blue-300 border-black"
    >
      <Input
        autoFocus
        label=""
        {...register("label")}
        error={errors.label}
        onKeyDown={onPressEnter}
      />
      <input type="hidden" {...register("position", { value: position })} />
      <Check label="Args" {...register("withArgs")} />
      <div className="flex items-center gap-2">
        <IconButton
          text=""
          className="bg-white"
          type="button"
          onClick={handleSubmit(onUpdateHandler)}
        >
          <CheckIcon size={13} color="green" />
        </IconButton>
        <IconButton
          text=""
          className="bg-white"
          onClick={() => setCurrentSelectedPosition(undefined)}
        >
          <CircleX size={13} color="red" />
        </IconButton>
      </div>
    </div>
  );
};

export default UpdateOption;
