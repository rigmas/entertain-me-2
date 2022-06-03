'use strict'

const express = require ('express')
const app = express()
const router = require('./routes')
const PORT = process.env.PORT || 3005

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/movies', router)

app.listen(PORT , () => {
  console.log("MOVIES, listening on port:", PORT)
})