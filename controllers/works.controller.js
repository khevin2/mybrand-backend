import { Works } from "../models/works.model.js"


export function addWork(req, res) {
    try {
        if (req.user.userType !== 'admin') return res.status(403).json({
            message: "Admin only are allowed to access this resource",
            error: true
        })

        const { workname, workdesc, link_to_project, frameworks, workimg } = req.body
        const newWork = new Works({ workname, workdesc, link_to_project, frameworks, workimg })
        newWork.save((err, result) => {
            if (err) return res.status(400).json({ message: err.message, error: err })
            res.status(201).json({ message: "success", data: result })
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}

export async function getWorks(req, res) {
    try {
        const works = await Works.find()
        if (works.length == 0) res.status(404).json({ message: "success", length: 0, data: {} })
        else res.status(200).json({ message: "success", length: works.length, data: works })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}

export async function getWorkById(req, res) {
    try {
        const id = req.params.id
        const work = await Works.findById(id)
        if (work == null) res.status(404).json({ message: "Not found", data: {} })
        else res.status(200).json({ message: "success", data: work })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}

export async function updateWork(req, res) {
    try {
        if (req.user.userType !== 'admin') return res.status(403).json({
            message: "Admin only are allowed to access this resource",
            error: true
        })

        const id = req.params.id
        const { workname, workdesc, link_to_project, frameworks, workimg } = req.body
        const work = await Works.findById(id)
        if (work == null) res.status(404).json({ message: "Work not found", data: {} })
        else {
            const newWork = {
                workname: workname || work.workname,
                workdesc: workdesc || work.workdesc,
                workimg: workimg || work.workimg,
                link_to_project: link_to_project || work.link_to_project,
                frameworks: frameworks || work.frameworks,
                modifiedDate: new Date()
            }
            const response = await Works.findByIdAndUpdate(id, newWork, { new: true })
            if (response) res.status(200).json({ message: "success", data: response })
            else res.status(400).json({ message: "error" })
        }

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}

export async function deleteWork(req, res) {
    try {
        if (req.user.userType !== 'admin') return res.status(403).json({
            message: "Admin only are allowed to access this resource",
            error: true
        })

        const id = req.params.id
        const response = await Works.findByIdAndDelete(id)
        if (response) res.status(200).json({ message: "sucess", data: response })
        else res.status(400).json({ message: "Could not delete" })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}