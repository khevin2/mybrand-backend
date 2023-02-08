import { Comment } from "../models/comments.model.js";

// Add Comment

export async function addComment(req, res) {
    try {
        const postID = req.params.id
        const { comment } = req.body
        new Comment({
            commentBody: comment,
            postID
        }).save((err, data) => {
            if (err) return res.status(400).json({ message: err.message, error: true })
            res.status(201).json({ message: "success", data: data._doc })
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}
export async function getComments(req, res) {
    try {
        const { id } = req.params
        const comments = await Comment.find({ postID: id })
        console.log(comments)
        if (comments.length == 0) res.status(200).json({ message: 'success', data: [] })
        else if (comments.length > 0) {
            res.status(200).json({
                message: 'success',
                length: comments.length,
                data: comments
            })
        }
        else res.status(400).json({
            message: "could not find comments for this post.."
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}