import { gql } from "@apollo/client";


const CREATE_USER_MUTATION = gql`
mutation CreateUser($input: UserInput!){
  createUser(input: $input) {
    id
    first_name
    last_name
    username
    email_address
  }
}`;

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UserInput!, $id: ID!) {
    updateUser(input: $input, id: $id) {
      id
      first_name
      last_name
      username
      email_address
    }
  }
`;

export {UPDATE_USER_MUTATION, DELETE_USER_MUTATION, CREATE_USER_MUTATION}