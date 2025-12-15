import { type FC } from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button: FC<IProps> = ({ text, className, ...props }) => {
  return (
    <button
      className={`border-4 border-black shadowP p-2 shadowButton cursor-pointer  font-semibold ${
        className ?? ""
      }`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
