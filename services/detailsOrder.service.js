const boom = require('@hapi/boom');

const { models } = require("./../libs/sequelize");

class DetailsOrderService {
    constructor() { }

    async create(data) {
        const newDetails = await models.DetailsOrders.create(data);
        return newDetails;
    }

    async find() {
        const response = await models.User.findAll({
            include: ['videogame'],
        });
        return response;
    }

    async findOne(id) {
        const details = await models.DetailsOrders.findByPk(id);
        if(!details){
            throw boom.notFound("details not found");
        }
        return details;
    }

    async update(id, changes) {
        const details = this.findOne(id);
        const response = await details.update(changes);
        return response;
    }

    async delete(id) {
        const details = this.findOne(id);
        await details.destroy();
        return { id };
    }
}

module.exports = DetailsOrderService;