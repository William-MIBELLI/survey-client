import React, { type Dispatch, type FC } from "react";
import QuestionForm from "./QuestionForm";
import type { TQuestionSchema } from "../../lib/zod";
import { useMutation } from "@apollo/client/react";
import type {
  CreateQuestionMutation,
  MutationCreateQuestionArgs,
} from "../../gql/generated";
import { CREATE_QUESTION } from "../../lib/mutations/question.mutation";
import { useParams } from "react-router";

interface IProps {
  setIsCreating: Dispatch<boolean>;
}

const CreateQuestion: FC<IProps> = ({ setIsCreating }) => {
  const { surveyId } = useParams();

  const [createQuestion, { data, loading, error }] = useMutation<
    CreateQuestionMutation,
    MutationCreateQuestionArgs
  >(CREATE_QUESTION);

  const onCreateQuestion = async (data: TQuestionSchema) => {
    createQuestion({
      variables: {
        args: {
          ...data,
          surveyId: surveyId!,
        },
      },
      onError: (error) => {
        console.log("ERROR : ", error.message);
      },
      onCompleted: (data) => {
        console.log("DATA DANS ONCOMPLETED : ", data);
        setIsCreating(false)
      },
    });
  };

  return (
    <div>
      <QuestionForm
        cancel={() => setIsCreating(false)}
        submit={onCreateQuestion}
      />
    </div>
  );
};

export default CreateQuestion;
