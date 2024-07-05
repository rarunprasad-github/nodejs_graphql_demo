const { ApolloClient } = require('apollo-client');
const { HttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory')
const fetch = require('isomorphic-fetch');
const { gql } = require('apollo-server-express');

exports.handler = async (event) => {

  // GraphQL server endpoint
  const uri = 'http://localhost:4566/graphql/3909cc4b1e92441eb923fb8faa/';

  // Create an Apollo HTTP Link
  const httpLink = new HttpLink({
    uri,
    fetch, // node-fetch library for fetching in Node.js environment
  });


  // Create a cache for caching GraphQL data
  const cache = new InMemoryCache();

  // Create the Apollo Client instance
  const client = new ApolloClient({
    link: httpLink,
    cache,
  });

  client
    .query({
      query: gql`
      query GetNote($id: ID!) {
        getNote(NoteId: $id) {
          NoteId
          title
          content
        }
      }
    `,
    variables: { id: 1}
    }).then(result => { return result })

  // let body = JSON.parse(event.body)
  // const product = body.num1 * body.num2;
  // const response = {
  //     statusCode: 200,
  //     body: "The product of " + body.num1 + " and " + body.num2 + " is " + product,
  // };
  // return response;
};