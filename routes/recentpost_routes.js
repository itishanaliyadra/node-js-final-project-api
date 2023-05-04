const routes = require('express').Router();
const Imagesuplodes = require('../middelware/multer');
const authenticate = require('../middelware/checkAthu')

const { recentcreate, recentfind, recentdelete, recentupdated, activea, deactive }= require('../controllers/recentpost_controllers');

routes.post('/recentcreate',authenticate,Imagesuplodes, recentcreate)
routes.get('/recentfind',authenticate, recentfind)
routes.delete('/recentpostdelete/:id',authenticate, recentdelete)
routes.patch('/recentpostupdated/:id',authenticate,Imagesuplodes, recentupdated)
routes.patch('/recet_active/:id', authenticate,activea)
routes.patch('/recent_deactive/:id',authenticate,deactive )

module.exports = routes