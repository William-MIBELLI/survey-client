import React, { type FC } from "react";
import { BookmarkCheck, Trash2 } from "lucide-react";
import IconButton from "../ui/IconButton";
import {
  useOptionContext,
  type TCreateOption,
} from "../../contexts/option.context";

interface IProps {
  data: TCreateOption;
  onRemove: (position: number) => void
}

const Option: FC<IProps> = ({ data, onRemove }) => {
  const { label, withArgs, position } = data;
  const {  setCurrentSelectedOption } = useOptionContext();


  const onDeleteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    e.preventDefault()
    onRemove(position)
  }

  return (
    <div
      className="bg-blue-300 hover:bg-blue-400  border-black border-2 flex cursor-pointer justify-between items-center px-4 py-1.5"
      onClick={() => setCurrentSelectedOption(position)}
    >
      <div className="flex gap-2">
        <p className="font-semibold">{label}</p>
        {withArgs && (
          <div className="flex items-center">
            <BookmarkCheck size={15} />
            <p className="text-sm">with text</p>
          </div>
        )}
      </div>
      <IconButton className="bg-white" text="" onClick={onDeleteHandler}>
        <Trash2 size={13} />
      </IconButton>
    </div>
  );
};

export default Option;
