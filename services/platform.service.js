const boom = require('@hapi/boom');

class PlatformService {
    constructor() { }

    async create(data) {
        const newPlatform = await models.Platform.create(data);
        return newPlatform;
    }

    async find() {
        const response = await models.Platform.findAll();
        return response;
    }

    async findOne(id) {
        const platform = await models.Platform.findByPk(id);
        if(!platform){
            throw boom.notFound("platform not found");
        }
        return platform;
    }

    async update(id, changes) {
        const platform = this.findOne(id);
        const response = await platform.update(changes);
        return response;
    }

    async delete(id) {
        const platform = this.findOne(id);
        await platform.destroy();
        return { id };
    }
}

module.exports = PlatformService;