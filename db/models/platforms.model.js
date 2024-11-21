const { Model, DataTypes } = require("sequelize");

const PLATFORMS_TABLE = "plataformas";

const PlatformsSchema = {
    id_plataforma: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    img: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            isUrl: true,
        },
    },
};

class Platforms extends Model {
    static associate(models) {
        this.hasMany(models.Videogames, { foreignKey: "id_plataforma", as: "videogames" });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PLATFORMS_TABLE,
            modelName: "Platforms",
            timestamps: false,
        };
    }
}

module.exports = { PLATFORMS_TABLE, PlatformsSchema, Platforms };
