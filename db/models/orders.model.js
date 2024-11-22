const { Model, DataTypes } = require("sequelize");

const ORDERS_TABLE = "pedidos";

const OrdersSchema = {
    id_pedido: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    fecha_pedido: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    id_cliente: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: "clientes",
            key: "id_cliente",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    forma_de_pago: {
        allowNull: false,
        type: DataTypes.ENUM("efectivo", "tarjeta", "transferencia"),
    },
    total: {
        type: DataTypes.VIRTUAL,
        get(){
            if(this.items){
                return this.items.reduce((total, item) => {
                    return total + (item.precio * item.DetailsOrders.cantidad);
                }, 0);
            }
            return 0;
        }
    },
};

class Orders extends Model {
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: "id_cliente", as: "user" });
        this.belongsToMany(models.Videogames, {
            as: "items",
            through: models.DetailsOrders,
            foreignKey: "id_pedido",
            otherKey: 'id_videojuego'
        });
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
