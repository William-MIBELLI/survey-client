import React, { useEffect, useState, type Dispatch, type FC } from "react";
import Select from "../ui/Select";
import TextArea from "../ui/TextArea";
import Check from "../ui/Check";
import Button from "../ui/Button";
import QuestionOptions from "./QuestionOptions";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionSchema, type TQuestionSchema } from "../../lib/zod";
import { QuestionType } from "../../gql/generated";
import type { TQuestion } from "./Question";

interface IProps {
  question?: TQuestion;
  cancel: () => void;
  submit: (data: TQuestionSchema) => Promise<void>;
}

const QuestionForm: FC<IProps> = ({ question, cancel, submit }) => {
  const [optionDisplay, setOptionDisplay] = useState<boolean>(false);

  const onSubmitHandler = (data: TQuestionSchema) => {
    submit(data);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      isMandatory: question?.node.isMandatory || false,
      label: question?.node.label || "",
      type: question?.node.type || QuestionType.Open,
    },
  });

  
  //AFFICHAGE DES OPTIONS
  const type = useWatch({ control, name: "type" });

  useEffect(() => {
    setOptionDisplay(type !== "OPEN")
  },[type])


  return (
    <div className="grow bg-white border-4 shadowButton border-black p-4 flex flex-col">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-full grid grid-cols-2 gap-4  content-center justify-items-stretch"
      >
        <TextArea
          label="Label"
          className="col-span-2"
          {...register("label")}
          error={errors.label}
        />
        <Select label="Type" {...register("type")} error={errors.type} >
          <option>Select type...</option>
          <option value={"OPEN"}>Open</option>
          <option value={"SIMPLE"}>Simple</option>
          <option value={"MULTIPLE"}>Multiple</option>
        </Select>
        <Check
          label="Mandatory"
          className="m-auto"
          {...register("isMandatory")}
        />
        {optionDisplay && <QuestionOptions />}
        <Button text="Save" type="submit" className="col-span-1 bg-green-400" />
        <Button
          text="Cancel"
          type="button"
          className="col-span-1 bg-red-400"
          onClick={cancel}
        />
      </form>
    </div>
  );
};

export default QuestionForm;
