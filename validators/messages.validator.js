import Joi from "joi";
import { Messages } from "../models/messages.model.js";

export async function validateMessage(req, res, next) {
    try {
        const schema = Joi.object({
            names: Joi.string().required().label("names"),
            email: Joi.string().email().required().label('email'),
            subject: Joi.string().required().label("subject"),
            body: Joi.string().required().label("body")
        })
        const { error } = schema.validate(req.body)
        if (error) {
            // console.error(error)
            return res.status(400).json({
                message: "Unable to save this message..",
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

export async function validateReply(req, res, next) {
    try {
        const schema = Joi.object({
            reply: Joi.string().required().label("reply")
        })
        const { error } = schema.validate(req.body)
        if (error) {
            // console.log(error)
            return res.status(400).json({
                message: 'Unable to reply this message..',
                error: error.message
            })
        }
        const validateID = await Messages.findById(req.params.id)
        if (validateID == null) {
            return res.status(404).json({
                message: "Message not found..",
                error: "No message to reply.."
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

export async function validateDeleteMessage(req, res, next) {
    try {
        const validateID = await Messages.findById(req.params.id)
        if (validateID == null) {
            return res.status(404).json({
                message: "Message not found..",
                error: "No message to delete.."
            })
        }
        next()
    } catch (err) {
        res.status(500).json({
            message: err.message
        })

    }
}