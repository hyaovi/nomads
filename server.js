const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
