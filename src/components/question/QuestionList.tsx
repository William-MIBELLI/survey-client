import { useState, type FC } from "react";
import type { SurveyQuery, SurveyQueryVariables } from "../../gql/generated";
import Button from "../ui/Button";
import Question, { type TQuestion } from "./Question";
import EditQuestion from "./EditQuestion";
import CreateQuestion from "./CreateQuestion";
import { client } from "../../lib/apollo";
import { CURRENT_SURVEY } from "../../lib/queries/survey.query";

export type TList = NonNullable<SurveyQuery["currentSurvey"]>["questions"];

interface IProps {
  surveyId: string;
}

const QuestionList: FC<IProps> = ({ surveyId }) => {

  const [currentEditingQuestion, setcurrentEditingQuestion] =
    useState<TQuestion>();
  const [isCreationOpen, setIsCreationOpen] = useState<boolean>(false);
  const [isEditionOpen, setIsEditionOpen] = useState<boolean>(false);

  //RECUPERATION DE LA LISTE DES QUESTION DANS LE CACHE
  const data = client.readQuery<SurveyQuery, SurveyQueryVariables>({
    query: CURRENT_SURVEY,
    variables: {
      surveyId,
      args: {},
      questionArgs: {},
    },
  });
  const { edges, totalCount } = data?.currentSurvey?.questions!;


  const onQuestionClick = (id: string) => {
    const currentQuestion = data?.currentSurvey?.questions.edges.find(
      (q) => q.node.id === id,
    );
    if (!currentQuestion?.node) {
      console.error("No question to editing with this id. ", id);
      return;
    }
    setcurrentEditingQuestion(currentQuestion);
    setIsEditionOpen(true);
  };

  const onCancelEditing = () => {
    setcurrentEditingQuestion(undefined);
    setIsEditionOpen(false);
  };

  return (
    <div className="w-full flex flex-col items-center  grow">
      <h2 className="text-center text-3xl my-4 bg-white p-1 w-fit">
        Questions
      </h2>

      <div className="flex w-full grow">
        <div className="w-4/5 flex flex-col gap-3">
          <CreateQuestion
            setIsCreationOpen={setIsCreationOpen}
            isCreationOpen={isCreationOpen}
            totalCount={totalCount}
          />
          <EditQuestion
            question={currentEditingQuestion!}
            cancel={onCancelEditing}
            isEditionOpen={isEditionOpen}
          />
          {!edges.length ? (
            <div className="my-4 w-full bg-white text-center font-semibold shadowButton border-2 border-black">
              No questions 🥺
            </div>
          ) : (
            edges.map((v) => (
              <Question
                key={v.cursor}
                question={v}
                onQuestionClick={onQuestionClick}
              />
            ))
          )}
        </div>

        <div className=" grow flex flex-col justify-center ml-6 pl-6 border-l-4 border-black my-auto">
          <Button
            loading={isCreationOpen}
            text="Add"
            onClick={() => setIsCreationOpen(true)}
            className="bg-green-400"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
