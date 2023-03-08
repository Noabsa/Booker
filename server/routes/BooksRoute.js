const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/BooksController");

router.post("/checkBookStatus", controller.checkBookStatus);
router.post("/change-state-to-true", controller.addBook);
router.post("/change-state-to-false", controller.deleteBook);

module.exports = router;
