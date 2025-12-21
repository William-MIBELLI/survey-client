import Form from "./Form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState, type FC } from "react";
import { signUpSchema, type SignupSchema } from "../../lib/zod";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SIGNUP } from "../../lib/mutations/auth.mutation";
import type {
  QueryUserByEmailArgs,
  SignupMutation,
  SignupMutationVariables,
  UserByEmailQuery,
} from "../../gql/generated";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { ME, USER_BY_EMAIL } from "../../lib/queries/auth.query";
import StepEmail from "../signup/StepEmail";
import StepIdentity from "../signup/StepIdentity";
import StepPassword from "../signup/StepPassword";
import StepSuccess from "../signup/StepSuccess";
import Stepper from "../signup/Stepper";

const FINAL_PART = 3;

const SignupForm = () => {
  const { step } = useParams();
  const navigate = useNavigate();
  const [success, setSuccess] = useState<boolean>(false);

  const [signup, { loading }] = useMutation<
    SignupMutation,
    SignupMutationVariables
  >(SIGNUP);
  const [checkEmail, { loading: userLoading }] = useLazyQuery<
    UserByEmailQuery,
    QueryUserByEmailArgs
  >(USER_BY_EMAIL);

  const mappedStep = parseInt(step?.replace(/[\D]/g, "") || "1", 10);
  const currentStep = mappedStep > FINAL_PART ? 1 : mappedStep;

  const onPreviousHandler = () => navigate(`/signup/${currentStep - 1}`);

  const onNextHandler = async () => {
    if (currentStep === 1) {
      const res = await methods.trigger("email");
      if (!res) return;
      const mail = await checkEmail({
        variables: {
          email: methods.getValues("email"),
        },
      });
      if (mail.data?.userByEmail !== null) {
        console.log("EMAIL : ", mail);
        methods.setError("email", {
          message: "An account is already associated with this email address.",
        });
        return;
      }
    }
    if (currentStep === 2) {
      const res = await methods.trigger(["firstname", "lastname"]);
      if (!res) return;
    }
    if (currentStep === 3) {
      const res = await methods.trigger(["password", "confirmPassword"]);
      if (!res) return;
    }
    navigate(`/signup/${currentStep + 1}`);
  };

  const onSubmitHandler = (data: SignupSchema) => {
    signup({
      variables: {
        args: {
          ...methods.getValues(),
          isPremium: false,
        },
      },
      update: (cache, { data }) => {
        if (!data?.signup) return;
        cache.writeQuery({
          query: ME,
          data: {
            me: data.signup,
          },
        });
      },
      onCompleted: (data) => {
        setSuccess(true)
      },
    });
  };

  const methods = useForm<SignupSchema>({
    resolver: zodResolver(signUpSchema),
    reValidateMode: "onChange",
    mode: "onSubmit"
  });

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmitHandler)}>
        <Stepper currentStep={currentStep} maxStep={FINAL_PART} isSuccess={success} />
        {!success ? (
          currentStep === 1 ? (
            <StepEmail />
          ) : currentStep === 2 ? (
            <StepIdentity />
          ) : (
            currentStep === 3 && <StepPassword />
          )
        ) : (
          <StepSuccess />
        )}
        {!success && (
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
              <Button
                text="Signup"
                type="submit"
                className="w-full"
                loading={loading}
              />
            ) : (
              <Button
                text="Next"
                onClick={onNextHandler}
                className="w-full"
                type="button"
                loading={userLoading}
              />
            )}
          </div>
        )}
      </Form>
    </FormProvider>
  );
};

export default SignupForm;

//PART 1 => EMAIL

//PART 2 => NOM PRENOM

//PART 3 => PASSWORD

//PART 4 => PHOTO
