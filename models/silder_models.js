
module.exports = (sequelize, Sequelize) => {
    const UserChema = sequelize.define('silder', {
        id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        subtitle: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        images: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        }, status: {
            type: Sequelize.DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        tableName: 'silder'
    })

    return UserChema
}
