const Joi = require('joi');

const id_plataforma = Joi.number().integer();
const nombre = Joi.string().max(255);
const img = Joi.string().uri();

const createPlatformSchema = Joi.object({
    nombre: nombre.required(),
    img: img.required()
});

const updatePlatformSchema = Joi.object({
    nombre,
    img
});

const getPlatformSchema = Joi.object({
    id_plataforma: id_plataforma.required(),
});

module.exports = { createPlatformSchema, updatePlatformSchema, getPlatformSchema };