'use strict'

const router = require('express').Router()
const tvSeriesController = require('../controllers/TVSeriesController')

router.post('/', tvSeriesController.add)
router.get('/', tvSeriesController.getAll)
router.get('/:id', tvSeriesController.getOne)
router.put('/:id', tvSeriesController.update)
router.delete('/:id', tvSeriesController.delete)

module.exports = router