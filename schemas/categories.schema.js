const Joi = require('joi');

const id_categoria = Joi.number().integer();
const nombre = Joi.string().min(3).max(255);

const createCategorySchema = Joi.object({
    nombre: nombre.required(),
});

const updateCategorySchema = Joi.object({
    nombre,
});

const getCategorySchema = Joi.object({
    id_categoria: id_categoria.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema };
