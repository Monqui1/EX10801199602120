var express = require('express');
var router = express.Router();

var seguridadRouter = require('./seguridad/seguridad');


router.use('/seguridad', seguridadRouter);


router.get('/version', function(req, res){
  res.status(200).json({"version":"API v1.0"});
} );


module.exports = router;
