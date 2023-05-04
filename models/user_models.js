const bcrypt = require('bcrypt')

module.exports = (sequelize, Sequelize) => {
    const UserChema = sequelize.define('users', {
        id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            set(val) {
                this.setDataValue('password', bcrypt.hashSync(val, 12))
            }
        },
        images:{
            type:Sequelize.DataTypes.STRING,
            defaultValue:"ulplodesImg/images-1681277306631img1.png"
        }
    }, {
        tableName: 'users'
    })

    return UserChema
}