var express = require('express');
var express_graphql = require('express-graphql');
var schema = require('./graphql');

// Root resolver
var root = {
    message: () => 'Hello World!'
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    graphiql: true
}));
app.listen(process.env.PORT ||4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));