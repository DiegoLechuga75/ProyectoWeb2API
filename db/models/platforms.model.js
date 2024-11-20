const { Model, DataTypes } = require("sequelize");

const PLATFORMS_TABLE = "Plataformas";

const PlatformsSchema = {
    id_plataforma: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    }
};

class Platforms extends Model {
    static associate(models) {
        this.hasMany(models.Videogames, { foreignKey: 'id_plataforma', as: 'videojuegos' });
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
