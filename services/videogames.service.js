const boom = require('@hapi/boom');

const sequelize = require("../libs/sequelize");
const { models } = require("./../libs/sequelize");

class VideogamesService {

    constructor() {  }

    async create(data) {
        const newVideogame = await models.Videogames.create(data);
        return newVideogame;
    }

    async find() {
        const response = await models.Videogames.findAll();
        return response;
    }

    async findOne(id) {
        const videogame = await models.Videogames.findByPk(id);
        if(!videogame){
            throw boom.notFound("videogame not found");
        }
        return videogame;
    }

    async update(id, changes) {
        const videogame = this.findOne(id);
        const response = await videogame.update(changes);
        return response;
    }

    async delete(id) {
        const videogame = this.findOne(id);
        await videogame.destroy();
        return { id };
    }

}

module.exports = VideogamesService;