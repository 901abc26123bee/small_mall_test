var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
// var nanoid = require('nanoid')



var indexRouter = require('./routes/index');
var buyerRouter = require('./routes/buyer');
var sellerRouter = require('./routes/seller');
var cartRouter = require('./routes/cart');
var loginRouter = require('./routes/login');
var accountRouter = require('./routes/account');

var app = express();
const CRUD = require('./app/routes/note.routes.js')(app);

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
app.use('/account', accountRouter);
// ---------------------------- database ------------------------------
// connect to database
// mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect("mongodb://localhost:27017/easy-notes", {useNewUrlParser: true, useUnifiedTopology: true});
// 取得資料庫連線狀態
const db = mongoose.connection;
db.on('error', (err) => console.error('connection error', err)); // 連線異常
db.once('open', (db) => console.log('Connected to MongoDB')); // 連線成功



// ---------------------------- crud ------------------------------
// app.get("/seller/data", CRUD.post);

//#region

// const itemsSchema = mongoose.Schema({
//   _id: {
//     type: String,
//     default: () => nanoid()
//   },
//   name: String,
//   amount: Number,
//   price: Number,
// });

// const Item = mongoose.model("Item", itemsSchema);

// const skirt = new Item({
//   name: "skirt",
//   amount: 6,
//   price: 300,
// });

// const shirt = new Item({
//   name: "shirt",
//   amount: 5,
//   price: 400,
// });

// const defaultItems = [skirt, shirt];

// const ListSchema = {
//   name: String,
//   items: [itemsSchema],
// };

// const ItemList = mongoose.model("ItemList", ListSchema);



// const hat = new Item({
//   name: "hat",
//   amount: 7,
//   price: 100,
// });
// ---------------------------- seller/crud ------------------------------


// const getItemListFromDB = function(req, res) {
//   Item.find({}, (err, foundItems) => {
//     if(foundItems.length === 0){
//       Item.insertMany(defaultItems, (err) => {
//         if(err){
//           console.log(err);
//         }
//         else{
//           console.log("succesfully done! [1]");
//         }
//       })
//     }
//     if(err){
//       console.log(err);
//     }
//     else{
//       res.send(foundItems);
//       // res.render("buyer", {newListItems: foundItems});
//     }
//   });
// }

// done ----------------
//app.get("/seller/data", getItemListFromDB);

// not yet ----------------


//#endregion
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
