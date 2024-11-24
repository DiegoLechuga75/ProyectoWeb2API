const Joi = require('joi');

const id_pedido = Joi.number().integer();
const forma_de_pago = Joi.string().valid('efectivo', 'tarjeta', 'transferencia');

const createOrderSchema = Joi.object({
    forma_de_pago: forma_de_pago.required(),
});

const getOrderSchema = Joi.object({
    id_pedido: id_pedido.required(),
});

module.exports = { createOrderSchema, getOrderSchema };
