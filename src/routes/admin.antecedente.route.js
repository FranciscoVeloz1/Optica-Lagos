const { Router } = require('express')
const router = Router()
const controller = require('../controllers/admin.antecedente.controller')
const { isLoggedIn, isAdminIn } =require('../lib/auth');

router.get('/admin/pacientes/antecedentes/:id', isLoggedIn, isAdminIn, controller.List)
router.post('/admin/pacientes/antecedentes/add/:id', isLoggedIn, isAdminIn, controller.Insert)
router.get('/admin/pacientes/antecedentes/edit/:id', isLoggedIn, isAdminIn, controller.RenderEdit)
router.post('/admin/pacientes/antecedentes/edit/:id', isLoggedIn, isAdminIn, controller.Editar)
router.get('/admin/pacientes/antecedentes/delete/:id', isLoggedIn, isAdminIn, controller.Eliminar)

router.get('/api/admin/pacientes/antecedentes/:id', isLoggedIn, isAdminIn, controller.ListAPI)

module.exports = router