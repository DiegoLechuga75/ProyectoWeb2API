const express = require('express');
const CategoriesService = require("./../services/categories.service");
const validatorHandler = require('./../middlewares/validator.handler');
const { checkRoles } = require('./../middlewares/auth.handler');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { getCategorySchema, updateCategorySchema, createCategorySchema } = require('./../schemas/categories.schema');

const router = express.Router();
const service = new CategoriesService();

router.get('/', async (req, res) => {
    try {
        const categories = await service.find();
        res.json(categories);
    } catch (error) {
        next(error);
    }
});

router.get('/:id_categoria',
    validatorHandler(getCategorySchema, 'params'),
    async (req, res, next) => {
        try {
            const { id_categoria } = req.params;
            const category = await service.findOne(id_categoria);
            res.json(category);
        } catch (error) {
            next(error);
        }
    }
);

//Para usar checkRoles debemos incluir con anterioridad passport.authenticate para verificar el jwt en la petición
router.post('/',
    validatorHandler(createCategorySchema, 'body'),
    passport.authenticate('jwt', {session:false}),
    checkRoles('admin'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newCategory = await service.create(body);
            res.status(201).json(newCategory);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id_categoria',
    validatorHandler(getCategorySchema, 'params'),
    validatorHandler(updateCategorySchema, 'body'),
    passport.authenticate('jwt', {session:false}),
    checkRoles('admin'),
    async (req, res, next) => {
        try {
            const { id_categoria } = req.params;
            const body = req.body;
            const category = await service.update(id_categoria, body);
            res.json(category);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id_categoria',
    validatorHandler(getCategorySchema, 'params'),
    passport.authenticate('jwt', {session:false}),
    checkRoles('admin'),
    async (req, res, next) => {
        try {
            const { id_categoria } = req.params;
            await service.delete(id_categoria);
            res.status(201).json({ id_categoria });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;