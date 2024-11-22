const { Sequelize } = require("sequelize");

const { config } = require("./../configEnv/config.env");
const setupModels = require("../db/models");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
    dialect: 'mysql',
    logging: true,
})

setupModels(sequelize);

const syncTables = async (sequelize) => {
    await sequelize.sync()
}

syncTables(sequelize);

module.exports = sequelize;