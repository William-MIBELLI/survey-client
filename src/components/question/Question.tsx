import React, { type Dispatch, type FC } from "react";
import type { SurveyQuery } from "../../gql/generated";
import IconButton from "../ui/IconButton";
import { Trash2 } from "lucide-react";

export type TQuestion = NonNullable<
    SurveyQuery["currentSurvey"]
  >["questions"]["edges"][number]

interface IProps {
  question: TQuestion;
  setCurrentId: Dispatch<string>;
}


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
