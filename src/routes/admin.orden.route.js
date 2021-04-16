const { Router } = require('express')
const router = Router()
const controller = require('../controllers/admin.orden.controller')
const { isLoggedIn, isAdminIn } =require('../lib/auth');

router.get('/admin/orden', isLoggedIn, isAdminIn, controller.List)
router.get('/admin/orden/add', isLoggedIn, isAdminIn, controller.RenderAdd)
router.post('/admin/orden/add', isLoggedIn, isAdminIn, controller.Insert)
router.get('/admin/orden/edit/:id', isLoggedIn, isAdminIn, controller.RenderEdit)
router.post('/admin/orden/edit/:id', isLoggedIn, isAdminIn, controller.Edit)
router.get('/admin/orden/delete/:id', isLoggedIn, isAdminIn, controller.Delete)
router.get('/api/admin/orden', isLoggedIn, isAdminIn, controller.ListAPI)

module.exports = router