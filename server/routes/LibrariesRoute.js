const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/LibraryController");

router.post("/favourites", controller.libraryUser);
router.post("/bookmarked", controller.libraryUser);
router.post("/read", controller.libraryUser);
router.post("/change-state-to-false", controller.deleteBook);

module.exports = router;
