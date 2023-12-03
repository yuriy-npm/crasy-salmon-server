const Router = require('express')
const router = new Router()
const { addOrder, getAll } = require('../controllers/orderController')



router.get('/', getAll)
router.post('/', addOrder)

module.exports = router