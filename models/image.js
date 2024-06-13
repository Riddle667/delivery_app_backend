const { Model, DataTypes } = require("sequelize");
const database = require("../database/connection");




class Image extends Model {
  static id;
  static path;
}

Image.init({
  path: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize : database,
  modelName: 'Image'
});

Image.Product = Image.belongsTo(require('./product'), { foreignKey: 'product_id' });

Image.prototype.toJSON = function() {
    const image = this.get();
    return image;
}

module.exports = Image;