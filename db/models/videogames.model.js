const { Model, DataTypes } = require("sequelize");


const VIDEOGAMES_TABLE = "Videojuegos";

const VideogamesSchema = {
    id_videojuego: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    precio: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
    },
    fecha_lanzamiento: {
        type: DataTypes.DATE,
    },
    id_plataforma: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: "Plataformas",
            key: "id_plataforma"
        }
    },
    id_categoria: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: "Categorias",
            key: "id_categoria"
        }
    },
    stock: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    precio_real: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
    }
};

class Videogames extends Model {
    static associate() {
        // Define associations if necessary
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: VIDEOGAMES_TABLE,
            modelName: "Videogames",
            timestamps: false,
        };
    }
}

module.exports = { VIDEOGAMES_TABLE, VideogamesSchema, Videogames };
