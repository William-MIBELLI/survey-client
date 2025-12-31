import React, { useState, type FC } from "react";
import type { QuestionConnection, SurveyQuery } from "../../gql/generated";
import Button from "../ui/Button";
import NewQuestion from "../question/NewQuestion";

interface IProps {
  list: NonNullable<SurveyQuery["currentSurvey"]>["questions"];
}

const QuestionList: FC<IProps> = ({ list }) => {
  const [onProgress, setOnprogress] = useState<boolean>(false);
  const { edges, totalCount } = list;

  const addQuestion = () => {
    setOnprogress(true);
  };

  return (
    <div className="w-full  grow">
      <h2 className="text-center text-3xl my-4">Questions</h2>
      <div className="flex w-full grow ">
        <div className="w-4/5">
          {
            onProgress && <NewQuestion setProgress={setOnprogress}/>
          }
          {!edges.length ? (
            <div className="my-4 w-full bg-white text-center font-semibold shadowButton border-2 border-black">No questions 🥺</div>
          ) : (
            edges.map((v) => <div>{v.node.label}</div>)
          )}
        </div>
        <div className=" grow flex flex-col justify-center ml-6 pl-6 border-l-4 border-black my-auto">
          <Button loading={onProgress} text="Add" onClick={addQuestion} className="bg-green-400" />
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
