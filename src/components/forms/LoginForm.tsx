import { Link, useNavigate } from "react-router";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useMutation } from "@apollo/client/react";
import type { MutationSigninArgs, User } from "../../gql/graphql";
import { signInSchema, type SignInSchema } from "../../lib/zod";
import { SIGNIN } from "../../lib/mutations/auth.mutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "../../contexts/auth.context";
import type { SigninMutation } from "../../gql/generated";
import { ME } from "../../lib/queries/auth.query";
import Form from "./Form";

const LoginForm = () => {
  const [signin, { data, loading, error }] = useMutation<
    SigninMutation,
    MutationSigninArgs
  >(SIGNIN);

  const {} = useAuthContext();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    reValidateMode: "onChange",
  });

  const onSubmit = (data: SignInSchema) => {
    const { email, password } = data;
    signin({
      variables: {
        args: {
          email,
          password,
        },
      },
      onCompleted: (data) => {
        console.log("DATA DANS ONCOMPLETED : ", data);
        navigate("/");
      },
      update: (cache, { data }) => {
        if (!data?.user) return;
        console.log("UPDATE : ", data.user)
        cache.writeQuery({
          query: ME,
          data: {
            me: data.user,
          },
        });
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="example@mail.com"
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email}
      />
      <Input
        placeholder="password"
        label="Password"
        type="password"
        {...register("password")}
        error={errors.password}
      />
      <Button
        type="submit"
        text="Login"
        loading={loading}
        className="bg-green-500 mt-8"
      />
      <div className="text-xs flex justify-around">
        <Link className="hover:font-semibold" to="/resetpassword">
          Forget password ?
        </Link>
        <Link className="hover:font-semibold" to="/signup">
          Create new account
        </Link>
      </div>
      {error && <p className="errorInputMessage">{error.message}</p>}
    </Form>
  );
};

export default LoginForm;
