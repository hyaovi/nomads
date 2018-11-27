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
          return res.status(404).json(error);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route  POST api/profile/
// @description Create user profile
// @acesss Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const error = {};
    const profileFields = {};
    profileFields.user = req.body.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.githubUsername)
      profileFields.githubUsername = req.body.githubUsername;

    //skill input conversion from csv into array
    if (typeof req.body.skills !== undefined) {
      profileFields.skills = req.body.skills.split(",");
    }
    //initialize social object
    profileFields.social = {};

    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.handle) profileFields.handle = req.body.handle;

    //Update profile
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          error.handle = "handle already exits";
          if (profile) {
            res.status(400).json(error);
          } else {
            new Profile(profileFields)
              .save()
              .then(profile => res.json(profile));
          }
        });
      }
    });
  }
);

module.exports = router;
