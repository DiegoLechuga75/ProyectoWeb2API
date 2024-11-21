const Joi = require('joi');

const id_plataforma = Joi.number().integer();
const nombre = Joi.string().min(3).max(255);

const createPlatformSchema = Joi.object({
    nombre: nombre.required(),
});

const updatePlatformSchema = Joi.object({
    nombre,
});

const getPlatformSchema = Joi.object({
    id_plataforma: id_plataforma.required(),
});

module.exports = { createPlatformSchema, updatePlatformSchema, getPlatformSchema };