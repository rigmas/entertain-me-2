'use strict'

const db = require('../config/mongo')
const { ObjectId } = require('mongodb')
const SeriesCollections = db.collection("TVSeries") 

class SeriesModel {
  static getAll() {
    try {
      return SeriesCollections.find().toArray()
    } catch (error) {
      console.log(error); 
    }
  }
  
  static getOne(id) {
    try {
      return SeriesCollections.findOne({ "_id": ObjectId(id)})
    } catch (error) {
      console.log(error);
    }
  }

  static addOne(inputData) {
    try {
      return SeriesCollections.insertOne(inputData)
    } catch (error) {
      console.log(error);
    }
  }

  static async update(id, inputData) {
    try {
      return SeriesCollections.findOneAndUpdate(
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
      return SeriesCollections.findOneAndDelete({ "_id": ObjectId(id) })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = SeriesModel