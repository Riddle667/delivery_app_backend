const { Model, DataTypes } = require("sequelize");
const database = require("../database/connection");




class Category extends Model {
    static id;
    static name;
    static description;
    static image;
}

Category.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize : database,
    modelName: 'Category'
});

Category.prototype.toJSON = function() {
    const category = this.get();
    return category;
}

module.exports = Category;