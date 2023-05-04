const db = require('../config/db')
const recent = db.recent;
const path = require('path');
const imagespath = path.join('ulplodesImg');
const fs = require('fs');

const recentcreate = async (req, res) => {
    try {
        const images = `${imagespath}/${req.file.filename}`;
        const { body: { recentttitle, recensubtitle } } = req;
        const User = await recent.create({ recentttitle, recensubtitle, images });
        res.status(201).json({ success: true, data: User });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Somthing went wrong" })
    }
}
const recentfind = async (req, res) => {
    try {
        const user = await recent.findAll({});
        res.status(201).json({ success: true, data: user })
    } catch (error) {
        res.status(500).json({ success: false, msg: "Somthing went wrong" })
    }
}

const recentdelete = async (req, res) => {
    try {
        const { params: { id } } = req
        const onedeletedata = await recent.findOne({ where: { id } });
        fs.unlinkSync(onedeletedata.images);
        const user = await recent.destroy({ where: { id } });
        if (!user) {
            return res.status(404).json({ success: false, msg: `no user id :- ${id}` })
        }
        res.status(201).json({ success: true, data: user, msg: `delete for this id :- ${id}` })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Somthing went wrong" })
    }
}

const recentupdated = async (req, res) => {
    try {
        const { body: { recentttitle, recensubtitle }, params: { id } } = req;
        if (req.file) {
            const recentonedata = await recent.findOne({ where: { id } })
            fs.unlinkSync(recentonedata.images);

            const images = `${imagespath}/${req.file.filename}`;
            const uplod = await recent.update({ recentttitle, recensubtitle, images }, { where: { id } })
            res.status(201).json({ success: true, data: uplod, msg: `Silder update for this id :- ${id}` })
        }
        else {
            const user = await recent.update({ recentttitle, recensubtitle }, { where: { id } });
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
const activea = async (req, res) => {
    try {
        const { params: { id } } = req
        await recent.update({ status: '0' }, { where: { id } })
        res.status(200).json({ success: true, msg: `recent post data is deactived on id :- ${id}` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `recent post data is not deactive` + error.message })
    }
}
const deactive = async (req,res)=>{
    try {
        const { params: { id } } = req
        await recent.update({ status: '1' }, { where: { id } })
        res.status(200).json({ success: true, msg: `recent post data is actived on id :- ${id}` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `recent post data is not active` + error.message })
    }
}


module.exports = {
    recentcreate, recentfind, recentdelete, recentupdated, activea,deactive
}