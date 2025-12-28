import React, { useState } from "react";
import Form from "../components/forms/Form";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { askResetPassword, type TAskResetPassword } from "../lib/zod";
import { useMutation } from "@apollo/client/react";
import type { AskResetPasswordMutation , MutationAskResetPasswordArgs} from "../gql/generated";
import { ASK_RESET_PASSWORD } from "../lib/mutations/auth.mutation";

const AskResetPassword = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(askResetPassword),
  });
  const [reset, { loading, data, error }] = useMutation<
    AskResetPasswordMutation,
    MutationAskResetPasswordArgs
  >(ASK_RESET_PASSWORD);

  const onSubmitHandler = (data: TAskResetPassword) => {
    reset({
      variables: {
        email: data.email,
      },
      onCompleted: (data) => {
        console.log("DATA DANS ONCOMPLETED : ", data)
        if (data.askResetPassword.success) {
          setSuccess(true);
        }
      },
    });
  };

  return (
    <div className="flex flex-col w-full h-full bg-teal-300 items-center justify-center">
      <div className="flex flex-col gap-7">
        <h1 className="titleFont text-9xl my-3">Password lost ?</h1>
        <p className="font-semibold ml-80 bg-white p-1 text-center w-fit">
          Can't retrieve your password 🥺? Don't worry, you're on the right
          place.
        </p>
      </div>
      <Form onSubmit={handleSubmit(onSubmitHandler)}>
        {!success ? (
          <>
            <div className="flex flex-col gap-7 h-full justify-center">
              <p className="font-semibold text-center italic">
                Just type the email address associated with your account, and
                we send you a reset link.
              </p>
              <Input
                label="Email"
                type="email"
                {...register("email")}
                error={errors.email}
              />
              <Button
                type="submit"
                text="Send mail"
                className="bg-green-400"
                loading={loading}
              />
            </div>
            {error && <p className="errorInputMessage">{error.message}</p>}
          </>
        ) : (
            <div className="flex flex-col justify-center text-center h-full gap-3">
              <p className="font-bold text-lg text-orange-500">All good 👍</p>
              <hr className="border-2 border-black"/>
              <p className="font-semibold text-center">If an address email match, an email was emited with a refresh link.</p>
              <p className="font-semibold text-center">The link is active for 15 minutes.</p>
          </div>
        )}
      </Form>
      <img
        className="w-1/6 absolute bottom-60 right-50 z-10"
        src="/src/assets/login.png"
      ></img>
    </div>
  );
};

export default AskResetPassword;
