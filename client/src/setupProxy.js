const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    proxy("api", { target: "https://pure-river-53753.herokuapp.com/api" })
  );
};
