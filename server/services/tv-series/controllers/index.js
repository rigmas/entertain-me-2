'use strict'

const Series = require('../models')

class seriesController{
  static async getAll (req, res) {
    try {
      const allSeries = await Series.getAll()
      return res.status(200).json(allSeries)
    } catch (error) {
      console.log(error);
    }
  }

  static async getOne (req, res) {
    try {
      const series = await Series.getOne(req.params.id)
      return res.status(200).json(series)
    } catch (error) {
      console.log(error);
    }
  }

  static async add (req, res) {
    try {
      const inputData = { ... req.body}
      const addedData = await Series.addOne(inputData)
      return res.status(201).json(addedData.ops[0])
    } catch (error) {
      console.log(error);
    }
  }

  static async update(req, res) {
    try {
      const inputData = { ... req.body}
      console.log(req.params.id);
      console.log(inputData);
      const updatedData = await Series.update(req.params.id, inputData)
      if (!updatedData) {
        return res.status(404).json({ message: 'Data not found!' })
      } else {
        return res.status(200).json(updatedData.value)
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async delete (req, res) {
    try {
      const deleteData = await Series.delete(req.params.id)
      return res.status(200).json(deleteData.value)
    } catch (error) {
      console.log(error);
    }
  }
  
}

module.exports = seriesController