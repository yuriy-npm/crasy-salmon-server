const Router = require('express')
const router = new Router()
const {getAll, addProduct, getOne} = require('../controllers/productController')



router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', addProduct)


module.exports = router 