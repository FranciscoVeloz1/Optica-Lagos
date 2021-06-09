const { Router } = require('express')
const router = Router()
const controller = require('../controllers/admin.agenda.controller')
const { isLoggedIn, isAdminIn } = require('../lib/auth');

router.get('/admin/citas', isLoggedIn, isAdminIn, controller.List)
router.get('/admin/citas/delete/:id', isLoggedIn, isAdminIn, controller.Delete)
module.exports = router