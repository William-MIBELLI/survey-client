import OptionList from "../option/OptionList";
import {
  useOptionContext,
  type TCreateOption,
} from "../../contexts/option.context";
import NewOption from "../option/NewOption";

const QuestionOptions = () => {
  const { options } = useOptionContext();

  return (
    <div className="col-span-2 p-3 flex flex-col">
      <h2 className="font-semibold text-purple-400 mb-3">Options</h2>
      <OptionList options={options} />
      <NewOption />
    </div>
  );
};

export default QuestionOptions;
