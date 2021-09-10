var express = require('express');
var router = express.Router();
// Bring in Models
let Data = require('../app/models/note.model')

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index.ejs', { passing data to <% title %> in index.ejs});
  // res.render('index', { title: 'Express' });
  Data.find({}, function(err, datas){
    if (err) {
      console.log(err)
    } else {
      //res.send(datas)
      res.render('index', { itemList: datas });
    }
  })
});

module.exports = router;
