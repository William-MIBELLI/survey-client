import React, { type FC } from "react";
import {
  useOptionContext,
  type TCreateOption,
} from "../../contexts/option.context";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOptionSchema } from "../../lib/zod";
import Check from "../ui/Check";
import IconButton from "../ui/IconButton";
import { CheckIcon, CircleX } from "lucide-react";

interface IProps {
  data: TCreateOption;
}

const UpdateOption: FC<IProps> = ({ data }) => {
  const { label, withArgs } = data;
  const { onUpdateOption, setCurrentSelectedOption } = useOptionContext();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createOptionSchema),
    defaultValues: {
      label,
      withArgs,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onUpdateOption)}
      className="p-2 flex items-center gap-3 border-2 bg-blue-300 border-black"
    >
      <Input label="" {...register("label")} error={errors.label} />
      <Check label="Args" {...register("withArgs")} />
      <div className="flex items-center gap-2">
        <IconButton text="" className="bg-white" type="submit">
          <CheckIcon size={13} color="green"/>
        </IconButton>
        <IconButton text="" className="bg-white" onClick={() => setCurrentSelectedOption(undefined)}>
          <CircleX size={13} color="red"/>
        </IconButton>
      </div>
    </form>
  );
};

export default UpdateOption;
