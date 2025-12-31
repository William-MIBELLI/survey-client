import { useState, type FC, type ReactNode } from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  text: string;
  withText?: boolean
}

const IconButton: FC<IProps> = ({ children, text ,className, withText = false,  ...props}) => {
  const [display, setDisplay] = useState<boolean>(withText);
  const onMouseEnterHandler = () => setDisplay(true);
  const onMouseLeaveHandler = () => setDisplay(withText);
  return (
    <button
    className={`p-1 border-3 shadowIconBtn border-black cursor-pointer flex gap-2 items-center ${className  ?? ""}`}
    onMouseEnter={onMouseEnterHandler}
    onMouseLeave={onMouseLeaveHandler}
    {...props}
    >
      {children}
      <p className={`text-xs font-semibold  ${display ? "flex" : "hidden "}`}>{text}</p>
    </button>
  );
};

export default IconButton;
