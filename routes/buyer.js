var express = require('express');
var router = express.Router();

// path is defined in app.js
// http://localhost:3000/buyer/buyer
// router.get('/buyer', function(req, res, next){})

/* get users listing. */
// http://localhost:3000/buyer
router.get('/', function(req, res, next) {
  res.render('buyer',);
});

module.exports = router;
