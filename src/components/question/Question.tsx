import { type FC } from "react";
import type {
  DeleteQuestionMutation,
  DeleteQuestionMutationVariables,
  MutationDeleteQuestionArgs,
  SurveyQuery,
  SurveyQueryVariables,
} from "../../gql/generated";
import IconButton from "../ui/IconButton";
import { Trash2 } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import { DELETE_QUESTION } from "../../lib/mutations/question.mutation";
import { CURRENT_SURVEY } from "../../lib/queries/survey.query";
import { useParams } from "react-router";

export type TQuestion = NonNullable<
  SurveyQuery["currentSurvey"]
>["questions"]["edges"][number];

export type TOption = TQuestion["node"]["options"][number]

interface IProps {
  question: TQuestion;
  onQuestionClick: (id: string) => void;
}

const Question: FC<IProps> = ({ question, onQuestionClick }) => {
  const { node } = question;
  const { surveyId } = useParams();
  const [deleteQuestion, { data, loading, error }] = useMutation<
    DeleteQuestionMutation,
    DeleteQuestionMutationVariables
  >(DELETE_QUESTION);

  const onDeleteHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    await deleteQuestion({
      variables: {
        args: {
          id: node.id
        }
      },
      onCompleted: (data) => {
        console.log('DELETE QUESTION COMPLETED : ', data)
      },
      onError: (error) => {
        console.error("ERROR DELETE QUESTION : ", error.message);
      },
      update: (cache, _) => {

        //ON RECUPERE LA QUERY DANS LE CACHE
        const existingData = cache.readQuery<SurveyQuery, SurveyQueryVariables>(
          {
            query: CURRENT_SURVEY,
            variables: {
              surveyId: surveyId!,
              args: {},
              questionArgs: {},
            },
          },
        );

        //ON FILTRE LE TABLEAU DE QUESTION EN ENLEVANT LA QUESTION SUPPRIMEE
        if (
          existingData &&
          existingData.currentSurvey &&
          existingData.currentSurvey.questions
        ) {
          const { edges } = existingData.currentSurvey.questions
          const newEdges = edges.filter(e => e.node.id !== question.node.id)

          //ON REECRIT LA QUERY DANS LE CACHE
          cache.writeQuery<SurveyQuery, SurveyQueryVariables>({
            query: CURRENT_SURVEY,
            data: {
              currentSurvey: {
                ...existingData.currentSurvey,
                questions: {
                  ...existingData.currentSurvey.questions,
                  edges: newEdges,
                }
              }
            },
            variables: {
              surveyId: surveyId!,
              args: {},
              questionArgs: {}
            }
          })
        }
      },
    });
  };

  return (
    <div
      className="p-3 border-4 border-black bg-white shadowIconBtn flex cursor-pointer justify-around items-center"
      onClick={() => onQuestionClick(node.id)}
    >
      <p className="font-semibold text-orange-500">{node.label}</p>
      <p>{node.type.toLowerCase()}</p>
      <p>{node.isMandatory ? "Mandatory" : "Optionnal"}</p>
      <IconButton text="Delete" onClick={onDeleteHandler}>
        <Trash2 size={15} />
      </IconButton>
    </div>
  );
};

export default Question;
