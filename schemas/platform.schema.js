const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();

const createPlatformSchema = Joi.object({
    name: name.required(),
    image: image.required()
});

const updatePlatformSchema = Joi.object({
    name: name,
    image: image
});

const getPlatformSchema = Joi.object({
    id: id.required(),
});

module.exports = { createPlatformSchema, updatePlatformSchema, getPlatformSchema }