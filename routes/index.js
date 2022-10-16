const Router = require('express')
const router = new Router()

const postsRouter = require('./postRouter')

router.use('/posts', postsRouter)


module.exports = router