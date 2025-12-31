import { Pencil, Users, Trash2 } from "lucide-react";
import React, { type FC } from "react";
import IconButton from "../ui/IconButton";
import DateSlot from "./DateSlot";
import type { Survey, SurveyQuery } from "../../gql/generated";

interface IProps {
  currentSurvey: NonNullable<SurveyQuery["currentSurvey"]>
  candidates: number
}


const CurrentSurveyResume: FC<IProps> = ({ currentSurvey, candidates }) => {
  return (
    <div className="bg-white shadowDiv border-4 border-black p-3 flex flex-col gap-3">
      <div className="flex justify-between">
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl text-purple-500">{currentSurvey.name}</h2>
            <div>
              <p className="font-bold bg-amber-400 w-fit pr-3 -rotate-3">Description</p>
              <p className="text-sm">{currentSurvey.description}</p>
            </div>
          </div>
          <div>
            <DateSlot
              start={currentSurvey.startDate ?? undefined}
              end={currentSurvey.endDate ?? undefined}
            />
            <div className="flex gap-1 text-sm">
              <p className="font-semibold">Candidates :</p>
              <p>{candidates}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 pl-5 ml-5 h-full border-l-4 border-black">
          <IconButton text="edit" withText={true} className="bg-blue-300">
            <Pencil size={15} />
          </IconButton>
          <IconButton
            text="Candidates"
            withText={true}
            className="bg-fuchsia-400"
          >
            <Users size={15} />
          </IconButton>
          <IconButton text="Delete" withText={true} className="bg-red-400">
            <Trash2 size={15} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default CurrentSurveyResume;
