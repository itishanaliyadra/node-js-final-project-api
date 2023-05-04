const routes = require('express').Router();
const { login, logout, forgetpassword, otp,  newpass }= require('../controllers/auth_conrollers');
const check = require('../middelware/checkAthu')

routes.post('/login',login)
routes.get('/logout',check,logout)
routes.post('/forgetpasswords', forgetpassword)
routes.post('/otpdata', otp);
routes.post('/newpassword', newpass)

module.exports= routes