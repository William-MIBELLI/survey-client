import  { useEffect, useState, type FC } from "react";
import type {  SurveyQuery } from "../../gql/generated";
import Button from "../ui/Button";
import Question from "./Question";
import EditQuestion from "./EditQuestion";
import CreateQuestion from "./CreateQuestion";

export type TList = NonNullable<SurveyQuery["currentSurvey"]>["questions"]

interface IProps {
  list: TList;
}

const QuestionList: FC<IProps> = ({ list }) => {
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [currentQuestionId, setCurrentQuestionId] = useState<
    string | undefined
  >(undefined);
  const { edges, totalCount } = list;

  const addQuestion = () => {
    setIsCreating(true);
  };

  return (
    <div className="w-full flex flex-col items-center  grow">
      <h2 className="text-center text-3xl my-4 bg-white p-1 w-fit">
        Questions
      </h2>
      <div className="flex w-full grow">
        <div className="w-4/5 flex flex-col gap-3">
          {isCreating && (
            <CreateQuestion setIsCreating={setIsCreating}/>
          )}
          {!edges.length ? (
            <div className="my-4 w-full bg-white text-center font-semibold shadowButton border-2 border-black">
              No questions 🥺
            </div>
          ) : (
            edges.map((v) =>
              v.node.id === currentQuestionId ? (
                <EditQuestion
                  question={v}
                  setCurrentQuestionId={setCurrentQuestionId}
                />
              ) : (
                <Question
                  key={v.cursor}
                  question={v}
                  setCurrentId={setCurrentQuestionId}
                />
              ),
            )
          )}
        </div>
        <div className=" grow flex flex-col justify-center ml-6 pl-6 border-l-4 border-black my-auto">
          <Button
            loading={isCreating}
            text="Add"
            onClick={addQuestion}
            className="bg-green-400"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
