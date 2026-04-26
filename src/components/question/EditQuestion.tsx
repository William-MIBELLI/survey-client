import { type FC } from "react";
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
  cancel: () => void;
  isEditionOpen: boolean;
}

const EditQuestion: FC<IProps> = ({ question, cancel, isEditionOpen }) => {

  const [update, { data }] = useMutation<
    UpdateQuestionMutation,
    MutationUpdateQuestionArgs
  >(UPDATE_QUESTION);

  const onEditQuestion = async (data: TQuestionSchema) => {
    console.log('DATA DANS LE SAVE : ', data)
    await update({
      variables: {
        args: {
          ...data,
          id: question.node.id,
        },
      },
      onCompleted: () => {
        cancel();
      },
    });
  };

  return (
    <div>
      <QuestionForm
        key={question?.node.id}
        cancel={cancel}
        question={question}
        submit={onEditQuestion}
        isOpen={isEditionOpen}
        title="Edit Question"
      />
    </div>
  );
};

export default EditQuestion;
