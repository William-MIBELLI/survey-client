import OptionList from "../option/OptionList";
import {
  useOptionContext,
  type TCreateOption,
} from "../../contexts/option.context";
import NewOption from "../option/NewOption";
import { useFieldArray, useFormContext } from "react-hook-form";
import { type TQuestionSchema } from "../../lib/zod";

const QuestionOptions = () => {
  const { control, getValues } = useFormContext<TQuestionSchema>();

  const { fields, append, remove, update } = useFieldArray({
    name: "options",
    control,
  });

  const onAppend = (data: TCreateOption) => {
    append(data);
  };

  const onRemove = (position: number) => {
    remove(position - 1);
  };

  const onUpdate = (data: TCreateOption) => {
    update(data.position -1 , data);
  };

  return (
    <div className="col-span-2 p-3 flex flex-col gap-2 grow">
      <h2 className="font-semibold text-purple-400 mb-3">Options</h2>

      <OptionList options={fields} onRemove={onRemove} onUpdate={onUpdate} />
      <div className="border-2 border-black min-h-1 w-full my-2"></div>
      <NewOption onAppend={onAppend} fieldsLength={fields.length} />
    </div>
  );
};

export default QuestionOptions;
