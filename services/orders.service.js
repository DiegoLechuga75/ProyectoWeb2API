const boom = require('@hapi/boom');

const { models } = require("./../libs/sequelize");

class OrderService {
    constructor() { }

    async create(data) {
        const newOrder = await models.Orders.create(data);
        return newOrder;
    }

    async find() {
        const response = await models.Orders.findAll();
        return response;
    }

    async findOne(id) {
        const order = await models.Orders.findByPk(id, {
            include: ['items']
        });
        if(!order){
            throw boom.notFound("order not found");
        }
        return order;
    }

    async update(id, changes) {
        const order = await this.findOne(id);
        const response = await order.update(changes);
        return response;
    }

    async delete(id) {
        const order = await this.findOne(id);
        await order.destroy();
        return { id };
    }
}

module.exports = OrderService;