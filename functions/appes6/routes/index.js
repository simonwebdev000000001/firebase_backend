const router = require("express").Router();

const authenticate = require("../middleware/authenticate");

router.use("/api", authenticate.isAuth, require("./api"));

router.use("/auth", require("./auth"));

module.exports = router;
