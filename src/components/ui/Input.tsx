import React, { forwardRef, type FC } from "react";
import type { FieldError } from "react-hook-form";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const Input: FC<IProps> = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  return (
    <div className="flex flex-col">
      <label className="text-xs" htmlFor={props.name}>
        {props.label}
      </label>
      <input
        ref={ref}
        className="border-4 border-black bg-blue-100 shadowInput px-2 py-1 outline-none"
        {...props}
      />
      {props.error && (
        <p className="errorInputMessage">
          {props.error.message}
        </p>
      )}
    </div>
  );
});

export default Input;
