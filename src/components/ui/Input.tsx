import { Eye, EyeOff } from "lucide-react";
import React, { forwardRef, useState, type FC } from "react";
import type { FieldError } from "react-hook-form";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const Input: FC<IProps> = forwardRef<HTMLInputElement, IProps>(
  ({ type, ...props }, ref) => {
    const [pType, setPType] = useState(type);
    const Icon = pType === "password" ? Eye: EyeOff;

    const onMouseDownHandler = () => {
      setPType("text");
    };

    const onMouseUpHandler = () => {
      setPType("password");
    };

    return (
      <div className="flex flex-col">
        <label className="text-sm font-semibold italic" htmlFor={props.name}>
          {props.label}
        </label>
        <div
          className={`border-4 border-black ${
            props.error ? "bg-red-300" : "bg-blue-100"
          } shadowInput px-2 py-1 outline-none flex justify-between items-center`}
        >
          <input
            ref={ref}
            {...props}
            className=" grow outline-none bg-transparent"
            type={pType}
          />
          {type === "password" && (
            <button
              type="button"
              onMouseDown={onMouseDownHandler}
              onMouseUp={onMouseUpHandler}
              onMouseLeave={onMouseUpHandler}
            >
              <Icon size={20} className="cursor-pointer" />
            </button>
          )}
        </div>
        {props.error && (
          <p className="errorInputMessage">{props.error.message}</p>
        )}
      </div>
    );
  }
);

export default Input;
