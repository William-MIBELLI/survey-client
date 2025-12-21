import { useFormContext } from "react-hook-form";
import type { SignupSchema } from "../../lib/zod";
import Input from "../ui/Input";

const StepIdentity = () => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<SignupSchema>();
  return (
    <>
      <Input
        label="Firstname"
        {...register("firstname", {
          onChange: () => {
            if (errors.firstname) trigger("firstname");
          },
        })}
        error={errors.firstname}
      />
      <Input
        label="Lastname"
        {...register("lastname", {
          onChange: () => {
            if (errors.lastname) trigger("lastname");
          },
        })}
        error={errors.lastname}
      />
    </>
  );
};

export default StepIdentity;
