'use strict'

const axios = require('axios');
const Redis = require('ioredis')
const redis = new Redis()

const movieUrl = 'http://localhost:3005/movies'
const seriesUrl = 'http://localhost:3010/series'

class combinationController{
  static async getAll (req, res) {
    const movieSeriesCache = await redis.get('movieSeriesRedis')

    try {
      if (movieSeriesCache !== null) {
        console.log('REDIS');
        return res.status(200).json(JSON.parse(movieSeriesCache))
      } else {
        console.log('NOT REDIS');
        const moviesData = await axios.get(movieUrl)
        const seriesData = await axios.get(seriesUrl)
        const combination = ({
          movies: moviesData.data,
          tvSeries: seriesData.data
        })
        await redis.set('movieSeriesRedis', JSON.stringify(combination))
        return res.status(200).json(combination)
      }
    } catch (error) {
      console.log(error);
    }
    
  }
}

module.exports = combinationController