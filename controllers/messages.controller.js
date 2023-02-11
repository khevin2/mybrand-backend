import { Messages } from "../models/messages.model.js";

export async function createMessage(req, res) {
    try {
        const { body, subject, names, email } = req.body
        const newMessage = new Messages({ names, email, subject, body })
        newMessage.save((error, result) => {
            if (error) return res.status(400).json({
                message: error.message,
                error
            })

            else
                res.status(201).json({
                    message: 'success',
                    data: result
                })
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}

export async function getMessages(req, res) {
    try {
        if (req.user.userType !== 'admin') return res.status(403).json({
            message: "Admin only are allowed to access this resource",
            error: true
        })

        const messages = await Messages.find()
        if (messages) res.status(200).json({
            message: "success",
            length: messages.length,
            data: messages
        })
        else res.status(400).json({ message: "error", error: true })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}

export async function replyMessage(req, res) {
    try {
        if (req.user.userType !== 'admin') return res.status(403).json({
            message: "Admin only are allowed to access this resource",
            error: true
        })

        const id = req.params.id
        const { reply } = req.body
        const repliedMessage = await Messages.findByIdAndUpdate(id, { reply, replyDate: new Date() }, { new: true })
        if (repliedMessage) res.status(200).json({
            message: "success",
            data: repliedMessage
        })
        else res.status(400).json({ message: "error", error: true })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}

export async function deleteMessage(req, res) {
    try {
        if (req.user.userType !== 'admin') return res.status(403).json({
            message: "Admin only are allowed to access this resource",
            error: true
        })

        const id = req.params.id
        const result = await Messages.findByIdAndDelete(id)
        if (result) res.status(200).json({ message: "success", data: result })
        else res.status(400).json({ message: "error", error: true })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}