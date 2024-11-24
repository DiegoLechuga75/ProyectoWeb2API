const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require("./../libs/sequelize");

class UserService {
    constructor() { }

    async create(data) {
        const hash = await bcrypt.hash(data.contrasena, 10);
        const newUser = await models.User.create({
            ...data,
            contrasena: hash
        });
        delete newUser.dataValues.contrasena;
        return newUser;
    }

    async find() {
        const response = await models.User.findAll();
        return response;
    }

    async findByEmail(correo) {
        const response = await models.User.findOne({
            where: { correo }
        });
        return response;
    }

    async findOne(id) {
        const user = await models.User.findByPk(id, {
            include: ['orders'],
        });
        if(!user){
            throw boom.notFound("user not found");
        }
        return user;
    }

    async update(id, changes) {
        const user = await this.findOne(id);
        const response = await user.update(changes);
        return response;
    }

    async delete(id) {
        const user = await this.findOne(id);
        await user.destroy();
        return { id };
    }
}

module.exports = UserService;