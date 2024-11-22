const Joi = require('joi');

const id_pedido = Joi.number().integer();
const id_videojuego = Joi.number().integer();
const cantidad = Joi.number().integer().min(1);
const precio = Joi.number().precision(2).min(0);


const createDetailsOrderSchema = Joi.object({
    id_pedido: id_pedido.required(),
    id_videojuego: id_videojuego.required(),
    cantidad: cantidad.required(),
    precio: precio.required(),
});

const updateDetailsOrderSchema = Joi.object({
    cantidad,
    precio,
});

const getDetailsOrderSchema = Joi.object({
    id_pedido: id_pedido.required(),
});

module.exports = { createDetailsOrderSchema, updateDetailsOrderSchema, getDetailsOrderSchema };
