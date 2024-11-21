const Joi = require('joi');

const id_pedido = Joi.number().integer();
const id_videojuego = Joi.number().integer();
const cantidad = Joi.number().integer().min(1);
const precio = Joi.number().precision(2).min(0);
const forma_de_pago = Joi.string().valid('efectivo', 'tarjeta', 'transferencia');

const createDetailsOrderSchema = Joi.object({
    id_pedido: id_pedido.required(),
    id_videojuego: id_videojuego.required(),
    cantidad: cantidad.required(),
    precio: precio.required(),
    forma_de_pago: forma_de_pago.required(),
});

const updateDetailsOrderSchema = Joi.object({
    cantidad,
    precio,
    forma_de_pago,
});

const getDetailsOrderSchema = Joi.object({
    id_pedido: id_pedido.required(),
    id_videojuego: id_videojuego.required(),
});

module.exports = { createDetailsOrderSchema, updateDetailsOrderSchema, getDetailsOrderSchema };
