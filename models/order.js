const { Model } = require("sequelize");




class Order extends Model {
    static id;
    static hour;
    static date;
    static cant;
    static total_price;
    static status;
}

Order.init({
    hour: {
        type: DataTypes.TIME,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    cant: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    status: {
        type: DataTypes.bit(1),
        allowNull: false
    }
}, {
    sequelize : database,
    modelName: 'Order'
});

Order.User = Order.belongsTo(require('./user'), { foreignKey: 'user_id' });

Order.prototype.toJSON = function() {
    const order = this.get();
    return order;
}

module.exports = Order;