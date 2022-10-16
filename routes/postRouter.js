const Router = require('express')
const router = new Router()
const postsController = require('../controllers/postsController')


//Create post
router.post('/', postsController.createPost)
//Get all posts
router.get('/', postsController.getAll)
//Get Post by id
router.get('/:id', postsController.getById)
//Remove Posts
router.delete('/:id', postsController.removePost)
//Update Post
router.put('/:id', postsController.updatePost)


module.exports = router