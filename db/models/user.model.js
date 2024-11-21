const { Model, DataTypes, Sequelize } = require("sequelize");

const USER_TABLE = "clientes";

const UserSchema = {
    id_cliente: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    correo:{
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    telefono: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    direccion: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    rol: {
        allowNull: false,
        type: DataTypes.ENUM("cliente", "admin"),
    },
    usuario: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    contrasena: {
        allowNull: false,
        type: DataTypes.STRING
    },
}

class User extends Model {
    static associate(models) {
        this.hasMany(models.Orders, { foreignKey: 'id_cliente', as: 'orders' });
    }

    static config(sequelize){
        return{
            sequelize,
            tableName: USER_TABLE,
            modelName: "User",
            timestamps: false,
        }
    }
}

module.exports = { USER_TABLE, UserSchema, User };