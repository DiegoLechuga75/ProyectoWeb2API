const express = require('express');

const PlatformService = require('./../services/platform.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createPlatformSchema, updatePlatformSchema, getPlatformSchema } = require('./../schemas/platform.schema');

const router = express.Router();
const service = new PlatformService();

router.get('/', async (req, res, next) => {
    try {
        const categories = await service.find();
        res.json(categories);
    } catch (error) {
        next(error);
    }
});

router.get('/:id',
    validatorHandler(getPlatformSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const platform = await service.findOne(id);
            res.json(platform);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createPlatformSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newPlatform = await service.create(body);
            res.status(201).json(newPlatform);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validatorHandler(getPlatformSchema, 'params'),
    validatorHandler(updatePlatformSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const platform = await service.update(id, body);
            res.json(platform);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getPlatformSchema, 'params'),
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