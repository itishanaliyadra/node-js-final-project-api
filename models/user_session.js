module.exports = (sequelize, Sequelize) => {
    const usersessionshecma = sequelize.define('user_sessions', {
        id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        token: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        user_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        }
    }, {
        tableName: 'user_sessions'
    })
    return usersessionshecma
}