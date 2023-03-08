const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/UserController");
router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/tokenVerify", controller.tokenVerification);
router.post("/getData", controller.getUserData);
router.post("/delete", controller.deleteUser);

module.exports = router;
