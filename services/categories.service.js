const boom = require('@hapi/boom');

const { models } = require("./../libs/sequelize");

class CategoriesService {
    constructor() { }

    async create(data) {
        const newCategory = await models.Categories.create(data);
        return newCategory;
    }

    async find() {
        const response = await models.Categories.findAll();
        return response;
    }

    async findOne(id) {
        const category = await models.Categories.findByPk(id, {
            include: ['videogames'],
        });
        if(!category){
            throw boom.notFound("category not found");
        }
        return category;
    }

    async update(id, changes) {
        const category = await this.findOne(id);
        const response = await category.update(changes);
        return response;
    }

    async delete(id) {
        const category = await this.findOne(id);
        await category.destroy();
        return { id };
    }
}

module.exports = CategoriesService;