const { Model, DataTypes } = require("sequelize");
const database = require("../database/connection");



class Role extends Model {
    static id;
    static name;
}

Role.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize : database,
    modelName: 'Role'
});

module.exports = Role;