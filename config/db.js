const { foreign_key } = require('inflection');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projectapi', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
});

//check database connections

// const CheckDB = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }
// CheckDB();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//user  models 
db.user = require('../models/user_models')(sequelize, Sequelize)
//session  models 
db.user_sessions = require('../models/user_session')(sequelize, Sequelize)

// silder models 
db.silder = require('../models/silder_models')(sequelize, Sequelize);

// recent post models 
db.recent = require('../models/recentpost')(sequelize, Sequelize);

// recent post models 
db.blog = require('../models/blogpages')(sequelize, Sequelize);

// recent post models 
db.from = require('../models/fromdata')(sequelize, Sequelize);

// defining relationship

//user and user_session 2 table join
db.user.hasMany(db.user_sessions, { foreignKey: 'user_id' })
db.user_sessions.belongsTo(db.user, { foreignKey: 'user_id' })

// db.sequelize.sync({force:false});


module.exports = db;
