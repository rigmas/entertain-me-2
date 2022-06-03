'use strict'

const router = require('express').Router()
const tvSeriesRouter = require('./tvSeriesRouter')
const movieRouter = require('./movieRouter')


router.use('/series', tvSeriesRouter)
router.use('/movies', movieRouter)


module.exports = router