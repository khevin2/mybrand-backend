import Joi from "joi";
import { Users } from "../models/user.model.js";

export async function ValidateUser(req, res, next) {
    try {
        const schema = Joi.object({
            names: Joi.string().required().label('names'),
            email: Joi.string().email().required().label('email'),
            phone: Joi.string().min(10).max(10).required().label('phone'),
            password: Joi.string().min(6).max(64).required().label('password'),
            dob: Joi.date().required().label('dob'),
            photo: Joi.string().uri().required().label('photo')
        })
        const { error } = schema.validate(req.body)
        if (error) return res.status(400).json({
            error: error.message,
            message: "Unable to save new User.."
        })

        const checkEmail = await Users.findOne({ email: req.body.email })
        if (checkEmail) return res.status(400).json({
            message: "Email already registered.."
        })
        const checkPhone = await Users.findOne({ phone: req.body.phone })
        if (checkPhone) return res.status(400).json({
            message: "Phone number already registered.."
        })

        return next()

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}

export async function validateUserUpdate(req, res, next) {
    try {
        const schema = Joi.object({
            names: Joi.string().empty('').label('names'),
            email: Joi.string().empty('').email().label('email'),
            phone: Joi.string().empty('').min(10).max(10).label('phone'),
            password: Joi.string().empty('').min(6).max(64).label('password'),
            dob: Joi.date().empty('').label('dob'),
            photo: Joi.string().empty('').uri().label('photo')
        })
        const { error } = schema.validate(req.body)
        if (error) return res.status(400).json({
            error: error.message,
            message: "Unable to save new User.."
        })
        const checkEmail = await Users.findOne({ email: req.body.email })
        if (checkEmail) return res.status(400).json({
            message: "Email already registered.."
        })
        const checkPhone = await Users.findOne({ phone: req.body.phone })
        if (checkPhone) return res.status(400).json({
            message: "Phone number already registered.."
        })

        return next()

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
export async function validatelogin(req, res, next) {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required().label('email'),
            password: Joi.string().required().label('password')
        })
        const { error } = schema.validate(req.body)
        if (error) return res.status(400).json({
            error: error.message,
            message: "Could not login.."
        })
        next()
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}