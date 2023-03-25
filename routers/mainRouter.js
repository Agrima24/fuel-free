const express = require("express");
const router = express.Router();
const userRoute = require("./userRouter");
const productRoute = require("./productRouter");
const adminRoute = require("./adminRouter");
const vendorRoute = require("./vendorRouter");
const reviewRoute = require("./reviewRouter");
const cartRoute = require("./cartRouter");
const enquiryRoute = require('./enquiryRouter')

router.use("/user", userRoute);
router.use("/product", productRoute);
router.use("/admin", adminRoute);
router.use("/vendor", vendorRoute);
router.use("/review", reviewRoute);
router.use("/cart", cartRoute);
router.use('/enquiry',enquiryRoute)

module.exports = router;
