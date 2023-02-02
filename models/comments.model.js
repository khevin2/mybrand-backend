import mongoose from "mongoose";
import { Schema, SchemaTypes, model } from 'mongoose';

const CommentSchema = new Schema({
    commentBody: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    postID: {
        type: SchemaTypes.ObjectId,
        ref: 'post',
        required: true
    }
})


export const Comment = model('comment', CommentSchema)