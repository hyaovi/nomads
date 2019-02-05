const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const passport = require("passport");

//load validations
const validateProfileInput = require("../../validator/profile");
const validateExperienceInput = require("../../validator/experience");
const validateEducationInput = require("../../validator/education");

//Load profile model
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route  GET api/profile/tests
// @description tests profile routes
// @acesss Public
router.get("/test", (req, res) => {
  res.json({ message: "profile works!" });
});

//@route  POST api/profile/
// @description Create or update existing user profile
// @acesss Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.location) profileFields.location = req.body.location;
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

    //Check profile then update or create one
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          errors.handle = "handle already exits";
          if (profile) {
            res.status(400).json(errors);
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

//@route POST api/profile/experience
// @description update or create the user's experience fields
// @acesss Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExperience = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        title: req.body.title,
        description: req.body.description,
        current: req.body.current
      };
      profile.experience.unshift(newExperience);
      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.status(400).json(err));
    });
  }
);

//@route POST api/profile/education
// @description update or create the user's experience fields
// @acesss Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEducation = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      profile.education.unshift(newEducation);
      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.status(400).json(err));
    });
  }
);

//@route DELETE api/profile/experience/:experience_id
// @description update or create the user's experience fields
// @acesss Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);
//BUGGY ROUTE
// router.delete(
//   "/experience/:experience_id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id })
//       .then(profile => {
//         //Get the experience index from db
//         const experience_index = profile.experience.findIndex(
//           item => item.id == req.params.experience_id
//         );
//         //Get remove index
//         if (experience_index > -1) {
//           profile.experience.splice(experience_index, 1);
//           profile
//             .save()
//             .then(profile => res.json(profile))
//             .catch(err => res.json(err));
//         }
//       })
//       .catch(err => res.status(404).json(err));
//   }
// );

//@route DELETE api/profile/education/:education_id
// @description update or create the user's education fields
// @acesss Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route DELETE api/profile/
// @description delete profile and user
// @acesss Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ delete: true })
      );
    });
  }
);

//@route  GET api/profile/handle/:handle
// @description get the current user profile by the handle
// @acesss Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//@route  GET api/user/user_id
// @description get the current user profile by user's id
// @acesss Public
router.get("/userID/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(400).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(400).json({ profile: "There is no profile for this user" })
    );
});

//@route  GET api/profile/
// @description get the current user profile with tokens
// @acesss Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "this user has no profile yet";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);
//@route  GET api/profile/all
// @description get all the profile
// @acesss Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find({})
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(400).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(400).json({ profile: "There is no profile for this user" })
    );
});

module.exports = router;
