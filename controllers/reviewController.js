const reviewSchema = require("../models/reviewModelSchema");

const createReview = async (req, res) => {
  try {
    const review = await new reviewSchema(req.body);
    review.productID = req.params.pId;
    review.userID = req.params.uId;
    await review.populate({
      path: "userID",
      select: "userName profilePic",
    });
    const info = await review.save();
    res.status(200).json({
      success: "success",
      message: "review successfully added",
      reviewData: info,
    });
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};

const editReview = async (req, res) => {
  try {
    const edit = await reviewSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: "success",
      message: "Edit review successfully",
      reviewEdit: edit,
    });
  } catch (err) {
    res.status(400).json({
      success: " failure",
      error: err.message,
    });
  }
};

const deleteReview = async (req, res) => {
  await reviewSchema.findByIdAndDelete(req.params.id);
  try {
    res.status(200).json({
      success: "success",
      message: "Delete review successfully",
      review_data: {},
    });
  } catch (err) {
    res.status(400).json({
      success: " failure",
      error: err.message,
    });
  }
};

const reviewList = async (req, res) => {
  try {
    const review = await reviewSchema.find({ productID: req.params.id });
    res.status(200).json({
      success: "success",
      message: "All reviews list",
      reviewList: review,
    });
  } catch (err) {
    res.status(400).json({
      success: " failure",
      error: err.message,
    });
  }
};

const detailReview = async (req, res) => {
  try {
    const detail = await reviewSchema.findById(req.params.id).populate({
      path: "productID",
      select: "productName",
    });
    res.status(200).json({
      success: "success",
      message: "here is the review",
      reviewDetail: detail,
    });
  } catch (err) {
    res.status(400).json({
      success: " failure",
      error: err.message,
    });
  }
};

module.exports = {
  createReview,
  editReview,
  deleteReview,
  reviewList,
  detailReview,
};
