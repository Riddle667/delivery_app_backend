const { Model, DataTypes } = require('sequelize');
const database = require('../database/connection');


class User extends Model {
    static id;
    static name;
    static lastname;
    static image;
    static phone;
    static email;
    static password;
}

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize : database,
    modelName: 'User'
});

User.Role = User.belongsTo(require('./role'), {
    foreignKey: 'role_id'
});

User.prototype.toJSON = function() {
    const user = this.get();
    delete user.password;

    user.role_id = this.getDataValue('role_id');
    return user;
}

module.exports = User;