import { type FC } from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading?: boolean
}

const Button: FC<IProps> = ({ text, className, loading = false, ...props }) => {
  return (
    <button
      className={`border-4 border-black shadowP p-2 shadowButton cursor-pointer  font-semibold ${
        className ?? ""
      }`}
      {...props}
      disabled={loading}
    >
      {
        loading ? "..." : text
      }
    </button>
  );
};

export default Button;
