import { type Dispatch, type FC } from "react";
import QuestionForm from "./QuestionForm";
import type { TQuestionSchema } from "../../lib/zod";
import { useMutation } from "@apollo/client/react";
import type {
  CreateQuestionMutation,
  MutationCreateQuestionArgs,
  OptionsQuery,
  OptionsQueryVariables
} from "../../gql/generated";
import { CREATE_QUESTION } from "../../lib/mutations/question.mutation";
import { useParams } from "react-router";
import { CURRENT_SURVEY } from "../../lib/queries/survey.query";
import { OPTIONS_FOR_QUESTION } from "../../lib/queries/option.query";

interface IProps {
  setIsCreationOpen: Dispatch<boolean>;
  isCreationOpen: boolean
  totalCount: number
}

const CreateQuestion: FC<IProps> = ({ setIsCreationOpen, isCreationOpen, totalCount }) => {
  const { surveyId } = useParams();

  const [createQuestion, { data, loading, error }] = useMutation<
    CreateQuestionMutation,
    MutationCreateQuestionArgs
  >(CREATE_QUESTION);

  const onCreateQuestion = async (data: TQuestionSchema) => {
    const {deletedOptionIds, ...rest} = data
    createQuestion({
      variables: {
        args: {
          ...rest,
          surveyId: surveyId!,
          position: totalCount+1
        },
      },
      onError: (error) => {
        console.error("ERROR CREATION QUESTION  : ", error.message);
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
      ],
      update: (cache, { data }) => {
        const {options, id} = data?.createQuestion!
         const ref = cache.writeQuery<OptionsQuery, OptionsQueryVariables>({
          query: OPTIONS_FOR_QUESTION,
          data: {
            options: {
              edges: [...options.map(o => {
                return { node: o}
              } )]
            }
          },
          variables: {
            args: {
              filters: {
                questionId: {
                  equals: id
                }
              }
            }
          }
        })
        console.log('REF : ', ref)
      }
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
