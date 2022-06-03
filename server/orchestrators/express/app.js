'use strict'

const express = require('express')
const app = express()
const router = require('./routes')
const PORT = process.env.PORT || 5005

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', router)

app.listen(PORT, () => {
  console.log('Orchestrator, listening on:', PORT);
})