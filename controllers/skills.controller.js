import { Skills } from "../models/skills.model.js"



export function addSkill(req, res) {
    try {
        if (req.user.userType !== 'admin') return res.status(403).json({
            message: "Admin only are allowed to access this resource",
            error: true
        })

        const { skillname, skilldesc, skillphoto, skillbanner } = req.body
        const newSkill = new Skills({ skillname, skilldesc, skillphoto, skillbanner })
        newSkill.save((err, result) => {
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

export async function getSkills(req, res) {
    try {
        const skills = await Skills.find()
        if (skills.length == 0) res.status(404).json({ message: "success", length: 0, data: {} })
        else res.status(200).json({ message: "success", length: skills.length, data: skills })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}

export async function getSkillById(req, res) {
    try {
        const id = req.params.id
        const skill = await Skills.findById(id)
        if (skill == null) res.status(404).json({ message: "Not found", data: {} })
        else res.status(200).json({ message: "success", data: skill })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}

export async function updateSkill(req, res) {
    try {
        if (req.user.userType !== 'admin') return res.status(403).json({
            message: "Admin only are allowed to access this resource",
            error: true
        })

        const id = req.params.id
        const { skillname, skilldesc, skillphoto, skillbanner } = req.body
        const skill = await Skills.findById(id)
        if (skill == null) res.status(404).json({ message: "Skill not found", data: {} })
        else {
            const newSkill = {
                skillname: skillname || skill.skillname,
                skilldesc: skilldesc || skill.skilldesc,
                skillphoto: skillphoto || skill.skillphoto,
                skillbanner: skillbanner || skill.skillbanner,
                modifiedDate: new Date()
            }
            const response = await Skills.findByIdAndUpdate(id, newSkill, { new: true })
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

export async function deleteSkill(req, res) {
    try {
        if (req.user.userType !== 'admin') return res.status(403).json({
            message: "Admin only are allowed to access this resource",
            error: true
        })

        const id = req.params.id
        const response = await Skills.findByIdAndDelete(id)
        if (response) res.status(200).json({ message: "sucess", data: response })
        else res.status(400).json({ message: "Could not delete" })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}