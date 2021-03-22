const { Router } = require('express')
const router = Router()
const controller = require('../controllers/admin.admin.controller')
const { isLoggedIn, isAdminIn } = require('../lib/auth');

router.get('/admin/admins', isLoggedIn, isAdminIn, controller.List)
router.get('/admin/admins/edit/:id', isLoggedIn, isAdminIn, controller.RenderEditAdmin)
router.post('/admin/admins/edit/:id', isLoggedIn, isAdminIn, controller.EditAdmin)
router.get('/admin/admins/delete/:id', isLoggedIn, isAdminIn, controller.DeleteAdmin)

module.exports = router