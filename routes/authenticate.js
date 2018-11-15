const express = require('express');
const router = express.Router();
const CustomError = require('../lib/CustomError');
const Usuario = require('../models/Usuario');
const Encrypt = require('../lib/Encrypt');
const jswt = require('jsonwebtoken');


router.post('/', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    
    if (username & password) {
        const users = await Usuario.consultar({username});
        if (users.lenght == 0) {
           let err = CustomError('ERR_USER_NOT_FOUND');
           err.status = 200;
           next(err);
           return;
        }

        let usuarioDB = users[0];
        let password = Encrypt.encrypt(password);
        if (usuarioDB == password) {
            jswt.sign({username, password}, process.env.SECRET, {expiresIn: process.env.EXPIRES_IN}, (err, token) => {
                if (err) {
                    let error = CustomError('ERR_TOKEN')
                    error.status = 200;
                    next(error);
                }
                res.json({success: true, usuario, token})
            })
        } else {
            let err = CustomError('ERR_USER_INVALID_PASS');
            err.status = 200;
            next(err);
        }
    } else {
        let err = CustomError('ERR_AUTH_BAD_REQUEST');
        err.status = 400;
        next(err)
    }
});