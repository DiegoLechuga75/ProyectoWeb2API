const { Model, DataTypes } = require("sequelize");

const DETAILS_ORDERS_TABLE = "detalles_pedido";

const DetailsOrdersSchema = {
    id_pedido: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: "pedidos",
            key: "id_pedido",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    id_videojuego: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: "videojuegos",
            key: "id_videojuego",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    cantidad: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
        },
    },
    precio: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
        validate: {
            min: 0,
        },
    },
};

class DetailsOrders extends Model {
    static associate(models) {

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: DETAILS_ORDERS_TABLE,
            modelName: "DetailsOrders",
            timestamps: false,
        };
    }
}

module.exports = { DETAILS_ORDERS_TABLE, DetailsOrdersSchema, DetailsOrders };
