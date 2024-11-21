var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var { scheduleRun } = require("./plugins/plugin-schedule");

var userRouter = require("./routes/user");
var authRouter = require("./routes/auth");
var resultsRouter = require("./routes/results");

// Create email handler api:
// var contactEmailRouter = require("./plugins/ContactComponents/contactEmail");
var sendContactEmailRouter = require("./plugins/ContactComponents/sendContact-email");

require("dotenv").config();
var app = express();

tempDB = [];
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");

app.use(
  cors({
    origin: "/",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

//UPDATE ON PRODUCTION
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

require("./passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/results", resultsRouter);

// Create email handler api routes for express to use:
// app.use("/api/contactEmail", contactEmailRouter);
app.use("/api/sendContactEmail", sendContactEmailRouter);


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
} else {
  app.use(express.static(path.join(__dirname, "/client/public")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
  });
}
// running schedule
scheduleRun();
// catch 404 and forward to error handler

module.exports = app;
