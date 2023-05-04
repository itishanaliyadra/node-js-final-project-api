const db = require('../config/db')
const Silder = db.silder;
const path = require('path');
const imagespath = path.join('ulplodesImg');
const fs = require('fs');

const sildercreate = async (req, res) => {
    try {
        const images = `${imagespath}/${req.file.filename}`;
        const { body: { title, subtitle } } = req;
        const User = await Silder.create({ title, subtitle, images });
        res.status(201).json({ success: true, data: User });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Somthing went wrong" })
    }
}
const silderfind = async (req, res) => {
    try {
        const user = await Silder.findAll({});
        res.status(201).json({ success: true, data: user })
    } catch (error) {
        res.status(500).json({ success: false, msg: "Somthing went wrong" })
    }
}

const silderdelete = async (req, res) => {
    try {
        const { params: { id } } = req
        const onedeletedata = await Silder.findOne({ where: { id } });
        fs.unlinkSync(onedeletedata.images);
        const user = await Silder.destroy({ where: { id } });
        if (!user) {
            return res.status(404).json({ success: false, msg: `no user id :- ${id}` })
        }
        res.status(201).json({ success: true, data: user, msg: `delete for this id :- ${id}` })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Somthing went wrong" })
    }
}

const edit = async (req, res) => {
    try {
        const { body: { title, subtitle }, params: { id } } = req;
        if (req.file) {
            const silderonedata = await Silder.findOne({ where: { id } })
            fs.unlinkSync(silderonedata.images);

            const images = `${imagespath}/${req.file.filename}`;
            const uplod = await Silder.update({ title, subtitle, images }, { where: { id } })
            res.status(201).json({ success: true, data: uplod, msg: `Silder update for this id :- ${id}` })
        }
        else {
            const user = await Silder.update({ title, subtitle }, { where: { id } });
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
const deactive = async (req, res) => {
    try {
        const { params: { id } } = req
        await Silder.update({ status: '0' }, { where: { id } })
        res.status(200).json({ success: true, msg: `Slider data is deactived on id :- ${id}` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `Slider data is not deactive` + error.message })
    }
}
const active = async (req, res) => {
    try {
        const { params: { id } } = req
        await Silder.update({ status: '1' }, { where: { id } })
        res.status(200).json({ success: true, msg: `Slider data is actived on id :- ${id}` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `Slider data is not active` + error.message })
    }
}



module.exports = { sildercreate, silderfind, edit, silderdelete, active,deactive }