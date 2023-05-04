const routes = require('express').Router();

const { createdata, findedata, deleteData, updateddata } = require('../controllers/user_controllers')
const chekathu = require('../middelware/checkAthu')
const profileupdated = require('../middelware/multer')

routes.post('/createuser', createdata)
routes.get('/findeuser', findedata)
routes.delete('/deleteuser/:id',chekathu, deleteData)
routes.patch('/updateduser/:id',chekathu,profileupdated, updateddata)
    
module.exports = routes;