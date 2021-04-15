const { Router } = require('express')
const router = Router()
const controller = require('../controllers/admin.user.controller')
const { isLoggedIn, isAdminIn } = require('../lib/auth');

router.get('/admin/users', isLoggedIn, isAdminIn, controller.List)
router.get('/admin/users/edit/:id', isLoggedIn, isAdminIn, controller.RenderEditUser)
router.post('/admin/users/edit/:id', isLoggedIn, isAdminIn, controller.EditUser)
router.get('/admin/users/delete/:id', isLoggedIn, isAdminIn, controller.DeleteUser)

router.get('/api/admin/users', isLoggedIn, isAdminIn, controller.ListAPI)

module.exports = router