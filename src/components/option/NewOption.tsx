import { type FC } from "react";

import Input from "../ui/Input";
import Check from "../ui/Check";
import Button from "../ui/Button";
import {
  useForm
} from "react-hook-form";
import {
  optionSchema,
  type TOptionSchema
} from "../../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { HandGrab } from "lucide-react";

interface IProps {
  onAppend: (data: TOptionSchema) => void;
  fieldsLength: number
}

const NewOption: FC<IProps> = ({ onAppend, fieldsLength }) => {

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(optionSchema),

  });

  const onCreateOption = (data: TOptionSchema) => {
    const newOption: TOptionSchema = { ...data };
    console.log("ONCREATEOPTION : ", newOption)
    onAppend(newOption);
    reset();
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSubmit(onCreateOption)()
    }
  }

  return (
    <div className="flex gap-8  items-center">
      <Input
        label="Option label"
        className="grow"
        {...register("label")}
        error={errors.label}
        onKeyDown={onPressEnter}
      />

      <Check label="With args?" {...register("withArgs")} />
      <input type="number" hidden {...register("position", {value: fieldsLength + 1})} />
      <Button
        text="Add"
        className="h-2/3 flex text-center"
        type="button"
        onClick={handleSubmit(onCreateOption)}
      />
    </div>
  );
};

export default NewOption;
