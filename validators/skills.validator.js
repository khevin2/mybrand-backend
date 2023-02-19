import Joi from 'joi';
import { Skills } from '../models/skills.model.js';

export async function validateAddSkill(req, res, next) {
    try {
        const schema = Joi.object({
            skillname: Joi.string().required().label('skillname'),
            skilldesc: Joi.string().required().label("skilldesc"),
            skillphoto: Joi.string().required().label("skillphoto"),
            skillbanner: Joi.string().required().label("skillbanner"),
        })

        const { error } = schema.validate(req.body)
        if (error) {
            console.log(error)
            return res.status(400).json({
                message: "Unable to save this skill..",
                error: error.message
            })
        }

        next()

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}

export async function validateUpdateskill(req, res, next) {
    try {
        const schema = Joi.object({
            skillname: Joi.string().empty('').label('skillname'),
            skilldesc: Joi.string().empty('').label("skilldesc"),
            skillphoto: Joi.string().empty('').label("skillphoto"),
            skillbanner: Joi.string().empty('').label("skillbanner"),
        })

        const { error } = schema.validate(req.body)
        if (error) {
            console.log(error)
            return res.status(400).json({
                message: "Unable to update this skill..",
                error: error.message
            })
        }
        const id = req.params.id
        const skill = await Skills.findById(id)
        if (!skill) return res.status(404).json({ message: "Skill not found" })

        next()


    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}

export async function validateDelete(req, res, next) {
    try {
        const id = req.params.id
        const skill = await Skills.findById(id)
        if (!skill) return res.status(404).json({ message: "Skill not found" })


        next()

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}