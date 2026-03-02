import { createContext, useContext, useState } from "react";
import type { Option } from "../gql/generated";


export type TCreateOption = Pick<Option, "label" | "position" | "withArgs">;

const useContextValue = () => {
  const [options, setOptions] = useState<TCreateOption[]>([]);

  const onDeleteOption = (position: number) => {
    console.log('POSITION DANS LE DELETE : ', position)
    if (position < 0 || position > options.length) {
      console.error('Unvalid index : ', position)
      return
    }
    const newOptions = options.filter(o => o.position !== position)
    console.log(newOptions, options)
    setOptions(newOptions)
  }
  
  return {
    options,
    setOptions,
    onDeleteOption
  }
}

type TOptionContext = ReturnType<typeof useContextValue>

const OptionContext = createContext({} as TOptionContext);

export const OptionContextProvider = ({ children }: { children: React.ReactNode }) => {

  const value = useContextValue()
  
  return (
    <OptionContext.Provider value={value}>
      {children}
    </OptionContext.Provider>
  )
};

export const useOptionContext = () => useContext(OptionContext)
