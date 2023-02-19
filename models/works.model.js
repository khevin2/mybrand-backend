import mongoose from "mongoose";

const { Schema, model } = mongoose

const WorksSchema = new Schema({
    workname: {
        type: String,
        required: true
    },
    workdesc: {
        type: String,
        required: true,
    },
    workimg: {
        type: String,
        required: true,
        default: "https://picsum.photos/150/150"
    },
    frameworks: {
        type: Array,
        required: true,
    },
    link_to_project: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    modifiedDate: {
        type: Date,
        default: new Date()
    }
})

export const Works = model('works', WorksSchema)