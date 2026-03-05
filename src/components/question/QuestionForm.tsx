import { useEffect, useState, type FC } from "react";
import Select from "../ui/Select";
import TextArea from "../ui/TextArea";
import Check from "../ui/Check";
import Button from "../ui/Button";
import QuestionOptions from "./QuestionOptions";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
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

  const methods = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      isMandatory: question?.node.isMandatory || false,
      label: question?.node.label || "",
      type: question?.node.type || QuestionType.Open,
    },
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    getValues,
  } = methods;

  //AFFICHAGE DES OPTIONS
  const type = useWatch({ control, name: "type" });

  useEffect(() => {
    setOptionDisplay(type !== "OPEN");
  }, [type]);

  useEffect(() => {
    console.log("VALUE DANS QUESTION FORM : ", getValues());
  });

  return (
    <FormProvider {...methods}>
      <form
        className="grow bg-white border-4 shadowButton border-black p-4 flex gap-3"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className=" grid grid-cols-2 gap-4 w-1/2 content-center justify-items-stretch">
          <Controller
            control={control}
            name="label"
            render={({ field }) => (
              <TextArea
                label="Label"
                className="col-span-2"
                {...field}
                error={errors.label}
              />
            )}
          />
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select label="Type" {...field} error={errors.type}>
                <option>Select type...</option>
                <option value={"OPEN"}>Open</option>
                <option value={"SIMPLE"}>Simple</option>
                <option value={"MULTIPLE"}>Multiple</option>
              </Select>
            )}
          />
          <Controller
            name="isMandatory"
            control={control}
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <Check
                label="Mandatory"
                className="m-auto"
                checked={value}
                onChange={onChange}
                {...fieldProps}
              />
            )}
          />
          <Button
            text="Save"
            type="submit"
            className="col-span-1 bg-green-400"
          />
          <Button
            text="Cancel"
            type="button"
            className="col-span-1 bg-red-400"
            onClick={cancel}
          />
          <p className="col-span-2 text-red-400 text-sm font-semibold">
            {errors.options?.message}
          </p>
        </div>
        <div className="border-2 border-black ml-3"></div>
        <QuestionOptions />
      </form>
    </FormProvider>
  );
};

export default QuestionForm;
