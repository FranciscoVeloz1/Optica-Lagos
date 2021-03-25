const { Router } = require('express')
const router = Router()
const controller = require('../controllers/admin.paciente.controller')
const { isLoggedIn, isAdminIn } =require('../lib/auth');

router.get('/admin/pacientes', isLoggedIn, isAdminIn, controller.Listar)
router.get('/admin/pacientes/add', isLoggedIn, isAdminIn, controller.RenderAdd)
router.post('/admin/pacientes/add', isLoggedIn, isAdminIn, controller.Insert)

module.exports = router