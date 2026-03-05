import React, { type FC } from "react";
import {
  useOptionContext,
  type TCreateOption,
} from "../../contexts/option.context";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { optionSchema } from "../../lib/zod";
import Check from "../ui/Check";
import IconButton from "../ui/IconButton";
import { CheckIcon, CircleX } from "lucide-react";

interface IProps {
  data: TCreateOption;
  onUpdate: (data: any) => void;
}

const UpdateOption: FC<IProps> = ({ data, onUpdate }) => {
  const { label, withArgs, position } = data;
  const { onUpdateOption, setCurrentSelectedOption } = useOptionContext();

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

  const onUpdateHandler = (data: TCreateOption) => {
    onUpdate(data);
    setCurrentSelectedOption(undefined);
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
          onClick={() => setCurrentSelectedOption(undefined)}
        >
          <CircleX size={13} color="red" />
        </IconButton>
      </div>
    </div>
  );
};

export default UpdateOption;
