var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
var nanoid = require('nanoid')



var indexRouter = require('./routes/index');
var buyerRouter = require('./routes/buyer');
var sellerRouter = require('./routes/seller');
var cartRouter = require('./routes/cart');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

// ---------------------------- page router ------------------------------
// 頁面轉跳
app.use('/', indexRouter);
app.use('/buyer', buyerRouter);
app.use('/seller', sellerRouter);
app.use('/cart', cartRouter);
app.use('/login', loginRouter);

// ---------------------------- database ------------------------------
// connect to database
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});
// 取得資料庫連線狀態
const db = mongoose.connection;
db.on('error', (err) => console.error('connection error', err)); // 連線異常
db.once('open', (db) => console.log('Connected to MongoDB')); // 連線成功

const itemsSchema = mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid()
  },
  name: String,
  price: Number,
  amount: Number
});

const Item = mongoose.model("Item", itemsSchema);

const skechers = new Item({
  name: "skechers",
  number: 6,
  price: 3000,
});

const nike = new Item({
  name: "nike",
  number: 5,
  price: 4000,
});

const defaultItems = [skechers, nike];

const ListSchema = {
  name: String,
  items: [itemsSchema],
};

const ItemList = mongoose.model("ItemList", ListSchema);



// ---------------------------- seller/crud ------------------------------


const getItemListFromDB = function(req, res) {
  Item.find({}, (err, foundItems) => {
    if(foundItems.length === 0){
      Item.insertMany(defaultItems, (err) => {
        if(err){
          console.log(err);
        }
        else{
          console.log("succesfully done! [1]");
        }
      })
    }
    if(err){
      console.log(err);
    }
    else{
      res.send(foundItems);
    }
  });
}

const deleteItemInDB = (req, res) => {
  let itemID = req.body.checkBox;
  const listName = req.body.listName;
  console.log(listName);
  if(listName === date.getDate()){
    Item.findByIdAndDelete(itemID, (err)=>{
      if(err){
        console.log(err);
      }
      else{
        console.log("succsesfuly deleted item");
        res.redirect("/");
      }
    });
  }
  else{
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: itemID} } }, (err, foundList)=>{
      if(err){
        console.log(err);
      }
      else{
        res.redirect("/" + listName);
      }
    });
  }
}

const test = function(req, res){
  // let para = req.param('url') || '';
  const itemId = req.param;
  res.send(itemId);
}
app.get("/seller/data", getItemListFromDB); // add
app.get("/seller/data/:itemId", test); // delete
app.post("/seller/data", ); // modified
app.get("/seller/data", ); // search

// app.delete("/seller/data", getItemListFromDB);



// ---------------------------- error handle ------------------------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
