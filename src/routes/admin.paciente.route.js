const { Router } = require('express')
const router = Router()
const controller = require('../controllers/admin.paciente.controller')
const { isLoggedIn, isAdminIn } =require('../lib/auth');

router.get('/admin/pacientes', isLoggedIn, isAdminIn, controller.Listar)
router.get('/admin/pacientes/add', isLoggedIn, isAdminIn, controller.RenderAdd)
router.post('/admin/pacientes/add', isLoggedIn, isAdminIn, controller.Insert)
router.get('/admin/pacientes/edit/:id', isLoggedIn, isAdminIn, controller.RenderEdit)
router.post('/admin/pacientes/edit/:id', isLoggedIn, isAdminIn, controller.Edit)
router.get('/admin/pacientes/delete/:id', isLoggedIn, isAdminIn, controller.Delete)

//API
router.get('/api/admin/pacientes', isLoggedIn, isAdminIn, controller.ListAPI)

module.exports = router