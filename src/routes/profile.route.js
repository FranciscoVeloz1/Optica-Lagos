const { Router } = require('express')
const router = Router()
const controller = require('../controllers/profile.controller')
const { isLoggedIn } = require('../lib/auth')

router.get('/profile', isLoggedIn, controller.Listar)

module.exports = router