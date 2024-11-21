const { Model, DataTypes } = require("sequelize");


const ORDERS_TABLE = "Pedidos";

const OrdersSchema = {
    id_pedido: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    fecha_pedido: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    id_cliente: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: "Clientes",
            key: "id_cliente"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    total: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
    }
};

class Orders extends Model {
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'id_cliente', as: 'user' });
        this.hasMany(models.DetailsOrders, { foreignKey: 'id_pedido', as: 'details' });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDERS_TABLE,
            modelName: "Orders",
            timestamps: false,
        };
    }
}

module.exports = { ORDERS_TABLE, OrdersSchema, Orders };
