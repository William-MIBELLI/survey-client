import { gql } from "@apollo/client";

export const CREATE_QUESTION = gql`
  mutation CreateQuestion($args: CreateQuestionInput!) {
    createQuestion(args: $args) {
      id
      label
      type
      isMandatory
    }
  }
`;

export const UPDATE_QUESTION = gql`
  mutation UpdateQuestion($args: UpdateQuestionInput!) {
    updateQuestion(args: $args) {
      id
      label
      type
      isMandatory
    }
  }
`;
