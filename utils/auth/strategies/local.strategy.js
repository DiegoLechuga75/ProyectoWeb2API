const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');


const AuthService = require('./../../../services/auth.service');
const service = new AuthService();

const LocalStrategy = new Strategy({
        usernameField: 'correo',
        passwordField: 'contrasena'
    },
    async (correo, contrasena, done) => {
        try {
            const user = await service.getUser(correo, contrasena);
            done(null, user);
        } catch (error) {
            done(error, false);
        }
    }
);

module.exports = LocalStrategy;