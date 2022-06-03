'use strict'

const router = require('express').Router()
const tvSeriesRouter = require('./tvSeriesRouter')
const movieRouter = require('./movieRouter')
const combinationController = require('../controllers/CombinationController')


router.use('/series', tvSeriesRouter)
router.use('/movies', movieRouter)
router.get('/', combinationController.getAll)


module.exports = router