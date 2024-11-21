const Joi = require('joi');

const id_videojuego = Joi.number().integer();
const nombre = Joi.string().min(3).max(255);
const precio = Joi.number().precision(2).min(0);
const fecha_lanzamiento = Joi.date();
const stock = Joi.number().integer().min(0);
const id_plataforma = Joi.number().integer();
const id_categoria = Joi.number().integer();
const precio_real = Joi.number().precision(2).min(0);

const createVideogameSchema = Joi.object({
    nombre: nombre.required(),
    precio: precio.required(),
    fecha_lanzamiento: fecha_lanzamiento,
    stock: stock.required(),
    id_plataforma: id_plataforma.required(),
    id_categoria: id_categoria.required(),
    precio_real: precio_real.required()
});

const updateVideogameSchema = Joi.object({
    nombre,
    precio,
    fecha_lanzamiento,
    stock,
    id_plataforma,
    id_categoria,
    precio_real
});

const getVideogameSchema = Joi.object({
    id_videojuego: id_videojuego.required(),
});

module.exports = { createVideogameSchema, updateVideogameSchema, getVideogameSchema };
