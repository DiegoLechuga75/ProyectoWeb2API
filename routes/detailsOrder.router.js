const express = require('express');
const DetailsOrderService = require("../services/detailsOrder.service");
const validatorHandler = require('../middlewares/validator.handler');
const { createDetailsOrderSchema, updateDetailsOrderSchema, getDetailsOrderSchema } = require("../schemas/detailsOrder.schema");

const router = express.Router();
const service = new DetailsOrderService();

router.get('/', async (req, res) => {
    try {
        const details = await service.find();
        res.json(details);
    } catch (error) {
        next(error);
    }
});

router.get('/:id',
    validatorHandler(getDetailsOrderSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const details = await service.findOne(id);
            res.json(details);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createDetailsOrderSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newDetails = await service.create(body);
            res.status(201).json(newDetails);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validatorHandler(getDetailsOrderSchema, 'params'),
    validatorHandler(updateDetailsOrderSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const details = await service.update(id, body);
            res.json(details);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getDetailsOrderSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.status(201).json({ id });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;