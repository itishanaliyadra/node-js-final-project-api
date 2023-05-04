const routes = require('express').Router();
const  { fromdata }= require('../controllers/from_controllers');
const authenticate = require('../middelware/checkAthu')

routes.post('/fromcreate',authenticate, fromdata)



module.exports = routes