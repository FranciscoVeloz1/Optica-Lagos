const { Router } = require('express')
const router = Router()
const controller = require('../controllers/index.controller')
const { isLoggedIn } =require('../lib/auth');

router.get('/', isLoggedIn, controller.List)

module.exports = router