import Joi from "joi";
import { Post } from "../models/post.model.js";

export async function validateComment(req, res, next) {
    try {


        const schema = Joi.object({
            comment: Joi.string().min(4).required().label('comment')
        })
        const { error } = schema.validate(req.body)
        if (error)
            return res.status(400).json({
                message: "comment invalid..",
                error: error.message
            })

        const postid = req.params.id
        const post = await Post.findById(postid)
        if (!post) return res.status(400).json({
            message: "Post with this ID does not exists.."
        })
        next()
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}