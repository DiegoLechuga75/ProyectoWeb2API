const express = require('express');

const videogamesRouter = require('./videogames.router');
const platformRouter = require('./platform.router');
const usersRouter = require('./users.router');
const orderRouter = require('./orders.router');
const detailsOrderRouter = require('./detailsOrder.router');
const categoriesRouter = require('./categories.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');



function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/videogames', videogamesRouter);
    router.use('/platform', platformRouter);
    router.use('/users', usersRouter);
    router.use('/orders', orderRouter);
    router.use('/detailsOrder', detailsOrderRouter);
    router.use('/categories', categoriesRouter);
    router.use('/auth', authRouter);
    router.use('/profile', profileRouter);
}

module.exports = routerApi;