import { useFormContext } from "react-hook-form";
import type { SignupSchema } from "../../lib/zod";
import Input from "../ui/Input";

const StepPassword = () => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<SignupSchema>();

  return (
    <>
      <Input
        label="Password"
        {...register("password", {
          onChange: () => {
            if (errors.password) trigger("password");
          },
        })}
        type="password"
        error={errors.password}
      />
      <Input
        label="Confirm password"
        {...register("confirmPassword", {
          onChange: () => {
            if (errors.confirmPassword) trigger("confirmPassword");
          },
        })}
        type="password"
        error={errors.confirmPassword}
      />
    </>
  );
};

export default StepPassword;
