import { gql } from "@apollo/client";

export const OPTIONS_FOR_QUESTION = gql`
  query Options($args: OptionsFilterInput!) {
    options(args: $args) {
      edges {
        node {
          id
          position
          label
          withArgs
        }
      }
    }
  }
`;
