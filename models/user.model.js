import mongoose from "mongoose";
const { Schema, model } = mongoose

const UserSchema = Schema({
    names: {
        type: String,
        required: true,
        minLength: 5
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        unique: true
    },
    photo: {
        type: String,
        required: true,
        default: "https://picsum.photos/200/200"
    },
    phone: {
        type: String,
        required: true,
        minLength: 10,
        unique: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    modifiedDate: {
        type: Date,
        default: new Date()
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    dob: {
        type: Date,
        required: true
    },
    userType: {
        type: String,
        default: 'user'
    }
})

export const Users = model('user', UserSchema)
