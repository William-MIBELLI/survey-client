import { gql } from "@apollo/client";

export const USER_SURVEYS = gql`
  query Surveys(
    $args: SurveyFilterInput!
    $candidatesArgs2: UserFilterInput!
    $questionArgs: QuestionFilterInput!
  ) {
    surveys(args: $args) {
      edges {
        node {
          id
          name
          isPublic
          createdAt
          candidates(args: $candidatesArgs2) {
            totalCount
          }
          questions(questionArgs: $questionArgs) {
            totalCount
          }
          startDate
          endDate
        }
        cursor
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const CURRENT_SURVEY = gql`
query Survey($surveyId: UUID!, $args: UserFilterInput!, $questionArgs: QuestionFilterInput!) {
  currentSurvey: survey(id: $surveyId) {
    id
    name
    description
    isPublic
    startDate
    endDate
    candidates(args: $args) {
      totalCount
    }
    questions(questionArgs: $questionArgs) {
      totalCount
      edges {
        cursor
        node {
          id
          label
          type
          isMandatory
          options {
            id
            position
            label
            withArgs
          }
        }
      }
    }
  }
}
`;
