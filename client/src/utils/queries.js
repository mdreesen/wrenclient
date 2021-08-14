// importing graphql
import gql from 'graphql-tag';

// querying single user
export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
        _id
        username
    }
}
`;

export const QUERY_USERS = gql `
  query {
    users {
      _id
      username
      firstname
      lastname
      email
      feelings {
        _id
        feelingText
        createdAt
      }
    }
  }
`;

/* Using this query to find associated users */
export const QUERY_ASSOCIATED_USER = gql `
  query {
    users {
      _id
      email
    }
  }
`;

export const QUERY_FEELINGS = gql `
  query feelings($email: String) {
    feelings(email: $email) {
      _id
      feelingText
      createdAt
      username
    }
  }
`;
// querying single birthworker
export const QUERY_BIRTHWORKER = gql `
query birthworker($username: String!) {
    birthworker(username: $username) {
        _id
        username
        firstname
        lastname
        email
    }
  }
`;

// querying all birthworkers
export const QUERY_BIRTHWORKERS = gql `
query {
    birthworkers {
      _id
      username
      firstname
      lastname
      email
    }
  }
`;

// This is a different query
// We are not passing variables to this query
// we can just name this query and graphql will handle it
export const QUERY_ME = gql `
{
    me {
      _id
      username
      firstname
      lastname
      email
      feelings {
        _id
        feelingText
        createdAt
      }
    }
  }
`;

// querying the logged in user
export const QUERY_ME_BASIC = gql `
{
    me {
      _id
      username
      firstname
      lastname
      email
      feelings {
        _id
        feelingText
        createdAt
      }
    }
  }
`;

export const QUERY_ADMIN = gql `
{
  viewAdmin {
    _id
    username
    firstname
    lastname
    email
  }
}
`;