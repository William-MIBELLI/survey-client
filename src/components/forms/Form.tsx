import React, { type FC, type ReactNode } from "react";

interface IProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

const Form: FC<IProps> = ({ children, ...props }) => {
  return (
    <form
      onSubmit={props.onSubmit}
      className="w-1/2 h-auto min-h-[400px] max-w-[500px] bg-white  border-black border-4 m-auto shadowDiv flex flex-col gap-2 p-10 z-10"
    >
      {children}
    </form>
  );
};

export default Form;
