'use strict'

const Movie = require('../models')

class moviesController{
  static async getAll (req, res) {
    try {
      // console.log('HIT');
      const movies = await Movie.getAll()
      return res.status(200).json(movies)
    } catch (error) {
      console.log(error);
    }
  }

  static async getOne (req, res) {
    try {
      const movie = await Movie.getOne(req.params.id)
      return res.status(200).json(movie)
    } catch (error) {
      console.log(error);
    }
  }

  static async add (req, res) {
    try {
      const inputData = { ... req.body}
      const addedData = await Movie.addOne(inputData)
      return res.status(201).json(addedData.ops[0])
    } catch (error) {
      console.log(error);
    }
  }

  static async update( req, res) {
    try {
      const inputData = { ... req.body}
      const updatedData = await Movie.update(req.params.id, inputData)
      return res.status(200).json(updatedData.value)
    } catch (error) {
      console.log(error);
    }
  }

  static async delete (req, res) {
    try {
      const deleteData = await Movie.delete(req.params.id)
      return res.status(200).json(deleteData.value)
    } catch (error) {
      console.log(error);
    }
  }
  
}

module.exports = moviesController