import React, { useState } from "react";
import IconButton from "../ui/IconButton";
import { Plus } from "lucide-react";
import Input from "../ui/Input";
import Check from "../ui/Check";
import Button from "../ui/Button";
import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOptionSchema, type TCreateOptionSchema } from "../../lib/zod";
import OptionList from "../option/OptionList";
import { useOptionContext, type TCreateOption } from "../../contexts/option.context";


const QuestionOptions = () => {
  const { options, setOptions} = useOptionContext()
  const [displayError, setDisplayError] = useState<boolean>(false);
  const [label, setLabel] = useState<string>();
  const [withArgs, setWithArgs] = useState<boolean>(false);

  const onCreateOption = () => {
    const { success, error, data} = createOptionSchema.safeParse({
      label, withArgs
    })
    if (error) {
      setDisplayError(true)
      return
    }
    if (success) {
      const newOption: TCreateOption = { ...data, position: options.length + 1 }
      setOptions([...options, newOption])
      setDisplayError(false)
      setLabel("")
      setWithArgs(false)
      return
    }
  };

  return (
    <div className="col-span-2 border-2 bg-yellow-300 border-black p-3 flex flex-col shadowButton">
      <OptionList options={options}/>
      <div className="flex gap-8 my-4">
        <Input
          label="Option label"
          name="label"
          className="grow"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          error={
            !displayError
              ? undefined
              : ({ message: "Label is required" } as FieldError)
          }
        />

        <Check
          label="With args?"
          checked={withArgs}
          onChange={(e) => setWithArgs(e.target.checked)}
        />
        <Button
          text="Add"
          className="grow"
          type="button"
          onClick={onCreateOption}
        />
      </div>
    </div>
  );
};

export default QuestionOptions;
