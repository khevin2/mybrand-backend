
import { Post } from './../models/post.model.js'



export async function getPosts(req, res) {
    try {
        const posts = await Post.find()
        res.status(200).json({
            message: "success",
            length: posts.length,
            data: posts
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: error.message
        })
    }

}
export function addPost(req, res) {
    const post = req.body
    try {
        let newPost = new Post({
            title: post.title,
            intro: post.intro,
            body: post.body,
            photo: post.photo,
            tags: post.tags
        })
        newPost.save((err, result) => {
            if (err) res.status(400).json({ ...err })
            else {
                res.status(201).json({ message: 'success', data: result._doc })
            }
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}

export async function getOnePost(req, res) {
    const { id } = req.params
    try {
        const post = await Post.findByIdAndUpdate(id, { $inc: { views: 1 } })
        if (post)
            res.status(200).json({
                message: 'success',
                data: post
            })
        else res.status(404).json({
            message: "could not find this post"
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}

export async function deletePost(req, res) {
    try {
        const { id } = req.params
        const post = await Post.deleteOne({ _id: id })
        if (post) res.status(200).json({ message: "success", data: post })
        else res.status(404).json({ message: "Could not delete this post.." })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}

export async function updateByID(req, res) {
    try {
        const { id } = req.params
        const data = req.body
        const post = await Post.findOne({ _id: id })
        if (post == null) {
            res.status(400).json({ message: "There is no post with this ID.." })
            return
        }
        const updatedPost = Object.assign(post, data)
        const newPost = await Post.findByIdAndUpdate(id, updatedPost, { new: true })
        if (newPost) res.status(200).json({
            message: "success",
            data: newPost
        })
        else res.status(404).json({
            message: "Could not update this post.."
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}