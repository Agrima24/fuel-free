const express = require("express");
const router = express.Router();
const vendor = require("../controllers/vendorController");
const auth = require("../midlewares/auth");
const validation = require('../validation/vendor/vendor_validation')
const { upload } = require("../midlewares/imageStorage");

router.post("/register", upload.single("vendorPic"),validation.vendorRegisterValidation ,vendor.vendorRegister);
router.post("/login",validation.vendorLoginValidation, vendor.vendorLogin);
router.get("/list", vendor.vendorList);

module.exports = router;
