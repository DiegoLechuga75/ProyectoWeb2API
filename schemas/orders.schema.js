const Joi = require('joi');

const idOrder = Joi.string();
const date = Joi.date();
const idClient = Joi.string();
const total = Joi.string().min(1);
const products = Joi.array();
const address = Joi.string();

const createOrderSchema = Joi.object({
    idOrder: idOrder.required(),
    date: date.required(),
    idClient: idClient.required(),
    total: total.required(),
    products: products.required(),
    address: address.required()
});

const updateOrderSchema = Joi.object({
    total: total,
    products: products,
    address: address
});

const getOrderSchema = Joi.object({
    idOrder: idOrder.required(),
});

module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema }