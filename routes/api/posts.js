const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load post model
const Post = require("../../models/Post");

//Load post model
const Profile = require("../../models/Profile");

//load validations
const validatePostInput = require("../../validator/post");

//@route  GET api/posts/tests
// @description tests posts routes
// @acesss Public
router.get("/test", (req, res) => {
  res.json({ message: "posts works!" });
});

//@route  GET api/posts
// @description Gets all the posts
// @acesss Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.status(404).json({ posts: "No posts found" }));
});

//@route  GET api/posts/post_id
// @description Gets all the posts
// @acesss Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (!post) {
        return res.status(404).json({ posts: "No post found with this ID" });
      }
      res.json(post);
    })
    .catch(err =>
      res.status(404).json({ posts: "No post found with this ID" })
    );
});

//@route  GET api/posts/tests
// @description tests posts routes
// @acesss Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

//@route  DELETE api/posts/post_id
// @description Deletes the post with its ID
// @acesss Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id).then(post => {
          if (!post) {
            return res.status(404).json({ postnotfound: "Post not found" });
          } else {
            if (post.user.toString() !== req.user.id) {
              return res
                .status(401)
                .json({ notAuthorised: "User not authorized" });
            }
            post
              .remove()
              .then(() => res.json({ sucess: true }))
              .catch(err => {
                console.log("!!!!!!", err);
                res.status(404).json({ postnotfound: "Post not found" });
              });
          }
        });
      })
      .catch(err =>
        res.status(404).json({ posts: "No post found with this ID" })
      );
  }
);

//@route  POST api/posts/like/post_id
// @description Likes the post with its ID
// @acesss Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id).then(post => {
          //check if post exists
          if (!post) {
            return res.status(404).json({ postnotfound: "Post not found" });
          } else {
            //check if user already liked the post
            if (
              post.likes.filter(like => like.user == req.user.id).length > 0
            ) {
              return res
                .status(400)
                .json({ alreadyliked: "User already liked this post" });
            }
            post.likes.unshift({ user: req.user.id });
            post.save().then(post => res.json(post));
          }
        });
      })
      .catch(err =>
        res.status(404).json({ posts: "No post found with this ID" })
      );
  }
);

//@route  POST api/posts/unlike/post_id
// @description unlikes the post with its ID
// @acesss Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id).then(post => {
          //check if post exists
          if (!post) {
            return res.status(404).json({ postnotfound: "Post not found" });
          } else {
            if (
              //check if the user liked the post before unliking it
              post.likes.filter(like => like.user == req.user.id).length === 0
            ) {
              return res
                .status(400)
                .json({ Neverliked: "User didn't liked this post" });
            }
            //Get the like index from db
            const like_index = post.likes.findIndex(
              like => like.user == req.user.id
            );
            if (like_index > -1) {
              post.likes.splice(like_index, 1);
              post
                .save()
                .then(profile => res.json(profile))
                .catch(err => res.json(err));
            }
          }
        });
      })
      .catch(err =>
        res.status(404).json({ posts: "No post found with this ID" })
      );
  }
);

//@route  POST api/posts/comment/post_id
// @description Comments the post with its ID
// @acesss Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newComment = {
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    };
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id).then(post => {
          //check if post exists
          if (!post) {
            return res.status(404).json({ postnotfound: "Post not found" });
          }
          post.comments.unshift(newComment);
          post.save().then(post => res.json(post));
        });
      })
      .catch(err =>
        res.status(404).json({ posts: "No post found with this ID" })
      );
  }
);

//@route  POST api/posts/comment/
// @description Deletes commment from a post
// @acesss Private
router.post(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id).then(post => {
          //check if post exists
          if (!post) {
            return res.status(404).json({ postnotfound: "Post not found" });
          } else {
            //check if comment exists
            if (
              post.comments.filter(
                comment => comment._id.toString() === req.params.comment_id
              ).length === 0
            ) {
              return res
                .status(404)
                .json({ commentNotExists: "Comment doesn't exists" });
            }
            //Deletes comment
            const comment_index = post.comments.findIndex(
              comment => comment._id.toString() === req.params.comment_id
            );
            if (comment_index > -1) {
              post.comments.splice(comment_index, 1);
              post
                .save()
                .then(profile => res.json(profile))
                .catch(err => res.json(err));
            }
          }
        });
      })
      .catch(err =>
        res.status(404).json({ posts: "No post found with this ID" })
      );
  }
);

module.exports = router;
