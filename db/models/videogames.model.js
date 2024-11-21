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
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    },
    id_categoria: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: "Categorias",
            key: "id_categoria"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
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
    static associate(models) {
        this.belongsTo(models.Platforms, { foreignKey: 'id_plataforma', as: 'platform' });
        this.belongsTo(models.Categories, { foreignKey: 'id_categoria', as: 'category' });
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
