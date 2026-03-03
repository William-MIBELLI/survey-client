import { createContext, useContext, useState } from "react";
import type { Option } from "../gql/generated";

export type TCreateOption = Pick<Option, "label" | "position" | "withArgs">;

const useContextValue = () => {
  const [options, setOptions] = useState<TCreateOption[]>([]);
  const [currentSelectedOption, setCurrentSelectedOption] = useState<number>();

  const onDeleteOption = (position: number) => {
    if (position < 0 || position > options.length) {
      console.error("Unvalid index : ", position);
      return;
    }
    const newOptions = options
      .filter((o) => o.position !== position)
      .map((o, index) => ({ ...o, position: index + 1 }));
    setOptions(newOptions);
  };

  const onUpdateOption = (data: { label: string; withArgs: boolean }) => {
    const updatedOptions = options.map(o => {
      if (o.position === currentSelectedOption) {
        return {...data, position: o.position}
      }
      return o
    })
    setOptions(updatedOptions)
    setCurrentSelectedOption(undefined)
  };

  return {
    options,
    setOptions,
    onDeleteOption,
    currentSelectedOption,
    setCurrentSelectedOption,
    onUpdateOption,
  };
};

type TOptionContext = ReturnType<typeof useContextValue>;

const OptionContext = createContext({} as TOptionContext);

export const OptionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = useContextValue();

  return (
    <OptionContext.Provider value={value}>{children}</OptionContext.Provider>
  );
};

export const useOptionContext = () => useContext(OptionContext);
