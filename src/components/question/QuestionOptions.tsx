import OptionList from "../option/OptionList";

import NewOption from "../option/NewOption";
import { useFieldArray, useFormContext } from "react-hook-form";
import { type TQuestionSchema } from "../../lib/zod";
import type { Dispatch, FC, SetStateAction } from "react";
import type { TCreateOption } from "../../types/types";

interface IProps {
  handleDeletedOptionIds: (id: string) => void
}

const QuestionOptions: FC<IProps> = ({ handleDeletedOptionIds }) => {
  const { control, getValues } = useFormContext<TQuestionSchema>();

  const { fields, append, remove, update } = useFieldArray({
    name: "options",
    control,
  });

  const onAppend = (data: TCreateOption) => {
    append(data);
  };

  const onRemove = (position: number, id?: string) => {
    if (id) {
      handleDeletedOptionIds(id)
    }
    remove(position);
  };

  const onUpdate = (index: number, data: TCreateOption) => {
    console.log('ON UPDATE : ', data);
    update(index , data);
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
