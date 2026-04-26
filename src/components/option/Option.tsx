import React, { type Dispatch, type FC } from "react";
import { BookmarkCheck, Trash2 } from "lucide-react";
import IconButton from "../ui/IconButton";
import type { TOptionField } from "./OptionList";

interface IProps {
  data: TOptionField;
  onRemove: (position: number, id?: string) => void;
  position: number;
  setCurrentSelectedPosition: Dispatch<number>;
}

const Option: FC<IProps> = ({
  data,
  onRemove,
  position,
  setCurrentSelectedPosition,
}) => {
  const { label, withArgs, id, optionId } = data;
  // const {  setCurrentSelectedOption } = useOptionContext();

  const onDeleteHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    e.preventDefault();
    onRemove(position, optionId);
  };

  return (
    <div
      className="bg-blue-300 hover:bg-blue-400  border-black border-2 flex cursor-pointer justify-between items-center px-4 py-1.5"
      onClick={() => setCurrentSelectedPosition(position)}
    >
      <div className="flex gap-2">
        <p className="font-semibold">{label}</p>
      </div>
      <div className="flex gap-2 items-center">
        {withArgs && (
          <div className="flex items-center bg-white px-1 color-black  -rotate-7">
            <BookmarkCheck size={15} />
            <p className="text-sm">with text</p>
          </div>
        )}
        <IconButton className="bg-white" text="" onClick={onDeleteHandler}>
          <Trash2 size={13} />
        </IconButton>
      </div>
    </div>
  );
};

export default Option;
