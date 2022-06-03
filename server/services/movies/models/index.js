'use strict'

const db = require('../config/mongo')
const { ObjectId } = require('mongodb')
const MovieCollections = db.collection("Movies") 

class MoviesModel {
  static getAll() {
    try {
      return MovieCollections.find().toArray()
    } catch (error) {
      console.log(error); 
    }
  }
  
  static getOne(id) {
    try {
      return MovieCollections.findOne({ "_id": ObjectId(id)})
    } catch (error) {
      console.log(error);
    }
  }

  static addOne(inputData) {
    try {
      return MovieCollections.insertOne(inputData)
    } catch (error) {
      console.log(error);
    }
  }

  static async update(id, inputData) {
    try {
      return MovieCollections.findOneAndUpdate(
        {"_id": ObjectId(id)}, 
        { $set: inputData},
        {returnOriginal: false})
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(id) {
    try {
      console.log(id);
      return MovieCollections.findOneAndDelete({ "_id": ObjectId(id) })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = MoviesModel