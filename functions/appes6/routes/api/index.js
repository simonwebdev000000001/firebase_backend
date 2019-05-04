 const router = require("express").Router();


 router.use("/user", require("./user"));
 router.use("/users", require("./users"));
 router.use("/tenants", require("./tenants"));
 router.use("/customers", require("./customers"));
 router.use("/settings", require("./settings"));
 router.use("/logs", require("./logs"));
 router.use("/devices", require("./devices"));

 module.exports = router;
