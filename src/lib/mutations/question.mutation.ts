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
