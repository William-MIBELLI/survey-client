import React, { forwardRef, type FC } from "react";
import type { FieldError } from "react-hook-form";

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: FieldError
}

const TextArea: FC<IProps> = forwardRef<HTMLTextAreaElement, IProps>((props, ref) => {
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
          <textarea
            ref={ref}
            {...props}
            className=" grow outline-none bg-transparent resize-none"
          />
        </div>
        {props.error && (
          <p className="errorInputMessage">{props.error.message}</p>
        )}
      </div>
  );
});

export default TextArea;
