const { ApolloServer } = require('apollo-server-hapi');
const Hapi = require('hapi');

const typeDefs = require('./app/schema');
const resolvers = require('./app/resolvers');

const database = require('./app/db');

async function init() {

    await database.init();    

    const server = new ApolloServer({ typeDefs, resolvers });

    const app = new Hapi.server({
        port: process.env.PORT || 4000,
    });

    await server.applyMiddleware({
        app,
    });

    await app.start();
    console.log(`Server Listening on Port ${process.env.PORT || 4000}`);
}

init().catch(e => console.log(e));