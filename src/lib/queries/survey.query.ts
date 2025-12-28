import { gql } from "@apollo/client";

export const USER_SURVEYS = gql`
query Surveys($args: SurveyFilterInput!, $candidatesArgs2: UserFilterInput!, $questionArgs: QuestionFilterInput!) {
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
