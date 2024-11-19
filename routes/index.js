const express = require('express');

const videogamesRouter = require('./videogames.router');
const platformRouter = require('./platform.router');
const usersRouter = require('./users.router');
const orderRouter = require('./orders.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/videogames', videogamesRouter);
    router.use('/platform', platformRouter);
    router.use('/users', usersRouter);
    router.use('/orders', orderRouter);
}

module.exports = routerApi;