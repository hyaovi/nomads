const express = require("express");
const router = express.Router();
const User = require("../../models/Users");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
//@route  GET api/users/tests
// @description tests users routes
// @acesss Public
router.get("/test", (req, res) => {
  res.json({ message: "users works!" });
});

//@route  GET api/users/register
// @description handle registrations
// @acesss Public
router.post("/register", (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const avatar = gravatar.url(req.body.avatar, {
    size: "200",
    rating: "pg",
    default: "dd"
  });
  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      const newUser = new User({
        name,
        email,
        avatar,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save((err, user) => {
            err ? console.log(err) : res.json(user);
          });
        });
      });
    }
  });
});
module.exports = router;
