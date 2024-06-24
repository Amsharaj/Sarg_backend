const express = require("express");
const router = express.Router();
const recordController = require("../controllers/recordController");

router.post("/grid-character/create", recordController.create);
router.get("/grid-characters/findAll", recordController.findAll);
router.put("/grid-character/update", recordController.update);
router.delete("/grid-characters/delete", recordController.delete);

router.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "ok", message: "SpreedSheet backend Service is running" });
});

module.exports = router;
