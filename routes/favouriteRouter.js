const Router = require('express')
const router = new Router()
const {getAll, addItem, deleteItem} = require('../controllers/favouriteController')



router.get('/', getAll)
router.post('/add', addItem)
router.delete('/', deleteItem)


module.exports = router