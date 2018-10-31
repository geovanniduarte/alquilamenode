'use strict'

const jwt = require('jsonwebtoken');
const CustomError = require('../lib/CustomError');


module.exports = () => {
    return function(req, res, next) {       

        const token = req.query.token || req.body.token || req.params.token || req.get('x-access-token');
        if (!token) {
            const customError = new CustomError('ERR_NO_TOKEN')
            customError.status = 401;
            next(customError);
            return
        }

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
              const  tokenError = new CustomError('ERR_TOKEN');
              tokenError.status = 401;
              next(tokenError);
              return;
            }

           req.userId = decoded.user_id;
           next();
        });

    }
}