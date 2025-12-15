
import LoginForm from "../components/forms/LoginForm";

const Login = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex flex-col gap-7">
        <h1 className="titleFont text-9xl my-3">
          Login
        </h1>
        <p className="font-semibold ml-30">You need to be logged-in for create survey, receives invitation for exclusive surveys, etc...</p>
      </div>
      <LoginForm/>
      <img className="w-1/6 absolute bottom-60 right-50 z-10" src="src/assets/login.png"></img>
    </div>
  );
};

export default Login;
