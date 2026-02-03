import React, { type Dispatch, type FC } from "react";
import type { QuestionEdge, SurveyQuery } from "../../gql/generated";
import IconButton from "../ui/IconButton";
import { Trash2 } from "lucide-react";

interface IProps {
  question: NonNullable<
    SurveyQuery["currentSurvey"]
  >["questions"]["edges"][number];
  setCurrentId: Dispatch<string>;
}
PageRevealEvent;

const Question: FC<IProps> = ({ question, setCurrentId }) => {
  const { node } = question;
  return (
    <div
      className="p-3 border-4 border-black bg-white shadowIconBtn flex cursor-pointer justify-around items-center"
      onClick={() => setCurrentId(node.id)}
    >
      <p className="font-semibold text-orange-500">{node.label}</p>
      <p>{node.type.toLowerCase()}</p>
      <p>{node.isMandatory ? "Mandatory" : "Optionnal"}</p>
      <IconButton text="Delete">
        <Trash2 size={15} />
      </IconButton>
    </div>
  );
};

export default Question;
