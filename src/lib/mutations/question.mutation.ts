import { gql } from "@apollo/client";

export const CREATE_QUESTION = gql`
mutation CreateQuestion($args: CreateQuestionInput!) {
  createQuestion(args: $args) {
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

export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($args: DeleteQuestionInput!) {
    deleteQuestion(args: $args) {
      success
      Message
    }
  }
`;
