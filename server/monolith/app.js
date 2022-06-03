'use strict'

const express = require ('express')
const app = express()
const router = require('./routes')
const PORT = process.env.PORT || 3015

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/', router)

app.listen(PORT , () => {
  console.log("Monolith, listening on port:", PORT)
})