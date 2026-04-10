let router = require("express").Router();

router.use("/user", require("./user"));
router.use("/users", require("./user")); // Alias: frontend uses /api/users

router.use("/class", require("./class"));

router.use("/subject", require("./subject"));

router.use("/file", require("./file"));

router.use("/schedule", require("./schedule"));

router.use("/complaint", require("./complaint"));

router.use("/upload", require("./upload"));

router.use("/notification", require("./notification"));

router.use("/faculty", require("./faculty"));

module.exports = router;
