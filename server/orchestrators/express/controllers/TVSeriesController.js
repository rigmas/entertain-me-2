'use strict'

const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

const seriesUrl = 'http://localhost:3010/series'

class tvSeriesController{

  static async getAll (req, res, next) {
    const allSeriesCache = await redis.get('allSeriesRedis')

    try {
      if (allSeriesCache !== null) {
        console.log('-----<<<REDIS HIT');
        return res.status(200).json(JSON.parse(allSeriesCache))
      } else {
        console.log('NOT REDIS');
        const { data } = await axios.get(seriesUrl)
        await redis.set('allSeriesRedis', JSON.stringify(data))
        return res.status(200).json(data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async add (req, res, next) {
    try {
      const { data } = await axios.post(seriesUrl, req.body)
      redis.del('allSeriesRedis')
      redis.set(`tvSeries_${data._id}`, JSON.stringify(data))
      return res.status(201).json(data)
    } catch (error) {
      console.log(error);
    }
  }

  static async getOne (req, res, next) {
    const id = req.params.id
    const oneSeriesCache = await redis.get(`tvSeries_${id}`)

    
    try {
      const result = JSON.parse(oneSeriesCache)
      if (result != null) {
        console.log('REDIS');
        return res.status(200).json(result)
      } else {
        const { data } = await axios.get(`${seriesUrl}/${id}`)
        return res.status(200).json(data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async update( req, res, next) {
    const id = req.params.id
    const inputUpdate = { ... req.body}

    try {
      const { data } = await axios.put(`${seriesUrl}/${id}`, inputUpdate)
      redis.del('allSeriesRedis')
      redis.set(`tvSeries_${data.id}`, JSON.stringify(data))
      return res.status(200).json(data)
    } catch (error) {
      console.log(error);
    }
  }

  static async delete (req, res, next) {
    const id = req.params.id
    
    try {
      const { data } = await axios.delete(`${seriesUrl}/${id}`)
      redis.del('allSeriesRedis')
      return res.status(200).json(data)
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = tvSeriesController