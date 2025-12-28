import { createContext, useContext, useState, type ReactNode } from "react";
import type { Survey } from "../gql/generated"
  
type TSurveyContext = {
  survey: Survey | null
} 

const surveyContext = createContext<TSurveyContext>({} as TSurveyContext);

export const SurveyContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [survey, setSurvey] = useState<Survey | null>(null);
  const value = {
    survey
  }
  return <surveyContext.Provider value={value}>{children}</surveyContext.Provider>;
};

export const useSurveyContext = () => useContext(surveyContext);
