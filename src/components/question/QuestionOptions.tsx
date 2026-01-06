import React, { useState } from "react";
import type { Option } from "../../gql/generated";
import IconButton from "../ui/IconButton";
import { Plus } from "lucide-react";
import Input from "../ui/Input";
import Check from "../ui/Check";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOptionSchema, type TCreateOptionSchema } from "../../lib/zod";

type TCreateOption = Pick<Option, "label" | "position" | "withArgs">;

const QuestionOptions = () => {
  const [options, setOptions] = useState<TCreateOption[]>([]);
  const [isAddingOption, setIsAddingOption] = useState<boolean>(true);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createOptionSchema),
  });

  const onSubmitHandler = (data: TCreateOptionSchema) => {
    console.log("SUBMIT OPTION")
    const option: TCreateOption = {
      ...data,
      position: options.length + 1,
    };
    setOptions((prev) => [...prev, option]);
  };

  return (
    <div className="col-span-2 border-2 bg-yellow-300 border-black p-3 flex flex-col shadowButton">
      <li className="flex flex-col">
        {options.length > 0 &&
          options.map((option, index) => <ul key={index}>{option.label}</ul>)}
      </li>
      {isAddingOption && (
        <div
          onSubmit={handleSubmit(onSubmitHandler)}
          className="flex gap-8 my-4  "
        >
          <Input label="Option label" className="grow" />
          <Check label="With args?" />
          <Button text="Add" className="grow" type="submit" />
        </div>
      )}
      {/* <IconButton type='button' text='Add option' withText={true} className='bg-blue-400' onClick={()=> setIsAddingOption(true)}>
        <Plus size={15}/>
      </IconButton> */}
    </div>
  );
};

export default QuestionOptions;
