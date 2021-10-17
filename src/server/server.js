const express = require('express');
const { sequelize } = require('./models/index');
const router = require('../../routes/route');

const app = express();

app.use(express.urlencoded({ extended: true}));

app.use(express.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(router);

sequelize.sync(); 

app.listen(8080);