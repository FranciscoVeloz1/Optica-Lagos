const { Router } = require('express')
const router = Router()
const controller = require('../controllers/index.controller')
const { isLoggedIn} = require('../lib/auth');

router.get('/leer',isLoggedIn,controller.Mostrar)

module.exports = router