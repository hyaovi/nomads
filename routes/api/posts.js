const express = require("express");
const router = express.Router();

//@route  GET api/posts/tests
// @description tests posts routes
// @acesss Public
router.get("/test", (req, res) => {
  res.json({ message: "posts works!" });
});
module.exports = router;
