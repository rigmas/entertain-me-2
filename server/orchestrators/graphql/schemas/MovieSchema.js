'use strict'

const { gql } = require('apollo-server')
const axios = require('axios')

const Redis = require('ioredis')
const redis = new Redis(process.env.REDIS_URL)


// const movieUrl = 'http://localhost:3005/movies'
const movieUrl = process.env.MOVIE_URL

const typeDefs = gql`
  type Movie {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
  
  extend type Query {
    allMovie: [Movie]
    oneMovie(_id: String): Movie
  }

  input movieInput {
    title: String, 
    overview: String, 
    poster_path: String, 
    popularity: Float, 
    tags: [String]
  }

  extend type Mutation {
    addMovie(
      title: String, 
      overview: String, 
      poster_path: String, 
      popularity: Float, 
      tags: [String]
    ): Movie
    
    updateMovie(
      _id: String, 
      inputUpdate: movieInput 
    ): Movie
    
    deleteMovie(_id: String): Movie
  }
`

const resolvers = {
  Query: {
    async allMovie () {
      const moviesCache = await redis.get('allMovieRedis')
      
      try {
        if (moviesCache) {
          console.log('HIT REDIS');
          return JSON.parse(moviesCache)
        }
        else {
          const { data } = await axios.get(movieUrl)
          console.log('NOT REDIS');
          await redis.set('allMovieRedis', JSON.stringify(data))
          return data
        }
      } catch (error) {
        console.log(error);
        return { message : error }
      }
    },
    async oneMovie (_,args) {
      const id = args._id
      const oneMovieCache = await redis.get(`movie_${id}`)

      try {
        const result = JSON.parse(oneMovieCache)
        if (result != null) {
          console.log('HIT REDIS');
          return result
        } else {
          const { data } = await axios.get(`${movieUrl}/${id}`)
          return data
        }
      } catch (err) {
        console.log(err);
        return { message : 'Movie not found!' }
      }
    }
  },
  Mutation: {
    async addMovie(_, args)  {
      try {
        const { data } = await axios.post(movieUrl, args)
        redis.del('allMovieRedis')
        redis.set(`movie_${data._id}`, JSON.stringify(data))
        return data
      } catch (err) {
        console.log(err);        
      }
    },
    async updateMovie(_, args) {
      console.log(args);
      const id = args._id
      const input = { ... args.inputUpdate }
      console.log(args);
      
      try {
        const { data } = await axios.put(`${movieUrl}/${id}`, input)
        redis.del('allMovieRedis')
        redis.set(`movie_${data.id}`, JSON.stringify(data))
        return data
      } catch (error) {
        console.log(error);
      }
    },
    async deleteMovie(_, args) {
      const id = args._id
      const { data } = await axios.delete(`${movieUrl}/${id}`)
      redis.del('allMovieRedis')
      return data
    }
  }
}

module.exports = { typeDefs, resolvers }