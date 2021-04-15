const { Router } = require('express')
const router = Router()
const controller = require('../controllers/index.controller')

router.get('/', controller.List)

module.exports = router