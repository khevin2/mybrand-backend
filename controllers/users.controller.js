import CryptoJS from "crypto-js";
import env from 'dotenv';
import jwt from "jsonwebtoken";
env.config({ path: './.env' })
import { upload } from '../utils/fileUpload.js'
import { Users } from './../models/user.model.js'

export async function getAllUsers(req, res) {
    try {
        const users = await Users.find()
        res.status(200).json({
            message: "success",
            length: users.length,
            data: users
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}
export async function addUser(req, res) {
    const { names, email, phone, password, dob,photo } = req.body
    try {
        // const photoURL = await upload(req.file.path)
        // if (!photoURL) throw "Could not upload file.."
        const newUser = new Users({
            names,
            email,
            phone,
            password: CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET),
            dob: new Date(dob),
            photo
        })
        newUser.save((err, result) => {
            if (err) res.status(400).json({ ...err })
            else res.status(201).json({ message: "success", data: result._doc })
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}
export async function getOneUser(req, res) {
    const id = req.params.id
    try {
        const user = await Users.findById(id).select({ password: 0 })
        if (user == null)
            res.status(200).json({
                message: "success",
                length: 0,
                data: {}
            })
        else res.status(200).json({
            message: "success",
            length: user.length,
            data: user
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}
export async function updateUser(req, res) {
    try {
        const id = req.params.id
        const { names, email, phone, password, dob } = req.body
        let photo
        if (req.file) photo = await upload(req.file.path)
        const user = Users.findById(id)
        if (!user) return res.status(403).json({ message: "User not found.." })
        const encryptedPassword = password && CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString()
        let newUser = {
            names: names || user.names,
            email: email || user.email,
            phone: phone || user.phone,
            photo: photo?.secure_url || user.photo,
            password: encryptedPassword || user.password,
            dob: dob || user.dob,
            modifiedDate: new Date()
        }
        const updatedUser = await Users.findByIdAndUpdate(id, newUser, { new: true }).select({ password: 0 })
        res.status(201).json({
            message: "success",
            data: updatedUser
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}
export async function deleteOneUser(req, res) {
    try {
        const id = req.params.id
        const data = await Users.findByIdAndDelete(id)
        res.status(200).json({
            message: "success",
            ...data
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}

export async function auth(req, res) {
    try {
        const { email, password } = req.body
        const user = await Users.findOne({ email })
        if (user == null) return res.status(400).json({ message: "Email or password invalid..1" })
        let bytes = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_SECRET)
        const pwd = bytes.toString(CryptoJS.enc.Utf8)
        if (pwd !== password) return res.status(400).json({ message: "Email or password invalid.." })
        // jwt stuff
        const authenticatedUser = {
            names: user.names,
            id: user._id,
            email: user.email
        }
        const token = jwt.sign(authenticatedUser, process.env.JWT_TOKEN)
        res.status(200).json({
            message: "success",
            token
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}

// export async function logout(req, res) {
//     try {
        

//     } catch (err) {
//         console.error(err)
//         res.status(500).json({
//             message: err.message
//         })
//     }
// }