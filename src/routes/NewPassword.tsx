import  { useState } from "react";
import { useParams } from "react-router";
import Form from "../components/forms/Form";
import Input from "../components/ui/Input";
import StepPassword from "../components/signup/StepPassword";
import Button from "../components/ui/Button";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, type TResetPasswordSchema } from "../lib/zod";
import { useMutation } from "@apollo/client/react";
import type { ResetPasswordMutation } from "../gql/generated";
import type { MutationResetPasswordArgs } from "../gql/graphql";
import { RESET_PASSWORD } from "../lib/mutations/auth.mutation";
import { ME } from "../lib/queries/auth.query";
import StepSuccess from "../components/signup/StepSuccess";

const NewPassword = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const { token } = useParams();
  const methods = useForm({
    resolver: zodResolver(resetPasswordSchema),
    reValidateMode: "onChange",
    mode: "onSubmit",
    criteriaMode: "all",
  });

  const [resetPassword, { loading, error }] = useMutation<
    ResetPasswordMutation,
    MutationResetPasswordArgs
  >(RESET_PASSWORD);

  const onSubmitHandler = (data: TResetPasswordSchema) => {
    resetPassword({
      variables: {
        args: {
          email: data.email,
          newPassword: data.password,
          confirmNewPassword: data.confirmPassword,
          token: token!,
        },
      },
      onCompleted: (data) => {
        setSuccess(true);
      },
      update: (cache, data) => {
        if (!data.data?.resetPassword) return;
        cache.writeQuery({
          query: ME,
          data: {
            me: data.data.resetPassword,
          },
        });
      },
      onError: (error) => {
        console.log("ERROR : ", error);
      },
    });
  };

  return (
    <div className="flex flex-col w-full h-full bg-lime-300 items-center justify-center">
      <div className="flex flex-col gap-7">
        <h1 className="titleFont text-9xl my-3">Reset password</h1>
        <p className="font-semibold ml-30 bg-white w-fit p-1">
          Welcome back ! Just some infos to report and it's done
        </p>
      </div>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmitHandler)}>
          {!success ? (
            <>
              <Input
                label="Email"
                {...methods.register("email")}
                error={methods.formState.errors.email}
              />
              <StepPassword />
              <Button text="Reset password" type="submit" loading={loading} />
              {error && <p className="errorInputMessage">{error.message}</p>}
            </>
          ) : (
            <StepSuccess title="Let's go !" message="Your password is successfully reseted !"/>
          )}
        </Form>
      </FormProvider>
      <img
        className="w-1/6 absolute bottom-60 right-50 z-10"
        src="/src/assets/login.png"
      ></img>
    </div>
  );
};

export default NewPassword;
