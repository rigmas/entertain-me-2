'use strict'

const db = require('./mongo')

db.createCollection('Movies', {
  validator: {
    bsonType: 'object',
    required: ['title', 'overview', 'poster_path', 'popularity', 'tags' ],
    properties: {
      title: {
        bsonType: 'string',
        description: 'require title in string'
      },
      overview: {
        bsonType: 'string',
        description: 'require overview in string'
      },
      poster_path: {
        bsonType: 'string',
        description: 'require poster path in string'
      },
      popularity: {
        bsonType: ['double', 'int'],
        description: 'require popularity in double or integer data type'
      },
      tags: {
        bsonType: 'array',
        description: 'require tags in array'
      }
    }
  }
})

process.exit()