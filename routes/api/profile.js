const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load profile model
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route  GET api/profile/tests
// @description tests profile routes
// @acesss Public
router.get("/test", (req, res) => {
  res.json({ message: "profile works!" });
});

//@route  GET api/profile/
// @description get the current user profile
// @acesss Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const error = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          error.noprofile = "this user has no profile yet";
          res.status(404).json(error);
        }
        res.json(profile);
      })
      .catch(err => res.json(err));
  }
);

module.exports = router;
