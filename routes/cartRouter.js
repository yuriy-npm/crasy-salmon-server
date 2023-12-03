const Router = require('express')
const router = new Router()
const {getAll, syncCart, addItem, minusItem, deleteItem, deleteAllItems} = require('../controllers/cartController')



router.get('/', getAll)
router.post('/sync', syncCart)
router.post('/add', addItem)
router.patch('/remove', minusItem)
router.delete('/remove', deleteItem)
router.delete('/deletecart', deleteAllItems)



module.exports = router