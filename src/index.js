const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const route = require("./routes");
const helpers = require("handlebars-helpers")();
const db = require("./config/db");
const methodOverride = require("method-override");
const { default: mongoose } = require("mongoose");
//const MongoStore = require('connect-mongo')(session);
const flash = require("express-flash");
const nodemailer = require("nodemailer");
const cookieParser = require("cookie-parser");
require("dotenv").config();

db.connect();

const hbs = exphbs.create({
  helpers: require("./utils/helpers"),
  extname: ".hbs",
});

const app = express();

xPORT = process.env.PORT || 8080;

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

app.use(
  session({
    secret: "secretpasstoken",
    resave: false,
    saveUninitialized: true,
    //store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 },
  })
);
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.use(morgan("combined"));

app.use(flash());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

route(app);

app.listen(xPORT, () => {
  console.log(``);
  console.log(`Website is available on http://localhost:${xPORT}`);
});
