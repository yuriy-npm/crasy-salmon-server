const Router = require('express')
const router = new Router()
const {getAll} = require('../controllers/categoryController')



router.get('/', getAll)


module.exports = router