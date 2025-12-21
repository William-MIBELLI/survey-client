import { useFormContext } from "react-hook-form";
import type { SignupSchema } from "../../lib/zod";
import Input from "../ui/Input";
import { useEffect } from "react";

const StepPassword = () => {
  const {
    register,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext<SignupSchema>();

  const passwordValue = watch("password") || "";

  const checks = {
    uppercase: /[A-Z]/.test(passwordValue),
    lowercase: /[a-z]/.test(passwordValue),
    number: /[0-9]/.test(passwordValue),
    length: passwordValue.length >= 8,
    special: /[@$!%*?&]/.test(passwordValue),
  };

  const getStatusColor = (isValid: boolean) =>
    isValid ? "text-green-500" :  errors.password ? "text-red-500" : "text-gray-500";

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
        // error={errors.password}
      />
      <div className="grid mx-auto grid-cols-2 gap-x-9 font-semibold text-xs mb-3 ">
        <p className={getStatusColor(checks.uppercase)}>1 Uppercase</p>
        <p className={getStatusColor(checks.lowercase)}>1 Lowercase</p>
        <p className={getStatusColor(checks.number)}>1 Number</p>
        <p className={getStatusColor(checks.special)}>1 Special char : @$!%*?&</p>
        <p className={getStatusColor(checks.length)}>8 Chars minimum</p>
      </div>
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
