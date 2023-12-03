const Router = require('express')
const router = new Router()
const productRouter = require('./productRouter')
const categoryRouter = require('./categoryRouter')
const authRouter = require('./authRouter')
const cartRouter = require('./cartRouter')
const favouriteRouter = require('./favouriteRouter')
const userRouter = require('./userRouter')
const orderRouter = require('./orderRouter')

router.use('/product', productRouter)
router.use('/category', categoryRouter)
router.use('/auth', authRouter)
router.use('/cart', cartRouter)
router.use('/favourite', favouriteRouter)
router.use('/user', userRouter)
router.use('/order', orderRouter)



module.exports = router