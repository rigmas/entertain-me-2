'use strict'

const express = require ('express')
const app = express()
const router = require('./routes')
const PORT = process.env.PORT || 3010

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/series', router)

app.listen(PORT , () => {
  console.log("TV Series, listening on port:", PORT)
})