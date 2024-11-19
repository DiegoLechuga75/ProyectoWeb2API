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
        }
    },
    total: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
    }
};

class Orders extends Model {
    static associate() {
        // Define associations if necessary
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
