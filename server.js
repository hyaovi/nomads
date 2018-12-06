const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//passport middleware
app.use(passport.initialize());

//passport configuration
require("./config/passport")(passport);

//connection to db with mongoose
const dbURI = require("./config/keys").mongodbURI;

//settings routes
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

mongoose.connect(
  dbURI,
  { useNewUrlParser: true },
  (err, db) => {
    if (err) {
      console.log(`WE GOT ISSUES: ${err} `);
    } else console.log("db connected!");
  }
);

app.get("/", (req, res) => {
  res.send("hello!");
});

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`we are live on ${port}`));
