import { gql } from "@apollo/client";

export const ME = gql`
  query Me {
    me {
      id
      email
      firstname
      lastname
      isPremium
    }
  }
`;
export const USER_BY_EMAIL = gql`
  query UserByEmail($email: String!) {
    userByEmail(email: $email) {
      id
      email
      firstname
    }
  }
`;
