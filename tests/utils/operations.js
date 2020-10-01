import { gql } from 'apollo-boost'

//    CreateUserInput is from schema.graphql 
const createUser = gql`
    mutation ($data:CreateUserInput!) {   
        createUser(
            data: $data
        ) {
            token, 
            user { id name email}
        }
    }
`

const getUsers = gql`
query {
    users {
        id name email 
    }
}
`

//    LoginUserInput is from schema.graphql 
const login = gql`
    mutation($data:LoginUserInput!) {
        login(
            data: $data
        ){ token }
    }
`

const getProfile = gql`
    query {
        me {
            id name email 
        }
    }
`

export { createUser, login, getUsers, getProfile } 