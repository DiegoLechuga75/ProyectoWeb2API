const Joi = require('joi');

const id_videojuego = Joi.number().integer();
const nombre = Joi.string().min(3).max(255);
const precio = Joi.number().precision(2).min(0);
const img = Joi.string().uri();
const trailer = Joi.string().uri();
const description = Joi.string();
const stock = Joi.number().integer().min(0);
const id_plataforma = Joi.number().integer();
const id_categoria = Joi.number().integer();
const precio_real = Joi.number().precision(2).min(0);

const createVideogameSchema = Joi.object({
    nombre: nombre.required(),
    precio: precio.required(),
    img: img.required(),
    trailer: trailer.required(),
    description: description.required(),
    stock: stock.required(),
    id_plataforma: id_plataforma.required(),
    id_categoria: id_categoria.required(),
    precio_real: precio_real.required()
});

const updateVideogameSchema = Joi.object({
    nombre,
    precio,
    img,
    trailer,
    description,
    stock,
    id_plataforma,
    id_categoria,
    precio_real
});

const getVideogameSchema = Joi.object({
    id_videojuego: id_videojuego.required(),
});

module.exports = { createVideogameSchema, updateVideogameSchema, getVideogameSchema };
