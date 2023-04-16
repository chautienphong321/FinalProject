const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const route = require('./routes');
const helpers = require('handlebars-helpers')();
const db = require('./db/index');
const methodOverride = require('method-override');
const { default: mongoose } = require('mongoose');
//const MongoStore = require('connect-mongo')(session);
const flash = require('req-flash');
const nodemailer = require('nodemailer');
require('dotenv').config();

db.connect();

const hbs = exphbs.create({  
  helpers:require('./ulti/helpers'),
  extname: '.hbs'
})

const app = express();

xPORT = process.env.PORT || 5000;


app.engine('hbs', hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, 'resources/views'))

app.use(session({
  secret: 'foo',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 180 * 60 * 1000}
}));
app.use(function(req, res, next){
  res.locals.session = req.session;
  next()
})

app.use(express.static(path.join(__dirname, 'public')))

app.use(morgan('combined'));

app.use(flash());

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'));

const Router = express.Router();


route(app);

app.listen(xPORT, () => {
  console.log(``)
  console.log(`Website is available on http://localhost:${xPORT}`)
})