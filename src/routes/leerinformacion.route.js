const { Router } = require('express')
const router = Router()
const controller = require('../controllers/leerinformacion.controller')

router.get('/leerinformacion',controller.Muestra)

module.exports = router