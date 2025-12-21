import React from "react";
import { useFormContext } from "react-hook-form";
import type { SignupSchema } from "../../lib/zod";
import Input from "../ui/Input";

const StepEmail = () => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<SignupSchema>();
  return (
    <>
      <Input
        label="Email"
        {...register("email", {
          onChange: () => {
            if (errors.email) trigger("email");
          },
        })}
        error={errors.email}
      />
    </>
  );
};

export default StepEmail;
