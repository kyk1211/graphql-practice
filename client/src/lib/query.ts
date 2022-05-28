import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query currentUser($email: String!) {
    currentUser(email: $email) {
      name
      email
      password
      isLogIn
    }
  }
`;

export const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name
      email
      password
      isLogIn
    }
  }
`;

export const SIGNUP = gql`
  mutation signup($input: AddUserInput!) {
    addUser(input: $input) {
      name
      email
      password
      isLogIn
    }
  }
`;

export const LOGOUT = gql`
  mutation logout($email: String!) {
    logout(email: $email) {
      name
      email
      password
      isLogIn
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($input: AddUserInput!, $newPassword: String!) {
    changePassword(input: $input, newPassword: $newPassword) {
      name
      email
      password
      isLogIn
    }
  }
`;
