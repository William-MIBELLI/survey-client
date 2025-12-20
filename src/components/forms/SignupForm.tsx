import Form from "./Form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useNavigate, useParams } from "react-router";
import { useState, type FC } from "react";
import { signUpSchema, type SignupSchema } from "../../lib/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FINAL_PART = 3;

const SignupForm = () => {
  const { step } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupSchema>({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
  });

  const mappedStep = parseInt(step?.replace(/[\D]/g, "") || "1", 10);
  const currentStep = mappedStep > FINAL_PART ? 1 : mappedStep;

  const onPreviousHandler = () => navigate(`/signup/${currentStep - 1}`);
  const onNextHandler = () => navigate(`/signup/${currentStep + 1}`);

  const onUpdateHandler = (data: string, key: keyof SignupSchema) => {
    setFormData({ ...formData, [key]: data });
    console.log("FORMDATA : ", formData);
  };

  const { formState, register, } = useForm({
    resolver: zodResolver(signUpSchema),
    reValidateMode: "onChange"
  })

  return (
    <Form>
      {currentStep === 1 && (
        <Step1 values={[formData.email]} update={onUpdateHandler} />
      )}
      {currentStep === 2 && (
        <Step2
          values={[formData.firstname, formData.lastname]}
          update={onUpdateHandler}
        />
      )}
      {currentStep === 3 && (
        <Step3
          values={[formData.password, formData.confirmPassword]}
          update={onUpdateHandler}
        />
      )}

      <div className="flex w-full  gap-4 my-5">
        {currentStep > 1 && (
          <Button
            text="Previous"
            onClick={onPreviousHandler}
            className="w-full"
            type="button"
          />
        )}
        {currentStep === FINAL_PART ? (
          <Button text="Signup" type="submit" className="w-full" />
        ) : (
          <Button
            text="Next"
            onClick={onNextHandler}
            className="w-full"
            type="button"
          />
        )}
      </div>
    </Form>
  );
};

export default SignupForm;

interface IProps {
  values: string[];
  update: (data: string, key: keyof SignupSchema) => void;
}

const Step1: FC<IProps> = ({ values, update }) => {
  return (
    <>
      <Input
        label="Email"
        value={values[0]}
        onChange={(e) => update(e.target.value, "email")}
      />
    </>
  );
};

const Step2: FC<IProps> = ({ values, update }) => {
  return (
    <>
      <Input
        label="Firstname"
        value={values[0]}
        onChange={(e) => update(e.target.value, "firstname")}
      />
      <Input
        label="Lastname"
        value={values[1]}
        onChange={(e) => update(e.target.value, "lastname")}
      />
    </>
  );
};

const Step3: FC<IProps> = ({ values, update }) => {
  return (
    <>
      <Input
        label="Password"
        value={values[0]}
        onChange={(e) => update(e.target.value, "password")}
      />
      <Input
        label="Confirm password"
        value={values[1]}
        onChange={(e) => update(e.target.value, "confirmPassword")}
      />
    </>
  );
};

//PART 1 => EMAIL

//PART 2 => NOM PRENOM

//PART 3 => PASSWORD

//PART 4 => PHOTO
