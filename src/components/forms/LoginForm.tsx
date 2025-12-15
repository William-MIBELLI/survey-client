import { Link } from "react-router";
import Button from "../ui/Button";
import Input from "../ui/Input";

const LoginForm = () => {
  return (
    <div className="w-1/2 h-1/2 max-w-[500px] bg-white  border-black border-4 m-auto shadowDiv flex flex-col gap-3 p-10 z-10">
      <Input placeholder="example@mail.com" label="Email" type="email" />
      <Input placeholder="password" label="Password" type="password" />
      <Button type="submit" text="Login" className="bg-green-500 mt-8" />
      <div className="text-xs flex justify-around">
        <Link className="hover:font-semibold" to="/resetpassword">
          Forget password ?
        </Link>
        <Link className="hover:font-semibold" to="/signup">
          Create new account
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
