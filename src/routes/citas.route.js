const { Router } = require('express')
const router = Router()
const controller = require('../controllers/citas.controller')
const { isLoggedIn } = require('../lib/auth')

router.get('/user/citas', isLoggedIn, controller.Listar)
router.get('/user/citas/add', isLoggedIn, controller.ListarAdd)
router.post('/user/citas/add', isLoggedIn, controller.AgendarCita)
router.get('/user/citas/delete/:id', isLoggedIn, controller.DeleteCita)

module.exports = router