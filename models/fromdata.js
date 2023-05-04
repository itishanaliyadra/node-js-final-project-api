
module.exports = (sequelize, Sequelize) => {
    const UserChema = sequelize.define('from', {
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
        subject: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'from'
    })

    return UserChema
}
