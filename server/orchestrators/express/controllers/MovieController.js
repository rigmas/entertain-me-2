'use strict'

const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

const movieUrl = 'http://localhost:3005/movies'

class movieController{

  static async getAll (req, res, next) {
    const allMovieCache = await redis.get('allMovieRedis')

    try {
      if (allMovieCache !== null) {
        console.log('-----<<<REDIS HIT');
        return res.status(200).json(JSON.parse(allMovieCache))
      } else {
        console.log('NOT REDIS');
        const { data } = await axios.get(movieUrl)
        await redis.set('allMovieRedis', JSON.stringify(data))
        return res.status(200).json(data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async add (req, res, next) {
    try {
      const { data } = await axios.post(movieUrl, req.body)
      redis.del('allMovieRedis')
      redis.set(`movie_${data.id}`, JSON.stringify(data))
      return res.status(201).json(data)
    } catch (error) {
      console.log(error);
    }
  }

  static async getOne (req, res, next) {
    const id = req.params.id
    const oneMovieCache = await redis.get(`movie_${id}`)
    
    try {
      const result = JSON.parse(oneMovieCache)
      if (result !== null) {
        return res.status(200).json(result)
      } else {
        const { data } = await axios.get(`${movieUrl}/${id}`)
        return ReplSet.status(200).json(data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async update( req, res, next) {
    const id = req.params.id
    const inputUpdate = { ... req.body}

    try {
      const { data } = await axios.put(`${movieUrl}/${id}`, inputUpdate)
      redis.del('allMovieRedis')
      redis.set(`movie_${data.id}`, JSON.stringify(data))
      return res.status(200).json(data)
    } catch (error) {
      console.log(error);
    }
  }

  static async delete (req, res, next) {
    const id = req.params.id
    
    try {
      const { data } = await axios.delete(`${movieUrl}/${id}`)
      redis.del('allMovieRedis')
      return res.status(200).json(data)
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = movieController