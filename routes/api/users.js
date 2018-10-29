const express = require("express");
const router = express.Router();

//@route  GET api/users/tests
// @description tests users routes
// @acesss Public
router.get("/test", (req, res) => {
  res.json({ message: "users works!" });
});
module.exports = router;
