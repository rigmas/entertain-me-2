'use strict'

const MongoClient = require('mongodb').MongoClient

const dbName =  process.env.dbName || 'MoviesDB'
const url = process.env.DB_URL || 'mongodb://127.0.0.1:27017/'

const client = new MongoClient(url, {useUnifiedTopology: true})
client.connect()

const db = client.db(dbName)

const seed = async () => {
  try {
    db.collection('Movies').insertMany([
      {
        title: "Spiderman Far From Home",
        overview: "Our friendly neighborhood Super Hero decides to join his best friends Ned, MJ, and the rest of the gang on a European vacation. However, Peter's plan to leave super heroics behind for a few weeks are quickly scrapped when he begrudgingly agrees to help Nick Fury uncover the mystery of several elemental creature attacks, creating havoc across the continent.",
        poster_path: "https://upload.wikimedia.org/wikipedia/en/b/bd/Spider-Man_Far_From_Home_poster.jpg",
        popularity: 4.8,
        tags: [
          "action",
          "drama"
        ]
      },
      {
        title: "The Immitation Game",
        overview: "During World War II, the English mathematical genius Alan Turing tries to crack the German Enigma code with help from fellow mathematicians.",
        poster_path: "https://images-na.ssl-images-amazon.com/images/I/81b%2BG%2BRIkkL._AC_SL1500_.jpg",
        popularity: 4.9,
        tags: [
          "historical",
          "drama"
        ]
      }
    ])
  } catch(err) {
    console.log(err);
  }
}

seed()

module.exports = db