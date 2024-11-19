const { User, UserSchema } = require("./user.model");
const { Platforms, PlatformsSchema } = require("./platforms.model");
const { Videogames, VideogamesSchema } = require("./videogames.model");
const { Orders, OrdersSchema } = require("./orders.model");
const { DetailsOrders, DetailsOrdersSchema } = require("./detailsOrders.model");

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Platforms.init(PlatformsSchema, Platforms.config(sequelize));
    Orders.init(OrdersSchema, Orders.config(sequelize));
    Videogames.init(VideogamesSchema, Videogames.config(sequelize));
    Orders.init(OrdersSchema, Orders.config(sequelize));
    DetailsOrders.init(DetailsOrdersSchema, DetailsOrders.config(sequelize));
}

module.exports = setupModels;
