const { Router } = require('express')
const router = Router()
const controller = require('../controllers/admin.paciente.controller')
const { isLoggedIn, isAdminIn } =require('../lib/auth');

router.get('/admin/pacientes', isLoggedIn, isAdminIn, controller.Listar)

module.exports = router