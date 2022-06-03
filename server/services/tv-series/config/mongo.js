'use strict'

const MongoClient = require('mongodb').MongoClient

const dbName =  process.env.dbName || 'TVSeriesDB'
const url =  process.env.DB_URL || 'mongodb://127.0.0.1:27017/'

const client = new MongoClient(url, {useUnifiedTopology: true})
client.connect()

const db = client.db(dbName)

const seed = async () => {
  try {
    db.collection('TVSeries').insertMany([
      {
        title: "Breaking Bad",
        overview: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
        poster_path: "https://i.pinimg.com/originals/72/83/92/728392b482329cfef27833fe110321b8.jpg",
        popularity: 4.8,
        tags: [
          "thriller",
          "drama"
        ]
      },
      {
        title: "Suits",
        overview: "On the run from a drug deal gone bad, brilliant college dropout Mike Ross, finds himself working with Harvey Specter, one of New York City's best lawyers.",
        poster_path: "https://upload.wikimedia.org/wikipedia/en/7/78/Suits_season_7_dvd_cover.jpg",
        popularity: 4.6,
        tags: [
          "drama",
        ]
      }
    ])
  } catch(err) {
    console.log(err);
  }
}

seed()

module.exports = db