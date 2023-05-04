const routes = require('express').Router();
const Imagesuplodes = require('../middelware/multer');
const authenticate  =  require('../middelware/checkAthu')

const { blogcreate, bolgfind, blogdelete, blogedit, active, deactives } = require('../controllers/blog_controllers');

routes.post('/blogdata',authenticate,Imagesuplodes, blogcreate)
routes.get('/bolgpagesfind', authenticate,bolgfind)
routes.delete('/blogpagedelete/:id', authenticate,blogdelete)
routes.patch('/blogupdated/:id',authenticate, Imagesuplodes, blogedit)
routes.patch('/blog_active/:id', authenticate,active)
routes.patch('/blog_deactive/:id',authenticate,deactives )

module.exports = routes;