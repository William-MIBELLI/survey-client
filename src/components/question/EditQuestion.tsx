import React, { type Dispatch, type FC } from "react";
import type { TQuestion } from "./Question";
import QuestionForm from "./QuestionForm";
import type { TQuestionSchema } from "../../lib/zod";
import { useMutation } from "@apollo/client/react";
import { UPDATE_QUESTION } from "../../lib/mutations/question.mutation";
import type {
  MutationUpdateQuestionArgs,
  UpdateQuestionMutation,
} from "../../gql/generated";

interface IProps {
  question: TQuestion;
  setCurrentQuestionId: Dispatch<string | undefined>;
}

const EditQuestion: FC<IProps> = ({ question, setCurrentQuestionId }) => {
  const cancel = () => {
    setCurrentQuestionId(undefined);
  };

  const [update, { data }] = useMutation<
    UpdateQuestionMutation,
    MutationUpdateQuestionArgs
  >(UPDATE_QUESTION);

  const onEditQuestion = async (data: TQuestionSchema) => {
    await update({
      variables: {
        args: {
          ...data,
          id: question.node.id
        }
      },
      onCompleted: () => {
        setCurrentQuestionId(undefined)
      }
    })
  };

  return (
    <div>
      <QuestionForm
        cancel={cancel}
        question={question}
        submit={onEditQuestion}
      />
    </div>
  );
};

export default EditQuestion;
