const { User, UserSchema } = require("./user.model");
const { Platforms, PlatformsSchema } = require("./platforms.model");
const { Videogames, VideogamesSchema } = require("./videogames.model");
const { Orders, OrdersSchema } = require("./orders.model");
const { DetailsOrders, DetailsOrdersSchema } = require("./detailsOrders.model");
const { Categories, CategoriesSchema } = require("./categories.model");

function setupModels(sequelize) {
    //Inicialización de modelos
    User.init(UserSchema, User.config(sequelize));
    Platforms.init(PlatformsSchema, Platforms.config(sequelize));
    Videogames.init(VideogamesSchema, Videogames.config(sequelize));
    Orders.init(OrdersSchema, Orders.config(sequelize));
    DetailsOrders.init(DetailsOrdersSchema, DetailsOrders.config(sequelize));
    Categories.init(CategoriesSchema, Categories.config(sequelize));

    //Relaciones modelos
    User.associate(sequelize.models);
    Platforms.associate(sequelize.models);
    Categories.associate(sequelize.models);
    Videogames.associate(sequelize.models);
    Orders.associate(sequelize.models);
    DetailsOrders.associate(sequelize.models);
}

module.exports = setupModels;
