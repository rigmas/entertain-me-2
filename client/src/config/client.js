import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:5010/',
  // uri: 'http://54.169.186.211:5010',
  cache: new InMemoryCache()
})

export default client