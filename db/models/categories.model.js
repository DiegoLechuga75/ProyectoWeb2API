const { Model, DataTypes } = require("sequelize");


const CATEGORIES_TABLE = "Categorias";

const CategoriesSchema = {
    id_categoria: {
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

class Categories extends Model {
    static associate() {
        // Define associations if necessary
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
