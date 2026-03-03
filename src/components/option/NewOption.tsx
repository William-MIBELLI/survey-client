import React, { useState } from "react";
import {
  useOptionContext,
  type TCreateOption,
} from "../../contexts/option.context";
import Input from "../ui/Input";
import Check from "../ui/Check";
import Button from "../ui/Button";
import { useForm, type FieldError } from "react-hook-form";
import { createOptionSchema, type TCreateOptionSchema } from "../../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";

const NewOption = () => {

  const { options, setOptions } = useOptionContext();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    
  } = useForm({
    resolver: zodResolver(createOptionSchema),
  });

  const onCreateOption = (data: TCreateOptionSchema) => {
    const newOption: TCreateOption = { ...data, position: options.length + 1 };
    setOptions([...options, newOption]);
    reset()
  };

  return (
    <form className="flex gap-8 my-4 items-center" onSubmit={handleSubmit(onCreateOption)}>
      <Input
        label="Option label"
        className="grow"
        {...register('label')}
        error={errors.label}
      />

      <Check
        label="With args?"
        {...register('withArgs')}
      />
      <Button text="Add" className="h-2/3 flex text-center" type="submit" />
    </form>
  );
};

export default NewOption;
