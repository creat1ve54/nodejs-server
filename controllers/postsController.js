const { Post } = require('../models/models')
const uuid = require('uuid')
const path = require('path')


class PostsController {
    async createPost(req, res) {
        try {
            const { title, text, expansion } = req.body
            if (req.files) {
                let fileName;
                //Проверка на расширение
                if (expansion === 'png') {
                    fileName = uuid.v4() + ".png"
                } else if (expansion === 'jpg') {
                    fileName = uuid.v4() + ".jpg"
                } else if (expansion === 'mp4') {
                    fileName = uuid.v4() + ".mp4"
                } else {
                    fileName = uuid.v4() + ".jpg"
                }
                const { file } = req.files
                file.mv(path.resolve(__dirname, '..', 'static', fileName))

                const newPostWithImage = new Post({
                    title,
                    text,
                    fileUrl: fileName,
                })

                await newPostWithImage.save()
                return res.json(newPostWithImage)
            }

            const newPostWithoutImage = new Post({
                title,
                text,
                fileUrl: '',
            })

            await newPostWithoutImage.save()
            return res.json(newPostWithoutImage)
        } catch (error) {
            return res.json({ message: 'Что-то пошло не так' })
        }
    }
    async getAll(req, res) {
        try {
            const posts = await Post.findAll({ order: [['createdAt', 'DESC']] })
            const popularPosts = await Post.findAll({ order: [['views', 'DESC']], limit: 5 })
            if (!posts) {
                return res.json({ message: 'Постов нет!' })
            }

            res.json({ posts, popularPosts })
        } catch (error) {
            res.json({ message: 'Что-то пошло не так' })
        }
    }
    async getById(req, res) {
        try {
            const post = await Post.findOne({ where: { id: req.params.id } })
            const incrementResult = await post.increment('views')
            res.json(incrementResult)
        } catch (error) {
            res.json({ message: 'Что-то пошло не так' })
        }
    }
    async removePost(req, res) {
        try {
            const post = await Post.destroy({ where: { id: req.params.id } })
            if (!post) {
                return res.json({ message: 'Такого поста не существует!' })
            }
            res.json({ message: 'Пост был удален.' })
        } catch (error) {
            res.json({ message: 'Что-то пошло не так' })
        }
    }
    async updatePost(req, res) {
        try {
            const { title, text, id, expansion } = req.body
            const post = await Post.findOne({ where: { id: id } })
            if (req.files) {
                let fileName;
                //проверка расширения
                if (expansion === 'png') {
                    fileName = uuid.v4() + ".png"
                } else if (expansion === 'jpg') {
                    fileName = uuid.v4() + ".jpg"
                } else if (expansion === 'mp4') {
                    fileName = uuid.v4() + ".mp4"
                } else {
                    fileName = uuid.v4() + ".jpg"
                }
                const { file } = req.files
                file.mv(path.resolve(__dirname, '..', 'static', fileName))
                post.fileUrl = fileName || ''
            }
            post.title = title
            post.text = text

            await post.save()

            res.json(post)
        } catch (error) {
            res.json({ message: 'Что-то пошло не так' })
        }
    }
}



module.exports = new PostsController()