const express = require('express');
const passport = require('passport');

const PlatformService = require('./../services/platform.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { checkRoles } = require('./../middlewares/auth.handler');
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

router.get('/:id_plataforma',
    validatorHandler(getPlatformSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id_plataforma } = req.params;
            const platform = await service.findOne(id_plataforma);
            res.json(platform);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createPlatformSchema, 'body'),
    passport.authenticate('jwt', {session:false}),
    checkRoles('admin'),
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

router.patch('/:id_plataforma',
    validatorHandler(getPlatformSchema, 'params'),
    validatorHandler(updatePlatformSchema, 'body'),
    passport.authenticate('jwt', {session:false}),
    checkRoles('admin'),
    async (req, res, next) => {
        try {
            const { id_plataforma } = req.params;
            const body = req.body;
            const platform = await service.update(id_plataforma, body);
            res.json(platform);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id_plataforma',
    validatorHandler(getPlatformSchema, 'params'),
    passport.authenticate('jwt', {session:false}),
    checkRoles('admin'),
    async (req, res, next) => {
        try {
            const { id_plataforma } = req.params;
            await service.delete(id_plataforma);
            res.status(201).json({ id_plataforma });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;