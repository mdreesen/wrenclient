// import the gql tagged template functon
const { gql } = require('apollo-server-express');

// NOTES
// GraphQL uses Queries and Mutations
// Queries is getting data
// Mutations is creating, updating, deleting

// creating typeDefs
const typeDefs = gql `
type Query {
    helloWorld: String

    me: User
    viewAdmin: Admin

    users: [User]
    user(email: String!): User

    admin: Admin
    admins: Admin

    feelings(email: String): [Feeling]
    feeling(email: String!): Feeling
}

type Auth {
    token: ID!
    user: User
    admin: Admin
}

type User {
    _id: ID
    username: String
    firstname: String
    lastname: String
    email: String
    password: String
    mood: String
    feelings: [Feeling]
}

type Admin {
    _id: ID
    username: String
    firstname: String
    lastname: String
    email: String
    password: String
}

type Feeling {
    _id: ID
    feelingText: String
    createdAt: String
    email: String
  }

type Mutation {
    addUser(username: String!, firstname: String!, lastname: String!, email: String!, password: String!): Auth
    userLogin(email: String!, password: String!): Auth
    mood(mood: String): User

    addAdmin(username: String!, firstname: String!, lastname: String!, email: String!, password: String!): Auth
    adminLogin(email: String!, password: String!): Auth

    addFeeling(feelingText: String!): Feeling
}
`;

// export the typeDefs
module.exports = typeDefs;