import Joi from 'joi';
import { Works } from '../models/works.model.js';

export async function validateAddWork(req, res, next) {
    try {
        const schema = Joi.object({
            workname: Joi.string().required().label('workname'),
            workdesc: Joi.string().required().label("workdesc"),
            workimg: Joi.string().required().label("workimg"),
            link_to_project: Joi.string().uri().required().label("link_to_project"),
            frameworks: Joi.array().items(Joi.string()).required().label("frameworks"),
        })

        const { error } = schema.validate(req.body)
        if (error) {
            console.log(error)
            return res.status(400).json({
                message: "Unable to save this work..",
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

export async function validateUpdateWork(req, res, next) {
    try {
        const schema = Joi.object({
            workname: Joi.string().empty('').label('workname'),
            workdesc: Joi.string().empty('').label("workdesc"),
            workimg: Joi.string().empty('').label("workimg"),
            link_to_project: Joi.string().uri().empty('').label("link_to_project"),
            frameworks: Joi.array().items(Joi.string()).empty('').label("frameworks"),
        })

        const { error } = schema.validate(req.body)
        if (error) {
            console.log(error)
            return res.status(400).json({
                message: "Unable to update this work..",
                error: error.message
            })
        }
        const id = req.params.id
        const work = await Works.findById(id)
        if (!work) return res.status(404).json({ message: "Work not found" })

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
        const work = await Works.findById(id)
        if (!work) return res.status(404).json({ message: "Work not found" })


        next()

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}