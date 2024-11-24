const express = require('express');
const passport = require('passport');

const OrderService = require("../services/orders.service");
const validatorHandler = require('./../middlewares/validator.handler');
const { checkRoles } = require('./../middlewares/auth.handler');
const { createOrderSchema, getOrderSchema } = require("../schemas/orders.schema");

const router = express.Router();
const service = new OrderService();

router.get('/',
    passport.authenticate('jwt', {session:false}),
    checkRoles('admin'),
    async (req, res) => {
        try {
            const orders = await service.find();
            res.json(orders);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id_pedido',
    passport.authenticate('jwt', {session:false}),
    checkRoles('admin', 'cliente'),
    validatorHandler(getOrderSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id_pedido } = req.params;
            const order = await service.findOne(id_pedido);
            res.json(order);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createOrderSchema, 'body'),
    passport.authenticate('jwt', {session:false}),
    async (req, res, next) => {
        try {
            const user = req.user;
            const body = {
                ...req.body,
                id_cliente: user.sub
            };
            console.log(body);
            const newOrder = await service.create(body);
            res.status(201).json(newOrder);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id_pedido',
    validatorHandler(getOrderSchema, 'params'),
    passport.authenticate('jwt', {session:false}),
    checkRoles('admin', 'cliente'),
    async (req, res, next) => {
        try {
            const { id_pedido } = req.params;
            await service.delete(id_pedido);
            res.status(201).json({ id_pedido });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;