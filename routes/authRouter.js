const Router = require('express')
const { register, login, getMe } = require('../controllers/authController')
const  checkAuth  = require('../services/checkAuth')
const router = new Router()



router.post('/registration', register)
router.post('/login', login)
router.get('/me', checkAuth, getMe)


module.exports = router