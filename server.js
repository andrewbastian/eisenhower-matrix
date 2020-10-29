require('dotenv').config();
const express = require('express')
const express_graphql = require('express-graphql')
const redis = require('redis')
const bluebird = require('bluebird')
const { makeExecutableSchema } = require('graphql-tools')
const bodyParser = require('body-parser')

const resolvers = require('./resolvers')
const typeDefs = require('./schema')

const { ApolloServer } = require('apollo-server-express');

// GQL schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

// Create Express server and GraphQL endpoint
const app = express()

const client = redis.createClient()

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

client.on('error', err => {
	console.log('Error' + err)
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {client},
});


// Test Endpoint
app.get('/', async (req, res) => {
  res.send('<h1>She works</h1>');
});


server.applyMiddleware({ app })


module.exports = app