
module.exports = (sequelize, Sequelize) => {
    const UserChema = sequelize.define('blog', {
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
        aother: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        images: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        dis: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        tableName: 'blog'
    })

    return UserChema
}
