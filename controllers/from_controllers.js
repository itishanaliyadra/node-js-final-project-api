const db = require('../config/db');
const from = db.from

const fromdata = async (req,res)=>{
    try {
        const { body: { name, email, subject,message } } = req;
        const user = await from.create({ name, email, subject,message })
        res.status(201).json({ success: true, data: user })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Somthing went wrong" })
    }
}




module.exports ={fromdata}