const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { config } = require('./../configEnv/config.env');
const AuthService = require('./../services/auth.service');

const router = express.Router();
const service = new AuthService();

router.post('/login', 
    passport.authenticate('local', {session: false}),
    async (req, res, next) => {
        try {
            const user = req.user;
            res.json(service.signToken(user));
        } catch (error) {
            next(error);
        }
    }
);

router.post('/confirmation',
    async (req, res, next) => {
        try {
            const { correo } = req.body;
            const response = await service.sendConfirmation(correo);
            res.json(response);
        } catch (error) {
            next(error);
        }
    }
)

router.post('/confirmed',
    async (req, res, next) => {
        try {
            const { token } = req.body;
            const response = await service.confirmMail(token);
            res.json(response);
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router;