require("dotenv").config();
const keys = {
  mongodbURI: process.env.mongodbURI,
  secret: process.env.secret
};
module.exports = keys;
