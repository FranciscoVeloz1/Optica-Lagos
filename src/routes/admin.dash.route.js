const { Router } = require('express')
const router = Router()
const controller = require('../controllers/admin.dash.controller')
const { isLoggedIn, isAdminIn } = require('../lib/auth');

router.get('/admin', isLoggedIn, isAdminIn, controller.List)

module.exports = router