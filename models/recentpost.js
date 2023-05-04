
module.exports = (sequelize, Sequelize) => {
    const UserChema = sequelize.define('recent', {
        id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        recentttitle: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        recensubtitle: {
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
        tableName: 'recent'
    })

    return UserChema
}
