import React, { type FC, type ReactNode } from "react";
import type { FieldError } from "react-hook-form";

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: ReactNode;
  error?: FieldError;
}

const Select: FC<IProps> = ({
  label,
  children,
  error,
  className,
  ...props
}) => {
  return (
    <div className="grow  flex flex-col">
      <label className="text-sm font-semibold italic">{label}</label>
      <select
        className={`border-4 border-black shadowButton outline-none py-1 px-2 font-semibold ${
          error ? "bg-red-300" : "bg-blue-100"
        }`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="errorInputMessage">{error.message}</p>}
    </div>
  );
};

export default Select;
