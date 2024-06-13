const { Model, DataTypes } = require("sequelize");
const database = require("../database/connection");




class Product extends Model {
    static id;
    static name;
    static description;
    static price;
}

Product.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    sequelize : database,
    modelName: 'product'
});

Product.Category = Product.belongsTo(require('./category'), { foreignKey: 'category_id' });

Product.prototype.toJSON = function() {
    const product = this.get();
    return product;
}

module.exports = Product;
