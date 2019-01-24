const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const validateRegisterInput = require("../../validator/register");
const validateLoginInput = require("../../validator/login");

//@route  GET api/users/tests
// @description tests users routes
// @acesss Public
router.get("/test", (req, res) => {
  res.json({ message: "users works!" });
});

//@route  POST api/users/register
// @description handle registrations
// @acesss Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const avatar = gravatar.url(req.body.avatar, {
    size: "200",
    rating: "pg",
    default: "mm"
  });
  User.findOne({ email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name,
        email,
        avatar,
        password
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

//@route  POST api/users/login
// @description checks the user credentials and return a token
// @acesss Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.json({ message: err });
    }
    if (!user) {
      errors.email = "user not found";
      res.status(404).json(errors);
    } else {
      bcrypt
        .compare(password, user.password)
        .then(sucess => {
          if (sucess) {
            //password matched!
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            };
            jwt.sign(
              payload,
              keys.secret,
              { expiresIn: 10800 },
              (err, token) => {
                if (err) {
                  console.log(err);
                }
                res.json({ sucess: "true", token: `Bearer ${token}` });
              }
            );
          } else {
            errors.password = "Password incorrect!";
            res.status(400).json(errors);
          }
        })
        .catch(err => res.status(400).json({ message: err }));
    }
  });
});

//@route  GET api/users/current
// @description return user page after authentication
// @acesss Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id, name, email, avatar } = req.user;
    res.json({ id, name, email, avatar });
  }
);

module.exports = router;
