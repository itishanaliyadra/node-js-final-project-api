require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');
const path = require('path');


const cookie = require('cookie-parser');

//routes 
const user_routes = require('./routes/user_routes')
const auth_routes = require('./routes/auth_routes')
const silder_routes = require('./routes/silder_routes')
const recentpost_routes= require('./routes/recentpost_routes')
const blog_routes= require('./routes/blog_routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie())

app.use('/ulplodesImg', express.static('ulplodesImg'));


app.use('/api/v1/user', user_routes)
app.use('/api/v1/auth', auth_routes)
app.use('/api/v1/silder', silder_routes);
app.use('/api/v1/recent', recentpost_routes);
app.use('/api/v1/blog',blog_routes )

app.use('/api/v1/from', require('./routes/from_routes'));

const port = process.env.PROT;
app.listen(port, () => console.log("Server url is localhost://" + port));