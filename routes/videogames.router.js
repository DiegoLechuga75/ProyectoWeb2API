const express = require('express');

const VideogamesService = require('./../services/videogames.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createVideogameSchema, updateVideogameSchema, getVideogameSchema } = require('./../schemas/videogame.schema');

const router = express.Router();
const service = new VideogamesService();

router.get('/', async (req, res, next) => {
    try {
        const videogames = await service.find();
        res.json(videogames);
    } catch (error) {
        next(error);
    }
});

router.get('/:id',
    validatorHandler(getVideogameSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const videogame = await service.findOne(id);
            res.json(videogame);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createVideogameSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newVideogame = await service.create(body);
            res.status(201).json(newVideogame);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validatorHandler(getVideogameSchema, 'params'),
    validatorHandler(updateVideogameSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const videogame = await service.update(id, body);
            res.json(videogame);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getVideogameSchema, 'params'),
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