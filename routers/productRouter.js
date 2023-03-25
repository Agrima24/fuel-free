const express = require("express");
const router = express.Router();
const product = require("../controllers/productController");
const { upload } = require("../midlewares/imageStorage");

router.post("/create/:id", upload.array("productImage", 10), product.productCreate);
router.get("/list", product.productList);
router.get("/details/:id", product.productDetails);
router.get("/filter", product.productFilterByRange);
router.get("/filterByVehicle", product.productFilterByVehicleType);
router.get("/filterByName", product.productFilterByName);
router.get("/filterByBrand", product.productFilterByBrand);
router.get("/filterBycity", product.productFilterByCity);
router.get("/compare/:id1/:id2", product.productComparison);
router.patch("/edit/:id", product.productEdit);
router.delete("/delete/:id", product.productDelete);
router.get("/filterByall", product.productFilter);

module.exports = router;
