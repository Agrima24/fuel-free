const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminController");
const { upload } = require("../midlewares/imageStorage");

router.post("/registration"
, upload.single("Pic")
, admin.Admin);

module.exports = router;
