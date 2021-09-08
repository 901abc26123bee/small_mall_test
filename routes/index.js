var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index.ejs', { passing data to <% title %> in index.ejs});
  res.render('index', { title: 'Express' });
});

module.exports = router;
