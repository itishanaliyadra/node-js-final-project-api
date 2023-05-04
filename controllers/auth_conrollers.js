require('dotenv').config()
const db = require('../config/db');
const User = db.user
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const nodemailer = require('nodemailer');

const login = async (req, res) => {
    try {
        const { body: { name, email, password } } = req
        const isdata = await User.findOne({ where: { email } });
        if (!isdata) {
            return res.status(404).json({ success: false, msg: "User not found" })
        }
        if (!bcrypt.compareSync(password, isdata.password)) {
            return res.status(400).json({ success: false, msg: "password is not match" })
        }
        const payload = {
            id: isdata.id,
            email: isdata.email
        }

        const accessToken = jwt.sign(payload, secret, { expiresIn: '1d' })

        await db.user_sessions.create({ token: accessToken, user_id: isdata.id });

        res.status(200).json({ success: true, token: accessToken, msg: "userlogged in successfully " })
    } catch (error) {
        res.status(500).json({ success: false, msg: "Something went wrong" })
    }
}
const logout = async (req, res) => {
    try {
        const { user: { id } } = req
        await db.user_sessions.destroy({
            where: { user_id: id }
        })
        res.status(200).json({ success: true, msg: "User logged out successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Something went wrong" })
    }
}

const forgetpassword = async (req, res) => {
    try {
        const { body: { email } } = req;
        const forgetonedata = await User.findOne({ where: { email } });
        const id = forgetonedata.id;
        if (!forgetonedata) {
            return res.status(404).json({ success: false, msg: "Email Not Found" });
        } else {
            let otp = Math.floor(Math.random() * 1000000);

            let obj = { email, otp, id }
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS
                }
            });
            const mailOptions = {
                from: process.env.FORM,
                to: email,
                subject: 'prima Inforom',
                html: `<p>otp:-${otp}</p>`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error:', error);
                } else {
                    res.cookie('obj', obj)
                    console.log('Email sent:', info.response);
                    return res.status(200).json({ success: true, msg: "OTP verification" })
                }
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Something went wrong" })
    }
}

const otp = async (req, res) => {
    try {
        const { body: { otp } } = req;
        if (otp == req.cookies.obj.otp) {
            return res.status(200).json({ success: true, msg: "change your password !!" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Something went wrong" })
    }
}
const newpass = async (req, res) => {
    try {
        const { body: { password, newcpassword } } = req;
        if (password == newcpassword) {
            let id = req.cookies.obj.id
            let user = await User.update({ password }, { where: { id } })
            if (user) {
                res.clearCookie('obj');
                return res.status(200).json({ success: true, msg: "new password is successfully updated  !!" })
            }
        }
        return res.status(404).json({ success: false, msg: "password and cpassword is not valid !!" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Something went wrong" })
    }
}

module.exports = { login, logout, forgetpassword, otp, newpass }