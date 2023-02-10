import { Schema, model } from "mongoose";

const MessagesSchema = new Schema({
    names: {
        type: String,
        required: true,
        minLength: 4
    },
    email: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
        minLength: 4,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    reply: {
        type: String,
        default: null
    },
    replyDate: {
        type: Date,
        default: null,
    }
})

export const Messages = model('messages', MessagesSchema)