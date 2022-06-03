'use strict'

const db = require('../config/mongo')
const { ObjectId } = require('mongodb')
const TVSeriesCollections = db.collection("TVSeries") 

class TVSeries {
  static getAll() {
    try {
      return TVSeriesCollections.find().toArray()
    } catch (error) {
      console.log(error);
    }
  }

  static getOne(id) {
    try {
      return TVSeriesCollections.findOne({ "_id": ObjectId(id)})
    } catch (error) {
      console.log(error);
    }
  }

  static addOne(inputData) {
    try {
      return TVSeriesCollections.insertOne(inputData)
    } catch (error) {
      console.log(error);
    }
  }

  static async update(id, inputData) {
    try {
      return TVSeriesCollections.findOneAndUpdate(
        {"_id": ObjectId(id)}, 
        { $set: inputData},
        {returnOriginal: false})
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(id) {
    try {
      return TVSeriesCollections.deleteOne({ "_id": ObjectId(id) })
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = TVSeries