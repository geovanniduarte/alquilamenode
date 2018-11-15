var express = require('express');
var router = express.Router();
const Usuario = require('../models/Usuario');
const jwtAuth = require('../lib/JwtAuth');
const encrypt = require('../lib/Encrypt');

router.post('/noauth', (req, res, next) => {
  const usuario = req.body
    var hashClave = encrypt.encrypt(usuario.password);
    usuario.password = hashClave;
    console.log(Usuario.guardar(usuario));
   
    Usuario.guardar(usuario).then((newUser) => {
        res.json({success: true, result: newUser});
    }).catch((err) => {
        res.json({success: false, error: err.message});
    });
});

//router.use(jwtAuth());

/* GET users listing. */
router.get('/', function(req, res, next) {
  const username = req.query.username;
  const sort = req.query.sort;

  const filter = {};
  if (username) {
      filter.username = username
  }
    Usuario.consultar(filter, sort).then((users) => {
      res.json({success: true, rows: users});
    });
});

router.post('/', (req, res, next) => {
  const usuario = req.body
    
    var hasClave = encrypt.encrypt(usuario.clave);
    usuario.password = hasClave;
    console.log(Usuario.guardar);

    Usuario.guardar(usuario).then((newUser) => {
        res.json({success: true, result: newUser});
    }).catch((err) => {
        res.json({success: false, error: err.message});
    });
});



module.exports = router;
