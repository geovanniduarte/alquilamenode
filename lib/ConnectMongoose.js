'use strict'

const mongoose = require('mongoose');

const conn = mongoose.connection;

conn.on('open', () => {
    console.log(`onectado a mongo en ${mongoose.connection.name}`);
});

mongoose.connect('mongodb://localhost/alquilame', {
    useMongoClient: true
});

module.exports = conn;