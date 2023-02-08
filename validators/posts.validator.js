import Joi from "joi";
import { Post } from './../models/post.model.js'

export async function validatePost(req, res, next) {
    try {
        const schema = Joi.object({
            title: Joi.string().required().label('title'),
            intro: Joi.string().required().label('intro'),
            body: Joi.string().required().label('body'),
            tags: Joi.array().items(Joi.string()).required().label('tags'),
            photo: Joi.string().uri().required().label('photo')
        })
        const { error } = schema.validate(req.body)
        if (error) {
            console.log(error)
            return res.status(400).json({
                message: "Unable to save this post..",
                error: error.message
            })
        }
        return next()
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}

export async function validatePostUpdate(req, res, next) {
    try {
        // req.body.tags = JSON.parse(req.body.tags || '[]')
        const schema = Joi.object({
            title: Joi.string().label('title'),
            intro: Joi.string().label('intro'),
            body: Joi.string().label('body'),
            photo: Joi.string().uri().label('photo'),
            tags: Joi.array().items(Joi.string()).label('tags')
        })
        const { error } = schema.validate(req.body)
        if (error) {
            console.log(error)
            return res.status(400).json({
                message: 'Unable to update this post..',
                error: error.message
            })
        }
        const validateID = await Post.findById(req.params.id)
        if (validateID == null) res.status(404).json({
            message: "Post not found.."
        })
        return next()
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

export async function validateLike(req, res, next) {
    try {
        const postid = req.params.id
        const post = await Post.findById(postid)
        if (!post) return res.status(400).json({
            message: "Could not find a post with this ID.."
        })
        next()
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}