const { Router } = require('express')
const router = Router()
const controller = require('../controllers/admin.orden.controller')
const { isLoggedIn, isAdminIn } =require('../lib/auth');

router.get('/admin/orden', isLoggedIn, controller.List)

module.exports = router