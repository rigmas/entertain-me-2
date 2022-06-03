'use strict'

const router = require('express').Router()
const seriesController = require('../controllers')

router.post('/', seriesController.add)
router.get('/', seriesController.getAll)
router.get('/:id', seriesController.getOne)
router.put('/:id', seriesController.update)
router.delete('/:id', seriesController.delete)

module.exports = router