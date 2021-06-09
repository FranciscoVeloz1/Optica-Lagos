const { Router } = require('express')
const router = Router()
const controller = require('../controllers/leer.controller')

router.get('/leer',controller.Mostrar)

module.exports = router