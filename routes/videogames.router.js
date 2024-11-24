const express = require('express');
const passport = require('passport');

const VideogamesService = require('./../services/videogames.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { checkRoles } = require('./../middlewares/auth.handler');
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

router.get('/:id_videojuego',
    validatorHandler(getVideogameSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id_videojuego } = req.params;
            const videogame = await service.findOne(id_videojuego);
            res.json(videogame);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createVideogameSchema, 'body'),
    passport.authenticate('jwt', {session:false}),
    checkRoles('admin'),
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

router.patch('/:id_videojuego',
    validatorHandler(getVideogameSchema, 'params'),
    validatorHandler(updateVideogameSchema, 'body'),
    passport.authenticate('jwt', {session:false}),
    checkRoles('admin'),
    async (req, res, next) => {
        try {
            const { id_videojuego } = req.params;
            const body = req.body;
            const videogame = await service.update(id_videojuego, body);
            res.json(videogame);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id_videojuego',
    validatorHandler(getVideogameSchema, 'params'),
    passport.authenticate('jwt', {session:false}),
    checkRoles('admin'),
    async (req, res, next) => {
        try {
            const { id_videojuego } = req.params;
            await service.delete(id_videojuego);
            res.status(201).json({ id });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;