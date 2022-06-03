'use strict'

const TVSeries = require('../models/TVSeries')

class tvSeriesController{
  static async getAll (req, res) {
    try {
      const allSeries = await TVSeries.getAll()
      return res.status(200).json(allSeries)
    } catch (error) {
      console.log(error);
    }
  }

  static async getOne (req, res) {
    try {
      const series = await TVSeries.getOne(req.params.id)
      return res.status(200).json(series)
    } catch (error) {
      console.log(error);
    }
  }

  static async add (req, res) {
    try {
      const inputSeries = { ... req.body}
      const addedSeries = await TVSeries.addOne(inputSeries)
      return res.status(201).json(addedSeries.ops[0])
    } catch (error) {
      console.log(error);
    }
  }

  static async update( req, res) {
    try {
      const inputSeries = { ... req.body}
      const updatedSeries = await TVSeries.update(req.params.id, inputSeries)
      return res.status(200).json(updatedSeries)
    } catch (error) {
      console.log(error);
    }
  }

  static async delete (req, res) {
    try {
      const deleteSeries = await TVSeries.delete(req.params.id)
      return res.status(200).json(deleteSeries.value)
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = tvSeriesController