const Joi = require('joi');

const id_pedido = Joi.number().integer();
const fecha_pedido = Joi.date();
const id_cliente = Joi.number().integer();
const total = Joi.number().precision(2).min(0);

const createOrderSchema = Joi.object({
    fecha_pedido: fecha_pedido.required(),
    id_cliente: id_cliente.required(),
    total: total.required(),
});

const updateOrderSchema = Joi.object({
    fecha_pedido,
    total,
});

const getOrderSchema = Joi.object({
    id_pedido: id_pedido.required(),
});

module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema };
