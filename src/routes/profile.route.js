const { Router } = require('express')
const router = Router()
const controller = require('../controllers/profile.controller')
const { isLoggedIn } = require('../lib/auth')

router.get('/profile', isLoggedIn, controller.Listar)
router.get('/profile/edit', isLoggedIn, controller.RenderEdit)
router.post('/profile/edit', isLoggedIn, controller.Edit)
module.exports = router