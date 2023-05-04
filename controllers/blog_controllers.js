const db = require('../config/db')
const blog = db.blog;
const path = require('path');
const imagespath = path.join('ulplodesImg');
const fs = require('fs');

const blogcreate = async(req,res)=>{
    try {
        const images = `${imagespath}/${req.file.filename}`;
        const { body: { title, aother,date,category,dis } } = req;
        const User = await blog.create({  title, aother,date,category,dis , images });
        res.status(201).json({ success: true, data: User });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Somthing went wrong" })
    }
}
const bolgfind = async (req,res)=>{
    try {
        const user = await blog.findAll({});
        res.status(201).json({ success: true, data: user })
    } catch (error) {
        res.status(500).json({ success: false, msg: "Somthing went wrong" })
    }
}

const blogdelete = async (req,res)=>{
    try {
        const { params: { id } } = req
        const onedeletedata = await blog.findOne({ where: { id } });
        fs.unlinkSync(onedeletedata.images);
        const user = await blog.destroy({ where: { id } });
        if (!user) {
            return res.status(404).json({ success: false, msg: `no user id :- ${id}` })
        }
        res.status(201).json({ success: true, data: user, msg: `delete for this id :- ${id}` })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Somthing went wrong" })
    }
}

const blogedit = async(req,res)=>{
    try {
        const { body: {title, aother,date,category,dis}, params: { id } } = req;
        if (req.file) {
            const blogonedata = await blog.findOne({ where: { id } })
            fs.unlinkSync(blogonedata.images);

            const images = `${imagespath}/${req.file.filename}`;
            const uplod = await blog.update({ title, aother,date,category,dis, images }, { where: { id } })
            res.status(201).json({ success: true, data: uplod, msg: `Silder update for this id :- ${id}` })
        }
        else {
            const user = await blog.update({ title, aother,date,category,dis }, { where: { id } });
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
const deactives = async (req, res) => {
    try {
        const { params: { id } } = req
        await blog.update({ status: '0' }, { where: { id } })
        res.status(200).json({ success: true, msg: `blog page data is deactived on id :- ${id}` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `blog page data is not deactive` + error.message })
    }
}
const active = async (req, res) => {
    try {
        const { params: { id } } = req
        await blog.update({ status: '1' }, { where: { id } })
        res.status(200).json({ success: true, msg: `blog page data is actived on id :- ${id}` })
    } catch (error) {
        res.status(500).json({ success: false, msg: `blog page data is not active` + error.message })
    }
}


module.exports= {blogcreate,bolgfind,blogdelete,blogedit,deactives,active}