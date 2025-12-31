import React, { useEffect, useState, type Dispatch, type FC } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import TextArea from "../ui/TextArea";
import Check from "../ui/Check";
import Button from "../ui/Button";
import QuestionOptions from "./QuestionOptions";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionSchema, type TQuestionSchema } from "../../lib/zod";
import { useMutation } from "@apollo/client/react";
import type {
  CreateQuestionMutation,
  MutationCreateQuestionArgs,
  SurveyQuery,
} from "../../gql/generated";
import { CREATE_QUESTION } from "../../lib/mutations/question.mutation";
import { client } from "../../lib/apollo";
import { CURRENT_SURVEY } from "../../lib/queries/survey.query";
import { useParams } from "react-router";

interface IProps {
  setProgress: Dispatch<boolean>
}

const NewQuestion: FC<IProps> = ({ setProgress }) => {
  const { surveyId } = useParams()
  const [optionDisplay, setOptionDisplay] = useState<boolean>(false);
  const [createQuestion, { data, loading, error }] = useMutation<
    CreateQuestionMutation,
    MutationCreateQuestionArgs
  >(CREATE_QUESTION);
  const onSubmitHandler = (data: TQuestionSchema) => {
    // const res = client.readQuery<SurveyQuery>({
    //   query: CURRENT_SURVEY
    // })
    // console.log("RES : ", res)
    createQuestion({
      variables: {
        args: {
          ...data,
          surveyId: surveyId!
        }
      },
      onError: (error) => {
        console.log("ERROR : ", error.message)
      },
      onCompleted: data => {
        console.log("DATA DANS ONCOMPLETED : ", data)
      }
    })
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(questionSchema),
  });
  const type = useWatch({ control, name: "type" });

  useEffect(() => {
    setOptionDisplay(type === "SIMPLE" || type === "MULTIPLE");
  }, [type]);

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
        <Select label="Type" {...register("type")} error={errors.type}>
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
        <Button text="Cancel" type="button" className="col-span-1 bg-red-400" onClick={() => setProgress(false)} />
      </form>
    </div>
  );
};

export default NewQuestion;
