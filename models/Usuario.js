'use strict'

//import { Observable, onErrorResumeNext } from 'rxjs';
const mongoose = require('mongoose');
const CustomError = require('./../lib/CustomError');

const userSchema = mongoose.Schema({
    username: String,
    email: {type: String, index: true},
    password: String
});

userSchema.statics.guardar = function(usuarioData) {
    console.log('guardar', usuarioData);
    let promise =  new Promise((resolve, reject) => {
        const usuario  = new Usuario(usuarioData);
        usuario.save((err, newUsuario) => {
            if (err) {
                const myErr = CustomError('ERR_NOT_SAVED')
                reject(err);
            }
            resolve(newUsuario);
        });
    });
    console.log('guardar', promise);
    return promise;
}

userSchema.statics.consultar = function(filter, limit, sort) {
    const query = Usuario.find(filter);
    query.limit(limit);
    query.sort(sort);
    return query.exec();
}

const Usuario = mongoose.model('Usuario', userSchema);

module.exports = Usuario