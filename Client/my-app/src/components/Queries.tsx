import { gql } from "@apollo/client";


const GET_USERS = gql`
query{
    users {
      id
      first_name
      last_name
      email_address
      username
    }
}
`;
export{GET_USERS}