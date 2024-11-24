const { allow } = require("joi");
const { Model, DataTypes } = require("sequelize");

const USER_TABLE = "clientes";

const UserSchema = {
    id_cliente: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    correo: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    contrasena: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    confirmado: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    token_confirmacion: {
        allowNull: true,
        type: DataTypes.STRING
    },
    telefono: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            is: /^[0-9]+$/i,
        },
    },
    direccion: {
        allowNull: false,
        type: DataTypes.TEXT,
    },
    rol: {
        allowNull: false,
        type: DataTypes.ENUM("cliente", "admin"),
    },
    usuario: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
};

class User extends Model {
    static associate(models) {
        this.hasMany(models.Orders, { foreignKey: "id_cliente", as: "orders" });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: "User",
            timestamps: false,
        };
    }
}

module.exports = { USER_TABLE, UserSchema, User };
