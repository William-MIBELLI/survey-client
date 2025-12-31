import { useMutation, useQuery } from "@apollo/client/react";
import React from "react";
import type {
  DeleteSurveyMutation,
  DeleteSurveyMutationVariables,
  MutationDeleteSurveyArgs,
  QuerySurveysArgs,
  SurveysQuery,
  SurveysQueryVariables,
} from "../gql/generated";
import { USER_SURVEYS } from "../lib/queries/survey.query";
import { useAuthContext } from "../contexts/auth.context";
import {
  ChartPie,
  Pencil,
  SlidersVertical,
  Trash2,
  UserPlus,
} from "lucide-react";
import IconButton from "../components/ui/IconButton";
import { isSurveyActive } from "../lib/utils";
import { DELETE_SURVEY } from "../lib/mutations/survey.mutation";
import { Navigate, useNavigate } from "react-router";

const MySurveys = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate()
  const { data, loading, error, refetch } = useQuery<
    SurveysQuery,
    SurveysQueryVariables
  >(USER_SURVEYS, {
    variables: {
      args: {
        filters: {
          owner: {
            id: user?.id,
          },
        },
        pagination: {
          last: 20,
        },
      },
      candidatesArgs2: {},
      questionArgs: {},
    },
  });

  const [deleteSurvey, { loading: deleteLoading }] = useMutation<
    DeleteSurveyMutation,
    DeleteSurveyMutationVariables
  >(DELETE_SURVEY);

  const onDeleteSurvey = (id: string) => {
    console.log("DELETE SURVEY : ", id);
    deleteSurvey({
      variables: {
        id,
      },
      onCompleted: (data) => {
        if (data.deleteSurvey.success) {
          refetch();
        }
      },
      onError: (error) => {
        console.log("ERROR DELETE : ", error?.message);
      },
    });
  };

  if (loading) {
    return <div>Loading surveys...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4 items-center my-5 w-3/4 mx-auto">
      {data &&
        data.surveys.edges.map((survey) => (
          <div
            key={survey.cursor}
            className="border-4 border-black shadowButton p-3 w-full flex items-start justify-between bg-white"
          >
            <div className="flex items-start w-1/3 justify-between">
              <div className="flex flex-col">
                <p className="font-semibold italic">{survey.node.name}</p>
                <p className="text-xs">
                  {`${survey.node.candidates.totalCount} candidates`}
                </p>
              </div>
              {isSurveyActive(
                survey.node.startDate ?? undefined,
                survey.node.endDate ?? undefined
              ) ? (
                <div className="flex items-center gap-1 italic">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <p>Active</p>
                </div>
              ) : (
                <div className="flex items-center gap-1 italic">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <p>Closed</p>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <IconButton text="Stats" className="bg-green-400">
                <ChartPie size={15} />
              </IconButton>
              <IconButton text="Params" className="bg-blue-300">
                <SlidersVertical size={15} />
              </IconButton>
              <IconButton text="Candidates" className="bg-purple-400">
                <UserPlus size={15} />
              </IconButton>
              <IconButton text="Edit" className="bg-orange-400" onClick={() => navigate(`/dashboard/survey/${survey.node.id}`)}>
                <Pencil size={15} />
              </IconButton>
              <IconButton
                text="Delete"
                className="bg-red-400"
                onClick={() => onDeleteSurvey(survey.node.id)}
              >
                <Trash2 size={15} />
              </IconButton>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MySurveys;
