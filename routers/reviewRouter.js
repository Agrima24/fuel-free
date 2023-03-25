const express = require("express");
const router = express.Router();
const review = require("../controllers/reviewController");

router.post("/create/:pId/:uId", review.createReview);
router.patch("/review_edit/:id", review.editReview);
router.delete("/review_delete/:id", review.deleteReview);
router.get("/review_list/:id", review.reviewList);
router.get("/review_detail/:id", review.detailReview);

module.exports = router;
