import Form from "./Form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useNavigate, useParams } from "react-router";

const FINAL_PART = 3;
const SignupForm = () => {
  const { step } = useParams();
  const navigate = useNavigate();

  const mappedStep = parseInt(step?.replace(/[\D]/g, "") || "1", 10);
  const currentStep = mappedStep > FINAL_PART ? 1 : mappedStep

  const onPreviousHandler = () => navigate(`/signup/${currentStep - 1}`);
  const onNextHandler = () => navigate(`/signup/${currentStep + 1}`);

  console.log('CURRENT STEP : ', currentStep)
  return (
    <Form>

      {currentStep === 1 && <Step1 />}
      {currentStep === 2 && <Step2 />}
      {currentStep === 3 && <Step3 />}

      <div className="flex w-full  gap-4 my-5">
        {currentStep > 1 && (
          <Button text="Previous" onClick={onPreviousHandler} className="w-full" />
        )}
        {currentStep === FINAL_PART ? (
          <Button text="Signup" type="submit" className="w-full" />
        ) : (
          <Button text="Next" onClick={onNextHandler} className="w-full" />
        )}
      </div>

    </Form>
  );
};

export default SignupForm;

const Step1 = () => {
  return (
    <>
      <Input label="Email" />
    </>
  );
};

const Step2 = () => {
  return (
    <>
      <Input label="Firstname" />
      <Input label="Lastname" />
    </>
  );
};

const Step3 = () => {
  return (
    <>
      <Input label="Password" />
      <Input label="Confirm password" />
    </>
  );
};

//PART 1 => EMAIL

//PART 2 => NOM PRENOM

//PART 3 => PASSWORD

//PART 4 => PHOTO
