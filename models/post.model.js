import mongoose from "mongoose"
const { Schema, model } = mongoose

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    intro: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    modifiedAt: {
        type: Date,
        default: new Date()
    },
    photo: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    }

})

export const Post = model('post', PostSchema)