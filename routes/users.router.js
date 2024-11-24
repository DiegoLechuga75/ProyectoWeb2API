const express = require('express');
const passport = require('passport');

const UserService = require('./../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { checkRoles } = require('./../middlewares/auth.handler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/user.schema');

const router = express.Router();
const service = new UserService();

router.get('/',
    passport.authenticate('jwt', {session:false}),
    checkRoles('admin'),
    async (req, res, next) => {
        try {
            const users = await service.find();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id_cliente',
    validatorHandler(getUserSchema, 'params'),
    passport.authenticate('jwt', {session:false}),
    checkRoles('admin', 'cliente'),
    async (req, res, next) => {
        try {
            const { id_cliente } = req.params;
            const category = await service.findOne(id_cliente);
            res.json(category);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newUser = await service.create(body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id_cliente',
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    passport.authenticate('jwt', {session:false}),
    checkRoles('admin', 'cliente'),
    async (req, res, next) => {
        try {
            const { id_cliente } = req.params;
            const body = req.body;
            const user = await service.update(id_cliente, body);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id_cliente',
    validatorHandler(getUserSchema, 'params'),
    passport.authenticate('jwt', {session:false}),
    checkRoles('admin', 'cliente'),
    async (req, res, next) => {
        try {
            const { id_cliente } = req.params;
            await service.delete(id_cliente);
            res.status(201).json({ id_cliente });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;