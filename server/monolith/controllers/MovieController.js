'use strict'

const Movie = require('../models/Movie')

class movieController{
  static async getAll (req, res) {
    try {
      const allMovie = await Movie.getAll()
      return res.status(200).json(allMovie)
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
      const inputMovie = { ... req.body}
      const addedMovie = await Movie.addOne(inputMovie)
      return res.status(201).json(addedMovie.ops[0])
    } catch (error) {
      console.log(error);
    }
  }

  static async update(req, res) {
    try {
      const inputMovie = { ... req.body}
      const updatedMovie = await Movie.update(req.params.id, inputMovie)
      return res.status(200).json(updatedMovie)
    } catch (error) {
      console.log(error);
    }
  }

  static async delete (req, res) {
    try {
      const deleteMovie = await Movie.delete(req.params.id)
      return res.status(200).json(deleteMovie.value)
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = movieController