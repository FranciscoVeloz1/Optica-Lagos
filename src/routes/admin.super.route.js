const { Router } = require('express')
const router = Router()
const controller = require('../controllers/admin.super.controller')
const { isLoggedIn, isAdminIn } =require('../lib/auth');

router.get('/admin/supervisor', isLoggedIn, isAdminIn, controller.List)
router.get('/admin/supervisor/edit/:id', isLoggedIn, isAdminIn, controller.RenderEditSuper)
router.post('/admin/supervisor/edit/:id', isLoggedIn, isAdminIn, controller.EditSuper)
router.get('/admin/supervisor/delete/:id', isLoggedIn, isAdminIn, controller.DeleteAdmin)

router.get('/api/admin/supervisor', isLoggedIn, isAdminIn, controller.ListAPI)

module.exports = router