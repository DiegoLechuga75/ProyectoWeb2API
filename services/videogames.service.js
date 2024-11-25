const boom = require('@hapi/boom');

const { models } = require("./../libs/sequelize");
const Sequelize = require('sequelize');

class VideogamesService {

    constructor() {  }

    async create(data) {
        const newVideogame = await models.Videogames.create(data);
        return newVideogame;
    }

    async find() {
        const response = await models.Videogames.findAll({
            include: ['platform', 'category']
        });
        return response;
    }

    async findOne(id) {
        const videogame = await models.Videogames.findByPk(id, {
            include: ['platform', 'category']
        });
        if(!videogame){
            throw boom.notFound("videogame not found");
        }
        return videogame;
    }

    async findByName(nombre) {
        const videogame = await models.Videogames.findOne({
            include: ['platform', 'category'],
            where: { nombre }
        });
        return videogame;
    }

    async findByFilters(filters) {
        const whereConditions = {};

        if (filters.nombre) {
            whereConditions.nombre = {
                [Sequelize.Op.substring]: `%${filters.nombre}`
            };
        }
    
        if (filters.id_plataforma) {
            whereConditions.id_plataforma = {
                [Sequelize.Op.like]: `%${filters.id_plataforma}`
            };
        }
    
        const videogames = await models.Videogames.findAll({
            where: whereConditions,
            include: ['platform', 'category'],
        });
    
        return videogames;
    }

    async update(id, changes) {
        const videogame = await this.findOne(id);
        const response = await videogame.update(changes);
        return response;
    }

    async delete(id) {
        const videogame = await this.findOne(id);
        await videogame.destroy();
        return { id };
    }

}

module.exports = VideogamesService;