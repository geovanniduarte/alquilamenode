'use strict'

const crypto = require('crypto');
const HASH_KEY = 'alquila.me';

let encrypt = function(string) {
    return crypto.createHash('sha256').update(HASH_KEY).digest('hex');
}

module.exports.encrypt = encrypt;