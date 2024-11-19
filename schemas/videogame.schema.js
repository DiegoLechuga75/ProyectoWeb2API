const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const stock = Joi.number().integer().min(1);
const trailer = Joi.string().uri();

const createVideogameSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    image: image.required(),
    stock: stock.required(),
    trailer: trailer.required()
});

const updateVideogameSchema = Joi.object({
    name: name,
    price: price,
    image: image,
    trailer: trailer
});

const getVideogameSchema = Joi.object({
    id: id.required(),
});

module.exports = { createVideogameSchema, updateVideogameSchema, getVideogameSchema }