const express = require("express");
const router = express.Router();

//@route  GET api/profile/tests
// @description tests profile routes
// @acesss Public
router.get("/test", (req, res) => {
  res.json({ message: "profile works!" });
});
module.exports = router;
