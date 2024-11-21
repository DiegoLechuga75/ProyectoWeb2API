const { Model, DataTypes } = require("sequelize");

const CATEGORIES_TABLE = "categorias";

const CategoriesSchema = {
    id_categoria: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
            len: [3, 50],
        },
    },
};

class Categories extends Model {
    static associate(models) {
        this.hasMany(models.Videogames, { foreignKey: "id_categoria", as: "videogames" });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CATEGORIES_TABLE,
            modelName: "Categories",
            timestamps: false,
        };
    }
}

module.exports = { CATEGORIES_TABLE, CategoriesSchema, Categories };
