var express = require('express');
var router = express.Router();

/* get users listing. */
// http://localhost:3000/cart
router.get('/', function(req, res, next) {
  res.render('cart',);
});

module.exports = router;