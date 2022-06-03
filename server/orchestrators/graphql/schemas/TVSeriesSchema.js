'use strict'

const { gql } = require('apollo-server')
const axios = require('axios')

const Redis = require('ioredis')
const redis = new Redis(process.env.REDIS_URL)


// const tvSeriesUrl = 'http://localhost:3010/series'
const tvSeriesUrl = process.env.TVSERIES_URL

const typeDefs = gql`
  type TVSeries {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
  
  extend type Query {
    allTvSeries: [TVSeries]
    oneTvSeries(_id: String): TVSeries
  }

  input tvSeriesInput {
    title: String, 
    overview: String, 
    poster_path: String, 
    popularity: Float, 
    tags: [String]
  }

  extend type Mutation {
    addTvSeries(
      title: String, 
      overview: String, 
      poster_path: String, 
      popularity: Float, 
      tags: [String]
    ): TVSeries
    
    updateTvSeries(
      _id: String, 
      inputUpdate: tvSeriesInput 
    ): TVSeries
    
    deleteTvSeries(_id: String): TVSeries
  }
`

const resolvers = {
  Query: {
    async allTvSeries () {
      const tvSeriesCache = await redis.get('allSeriesRedis')
      
      try {
        if (tvSeriesCache) {
          console.log(JSON.parse(tvSeriesCache));
          console.log('HIT REDIS');
          return JSON.parse(tvSeriesCache)
        }
        else {
          const { data } = await axios.get(tvSeriesUrl)
          console.log('NOT REDIS');
          await redis.set('allSeriesRedis', JSON.stringify(data))
          return data
        }
      } catch (error) {
        console.log(error);
        return { message : error }
      }
    },
    async oneTvSeries (_,args) {
      const id = args._id
      const oneTvSeriesCache = await redis.get(`tvSeries_${id}`)

      try {
        const result = JSON.parse(oneTvSeriesCache)
        if (result != null) {
          console.log('HIT REDIS');
          return result
        } else {
          const { data } = await axios.get(`${tvSeriesUrl}/${id}`)
          return data
        }
      } catch (err) {
        console.log(err);
        return { message : 'Movie not found!' }
      }
    }
  },
  Mutation: {
    async addTvSeries(_, args)  {
      try {
        const { data } = await axios.post(tvSeriesUrl, args)
        redis.del('allSeriesRedis')
        redis.set(`tvSeries_${data._id}`, JSON.stringify(data))
        return data
      } catch (err) {
        console.log(err);        
      }
    },
    async updateTvSeries(_, args) {
      const id = args._id
      const input = { ... args.inputUpdate }
      
      try {
        const { data } = await axios.put(`${tvSeriesUrl}/${id}`, input)
        redis.del('allSeriesRedis')
        redis.set(`tvSeries_${data.id}`, JSON.stringify(data))
        return data
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTvSeries(_, args) {
      const id = args._id
      console.log(id);
      console.log(tvSeriesUrl);
      const { data } = await axios.delete(`${tvSeriesUrl}/${id}`)
      redis.del('allSeriesRedis')
      return data
    }
  }
}

module.exports = { typeDefs, resolvers }