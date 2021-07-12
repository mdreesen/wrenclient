// NOTES
// This file imports the Mongoose and MongoDB connection (from /config/connection.js)
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');


// typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// setting up Auth middleware
const { authMiddleware } = require('./utils/auth');

// create new Apollo Server and pass in schema data
// "context" every request performs authentication check
// updated request object will be passed to the resolvers as the context
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
})

// integrate Apollo Server with express app as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/////////////////////////////////////////////////////////////////////////////
// -=- This only comes into effect in PRODUCTION -=- //
// serve up static assets from the build folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})
/////////////////////////////////////////////////////////////////////////////

// Listen for the connection here
// Upon a successful connection, we start the server
db.once('open', () => {
  app.listen(PORT, () => {
    // logging express server PORT
    console.log(`Express server on port ${PORT}`);

    // logging GraphQL server PORT
    console.log(`GraphQL server on http://localhost:${PORT}${server.graphqlPath}`);
  });
});