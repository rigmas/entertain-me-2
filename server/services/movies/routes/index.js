'use strict'

const router = require('express').Router()
const moviesController = require('../controllers/')

router.post('/', moviesController.add)
router.get('/', moviesController.getAll)
router.get('/:id', moviesController.getOne)
router.put('/:id', moviesController.update)
router.delete('/:id', moviesController.delete)

module.exports = router