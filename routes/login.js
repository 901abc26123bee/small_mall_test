var express = require('express');
var router = express.Router();

/* get users listing. */
// http://localhost:3000/login
router.get('/', function(req, res, next) {
  res.render('login',);
});

module.exports = router;