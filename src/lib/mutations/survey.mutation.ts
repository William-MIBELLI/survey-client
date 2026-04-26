import { gql } from "@apollo/client";

export const CREATE_SURVEY = gql`
  mutation CreateSurvey($args: CreateSurveyInput!) {
    createSurvey(args: $args) {
      id
      name
      description
      isPublic
      startDate
      endDate
    }
  }
`;

export const DELETE_SURVEY = gql`
mutation DeleteSurvey($args: DeleteSurveyInput!) {
  deleteSurvey(args: $args) {
    success
    Message
  }
}
`;
