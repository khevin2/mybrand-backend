import CryptoJS from "crypto-js";
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
    const { names, email, phone, password, dob } = req.body
    try {
        const photoURL = await upload(req.file.path)
        if (!photoURL) throw "Could not upload file.."
        const newUser = new Users({
            names, email, phone, password, dob: new Date(dob), photo: photoURL.secure_url
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
        let newUser = {
            names: names || user.names,
            email: email || user.email,
            phone: phone || user.phone,
            photo: photo?.secure_url || user.photo,
            password: password || user.password,
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
            message: "success"
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}

export async function auth(req, res, next) {
    try {
        const { email, password } = req.body
        const user = await Users.findOne({ email })
        if (user == null) return res.status(400).json({ message: "Email or password invalid.." })
        let bytes = CryptoJS.AES.decrypt(user.password, process.env.CRPTO_SECRET)
        const pwd = bytes.toString(CryptoJS.enc.Utf8)
        if (pwd !== password) return res.status(400).json({ message: "Email or password invalid.." })
        // jwt stuffs


    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}