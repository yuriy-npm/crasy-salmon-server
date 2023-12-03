const Router = require('express')
const router = new Router()
const { addAddress, changeAddress, deleteAddress, changeUserData } = require('../controllers/userController')



router.post('/address', addAddress)
router.patch('/address', changeAddress)
router.patch('/data', changeUserData)
router.delete('/address', deleteAddress)


module.exports = router