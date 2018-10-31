'use strict'

const i18n = require('i18n');
const myModule = {};

i18n.configure({
   locales: ['en','es'],
   directory: __dirname + '/locales',
   register: myModule
})

module.exports = myModule;