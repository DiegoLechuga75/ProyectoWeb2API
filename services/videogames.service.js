const boom = require('@hapi/boom');

const sequelize = require("../libs/sequelize");
const { query } = require('express');

class VideogamesService {

    constructor() {
        this.videogames = [];
    }

    async create(data) {
        return data;
    }

    async find() {
        const query = "SELECT * FROM videojuegos"
        const [data] = await sequelize.query(query);
        return data
    }

    async findOne(id) {
        return { id };
    }

    async update(id, changes) {
        return {
            id,
            changes
        };
    }

    async delete(id) {
        return { id };
    }

}

module.exports = VideogamesService;