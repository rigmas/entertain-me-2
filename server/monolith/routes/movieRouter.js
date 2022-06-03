'use strict'

const router = require('express').Router()
const movieController = require('../controllers/MovieController')

router.post('/', movieController.add)
router.get('/', movieController.getAll)
router.get('/:id', movieController.getOne)
router.put('/:id', movieController.update)
router.delete('/:id', movieController.delete)

module.exports = router