import Form from "./Form";
import Button from "../ui/Button";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState, type FC } from "react";
import { signUpSchema, type SignupSchema } from "../../lib/zod";
import { useForm, FormProvider } from "react-hook-form";
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
  const [success, setSuccess] = useState<boolean>(true);

  const [signup, { loading, error: signupError }] = useMutation<
    SignupMutation,
    SignupMutationVariables
  >(SIGNUP);
  const [checkEmail, { loading: userLoading, error: mailError }] = useLazyQuery<
    UserByEmailQuery,
    QueryUserByEmailArgs
  >(USER_BY_EMAIL);

  const mappedStep = parseInt(step?.replace(/[\D]/g, "") || "1", 10);
  const currentStep = mappedStep > FINAL_PART ? 1 : mappedStep;

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
    mode: "onSubmit",

  });

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

  useEffect(() => {
    if (currentStep === 2) {
      if (methods.getValues("email") === undefined) {
        navigate('/signup/1')
      }
    }
    if (currentStep === 3) {
      if (methods.getValues("firstname") === undefined || methods.getValues("lastname") === undefined) {
        navigate('/signup/2')
      }
    }
  },[currentStep])
  

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmitHandler)}>
        <Stepper currentStep={currentStep} maxStep={FINAL_PART} isSuccess={success} />
        <hr className=" mb-5 wavy-hr"/>
        {!success ? (
          currentStep === 1 ? (
            <StepEmail />
          ) : currentStep === 2 ? (
            <StepIdentity />
          ) : (
            currentStep === 3 && <StepPassword />
          )
        ) : (
          <StepSuccess message="You' re now register on Qrafter !" title="Congrats!" />
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
        {
          mailError && <p className="text-xs text-red-500 text-center w-full font-semibold">{mailError.message}</p>
        }

      </Form>
    </FormProvider>
  );
};

export default SignupForm;
