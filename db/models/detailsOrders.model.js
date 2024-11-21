const { Model, DataTypes } = require("sequelize");

const DETAILS_ORDERS_TABLE = "Detalles_Pedido";

const DetailsOrdersSchema = {
    id_pedido: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "Pedidos",
            key: "id_pedido"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    id_videojuego: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "Videojuegos",
            key: "id_videojuego"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    cantidad: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    precio: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
    },
    forma_de_pago: {
        allowNull: false,
        type: DataTypes.ENUM("efectivo", "tarjeta", "transferencia"),
    }
};

class DetailsOrders extends Model {
    static associate(models) {
        this.belongsTo(models.Orders, { foreignKey: 'id_pedido', as: 'order' });
        this.hasOne(models.Videogames, { foreignKey: 'id_videojuego', as: 'videogame' });
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
