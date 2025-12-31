import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router";
import type { SurveyQuery, SurveyQueryVariables } from "../gql/generated";
import { CURRENT_SURVEY } from "../lib/queries/survey.query";
import CurrentSurveyResume from "../components/dashboard/CurrentSurveyResume";
import QuestionList from "../components/dashboard/QuestionList";

const Survey = () => {
  const { surveyId } = useParams();

  const { data, loading, error } = useQuery<SurveyQuery, SurveyQueryVariables>(
    CURRENT_SURVEY,
    {
      variables: {
        surveyId: surveyId ?? "",
        args: {},
        questionArgs: {},
      },
    }
  );

  if (loading) {
    return <div className="m-auto font-semibold text-2xl">Loading...</div>;
  }

  if (error) {
    return (
      <div className="m-auto font-semibold text-2xl text-red-400">
        Error : {error.message}
      </div>
    );
  }

  if (data && data.currentSurvey) {
    const { currentSurvey } = data;
    const { questions } = currentSurvey
    return (
      <div className="bg-amber-100 h-full w-full flex flex-col gap-4 p-8">
        <CurrentSurveyResume currentSurvey={currentSurvey} candidates={currentSurvey.candidates.totalCount} />
        <QuestionList list={questions}/>
      </div>
    );
  }
};

export default Survey;
