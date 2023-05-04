const routes = require('express').Router();
const Imagesuplodes = require('../middelware/multer');
const authenticate = require('../middelware/checkAthu')

const { sildercreate, silderfind, edit, silderdelete, active, deactive } = require('../controllers/silder_controllers');

routes.post('/silderdata',authenticate,Imagesuplodes, sildercreate)
routes.get('/silderfind',authenticate, silderfind)
routes.delete('/silderDelete/:id', authenticate,silderdelete)
routes.patch('/editdata/:id',authenticate,Imagesuplodes, edit)
routes.patch('/silder_active/:id', authenticate,active)
routes.patch('/silder_deactive/:id',authenticate, deactive)

module.exports = routes;