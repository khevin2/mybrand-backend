import mongoose from "mongoose";

const { Schema, model } = mongoose

const SkillsSchema = new Schema({
    skillname: {
        type: String,
        required: true
    },
    skilldesc: {
        type: String,
        required: true,
    },
    skillphoto: {
        type: String,
        required: true,
        default: "https://picsum.com/130/130"
    },
    skillbanner: {
        type: String,
        required: true,
        default: "https://picsum.photos/130/90"
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

export const Skills = model('skills', SkillsSchema)
