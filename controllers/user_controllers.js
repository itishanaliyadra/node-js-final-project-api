const db = require('../config/db');
const User = db.user;


const fs = require('fs');
const path = require('path');
const imagespath = path.join('ulplodesImg');

const createdata = async (req, res) => {
    try {
        const { body: { name, email, password } } = req
        // res.json({msg:"done"})
        const user = await User.create({ name, email, password })
        res.status(201).json({ success: true, data: user })
    } catch (error) {
        res.status(500).json({ success: false, msg: "Somthing went wrong" })
    }
}

const findedata = async (req, res) => {
    try {
        const user = await User.findAll({});
        res.status(201).json({ success: true, data: user })
    } catch (error) {
        res.status(500).json({ success: false, msg: "Somthing went wrong" })
    }
}

const deleteData = async (req, res) => {
    try {
        const { params: { id } } = req

        await db.user_sessions.destroy({
            where: { user_id: id }
        })

        const user = await User.destroy({ where: { id } });
        if (!user) {
            return res.status(404).json({ success: false, msg: `no user id :- ${id}` })
        }
        res.status(201).json({ success: true, data: user, msg: `delete for this id :- ${id}` })
    } catch (error) {
        res.status(500).json({ success: false, msg: "Somthing went wrong" })
    }
}

const updateddata = async (req, res) => {

    try {
        const { body: { name, email, password }, params: { id } } = req
        if (req.file) {
            const silderOne = await User.findOne({ where: { id } })

            if (silderOne.images !== "ulplodesImg/images-1681277306631img1.png") {
                fs.unlinkSync(silderOne.images)
            }

            const images = `${imagespath}/${req.file.filename}`;
            const uplod = await User.update({ name, email, password, images }, { where: { id } })

            return res.status(200).json({ success: true, data: uplod, msg: `data is update on id :- ${id}` })

        } else {
            const user = await User.update({ name, email, password }, { where: { id } });
            if (!user) {
                return res.status(404).json({ success: false, msg: `no user id :- ${id}` })
            }
            res.status(201).json({ success: true, data: user, msg: `update for this id :- ${id}` })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Somthing went wrong" })
    }
}

module.exports = {
    createdata, findedata, deleteData, updateddata
}