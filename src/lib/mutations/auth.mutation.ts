import { gql } from "@apollo/client";

export const SIGNIN = gql`
  mutation Signin($args: SigninInput!) {
    user: signin(args: $args) {
      id
      email
      firstname
      lastname
      isPremium
    }
  }
`;

export const LOGOUT = gql`
  mutation Signout {
    signout {
      success
      Message
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($args: SignupInput!) {
    signup(args: $args) {
      id
      email
      firstname
      lastname
      isPremium
    }
  }
`;

export const ASK_RESET_PASSWORD = gql`
  mutation AskResetPassword($email: String!) {
    askResetPassword(email: $email) {
      success
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($args: ResetPasswordInput!) {
    resetPassword(args: $args) {
      id
      email
      firstname
      lastname
      isPremium
    }
  }
`;
