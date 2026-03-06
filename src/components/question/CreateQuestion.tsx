import { type Dispatch, type FC } from "react";
import QuestionForm from "./QuestionForm";
import type { TQuestionSchema } from "../../lib/zod";
import { useMutation } from "@apollo/client/react";
import type {
  CreateQuestionMutation,
  MutationCreateQuestionArgs
} from "../../gql/generated";
import { CREATE_QUESTION } from "../../lib/mutations/question.mutation";
import { useParams } from "react-router";
import { CURRENT_SURVEY } from "../../lib/queries/survey.query";

interface IProps {
  setIsCreationOpen: Dispatch<boolean>;
  isCreationOpen: boolean
}

const CreateQuestion: FC<IProps> = ({ setIsCreationOpen, isCreationOpen }) => {
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
        setIsCreationOpen(false);
      },
      refetchQueries: [
        {
          query: CURRENT_SURVEY,
          variables: {
            surveyId: surveyId!,
            args: {},
            questionArgs: {}
          }
        }
      ]
    });
  };

  return (
    <div>
      <QuestionForm
        isOpen={isCreationOpen}
        cancel={() => setIsCreationOpen(false)}
        submit={onCreateQuestion}
        title="Create Question"
      />
    </div>
  );
};

export default CreateQuestion;
