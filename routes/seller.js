var express = require('express');
var router = express.Router();

/* get users listing. */
// http://localhost:3000/seller
router.get('/', function(req, res, next) {
  res.render('seller',);
});

module.exports = router;