const cartSchema = require("../models/cartModelSchema");

const addCart = async (req, res) => {
  try {
    const cartAdd = await new cartSchema(req.body);
    cartAdd.userID = req.params.uid;
    cartAdd.productID = req.params.pid;
    await cartAdd.save();
    res.status(201).json({
      success: "success",
      message: "Cart added successfully",
      cart: cartAdd,
    });
  } catch (err) {
    res.status(500).json({
      success: "failure",
      error: err.message,
    });
  }
};

module.exports = {
  addCart,
};
