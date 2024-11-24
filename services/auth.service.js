const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { models } = require("./../libs/sequelize");
const { config } = require('./../configEnv/config.env');
const UserService = require('./user.service');
const { use } = require('passport');
const { text } = require('express');

const service = new UserService();

class AuthService {
    constructor() { }

    async getUser(correo, contrasena) {
        const user = await service.findByEmail(correo);
        if (!user) {
            throw boom.unauthorized();
        }
        const dbPassword = user.contrasena;
        const isMatch = await bcrypt.compare(contrasena, dbPassword);
        if (!isMatch) {
            throw boom.unauthorized();
        }
        delete user.dataValues.contrasena;
        return user;
    }

    signToken(user) {
        const payload = {
            sub: user.id_cliente,
            role: user.rol
        }
        const token = jwt.sign(payload, config.jwtSecret)
        return {
            user,
            token
        };
    }

    async sendConfirmation (email) {
        const user = await service.findByEmail(email);
        if(!user){
            throw boom.unauthorized();
        }
        const payload = {
            sub: user.id_cliente,
        }
        const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
        const link = `http://127.0.0.1:5500/confirm?token=${token}`;
        await service.update(user.id_cliente, { token_confirmacion: token })
        const mail = {
            form: "Proyecto Web 2 <web2@gmail.com>",
            to: `${email}`,
            subject: "Confirmación de correo ✔",
            html: `<p>Ingresa al siguiente link para confirmar tu correo => ${link}</p>`,
        }
        const response = await this.sendMail(mail);
        return response;
    }

    async sendMail(infoMail) {
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: config.mailtrapUser,
                pass: config.mailtrapPassword
            }
        });
        await transport.sendMail(infoMail);
        return { message: 'Mail sent!'}
    }

    async confirmMail(token){
        try {
            const payload = jwt.verify(token, config.jwtSecret);
            const user = await service.findOne(payload.sub);
            if (user.token_confirmacion !== token){
                throw boom.unauthorized();
            }
            await service.update(user.id_cliente, {token_confirmacion: null, confirmado: true});
            return { message: 'email confirmado'};
        } catch (error) {
            throw boom.unauthorized();
        }
    }
}

module.exports = AuthService;