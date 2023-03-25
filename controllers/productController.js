const productSchema = require("../models/productModelSchema");
const reviewSchema = require("../models/reviewModelSchema");

const productCreate = async (req, res) => {
  const product_Data = await new productSchema(req.body)
  product_Data.vendorID = req.params.id
  try {
    const filepath = req.files.map(({ filename }) => `/uploads/${filename}`);
    product_Data.productImage = filepath;
    const result = await product_Data.save();
    res.status(200).json({
      status: "Success",
      message: " product add succesfully",
      product_Data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: err.message,
    });
  }
};

const productList = async (req, res) => {
  try {
    const list = await productSchema.find();
    const counted = await productSchema.count();
    res.status(200).json({
      success: "success",
      message: "All product list",
      totalProduct: counted,
      List: list,
    });
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};

const productDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productSchema.findById(id);
    const review = await reviewSchema
      .find({ productID: id })
      .sort({ createdAt: -1 })
      .populate("userID", { userName: 1, profilePic: 1, createdAt: 1, _id: 0 });
    res.status(200).json({
      success: "success",
      productDetails: product,
      reviewDetails: review,
    });
  } catch (err) {
    res.status(500).json({
      success: "failure",
      error: err.message,
    });
  }
};

const productFilterByRange = async (req, res) => {
  try {
    const minValue = req.body.minValue;
    const maxValue = req.body.maxValue;
    const products = await productSchema
      .find({ productPrice: { $gte: minValue, $lte: maxValue } })
      .sort({ productPrice: -1 });
    if (products) {
      res.status(200).json({
        success: "success",
        message: "Here are all the products between your selected range",
        fiter: products,
      });
    } else {
      res.status(402).json({
        success: "failure",
        message: "There are no products of this range",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};

const productFilterByVehicleType = async (req, res) => {
  const VehicleType = req.body.VehicleType;
  try {
    const query = {
      VehicleType: { $regex: VehicleType, $options: "i" },
    };
    const vehicleType = await productSchema.find(query);
    if (vehicleType[0] === undefined) {
      res.status(400).json({
        success: "failure",
        message: "No product found",
      });
    } else {
      res.status(200).json({
        success: "success",
        message: "Here are all the products related to your search",
        type: vehicleType,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};

const productFilterByName = async (req, res) => {
  const productName = req.body.productName;
  try {
    const query = { productName: { $regex: productName, $options: "i" } };
    const search = await productSchema.find(query);
    if (search[0] === undefined) {
      res.status(400).json({
        success: "failure",
        message: "No product found",
      });
    } else {
      res.status(200).json({
        success: "success",
        message: "Here are all the products related to your search",
        searchedProduct: search,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};

const productFilterByBrand = async(req, res) => {
  const Brand = req.body.Brand
  try{
      const query = {Brand : {$regex: Brand, $options: "i"}}
      const search = await productSchema.find(query)
      if(search[0] === undefined){
        res.status(400).json({
          success : "failure",
          message : "No product found",
        })
  } else{
      res.status(200).json({
        success : "success",
        message : "Here are all the products related to your search",
        searchedProduct : search
    })
  }
  }catch(err){
      res.status(400).json({
          success : "failure",
          error : err.message
      })
  }
}

const productFilterByCity = async(req, res) => {
  const city = req.body.city
  try{
      const query = {city : {$regex: city, $options: "i"}}
      const search = await productSchema.find(query)
      if(search[0] === undefined){
        res.status(400).json({
          success : "failure",
          message : "No product found",
        })
  } else{
      res.status(200).json({
        success : "success",
        message : "Here are all the products related to your search",
        searchedProduct : search
    })
  }
  }catch(err){
      res.status(400).json({
          success : "failure",
          error : err.message
      })
  }
}

const productComparison = async (req, res) => {
  const { id1, id2 } = req.params;
  try {
      const compare = await productSchema.find({
          $or: [
              { _id: id1 },
              { _id: id2 }
          ]
      }
      );
      res.status(200).json({
          success: "success",
          message: "Here is the comparison of two products",
          comparison: compare,
      });
  } catch (err) {
      res.status(400).json({
          success: "failure",
          error: err.message,
      });
  }
};

const productFilter = async (req, res) => {
  const {productName, Brand, VehicleType, productPrice} = req.query
  const queryObject = {}
  const minValue = req.body.minValue;
  const maxValue = req.body.maxValue;
  try {
    if(VehicleType){
      queryObject.VehicleType = {$regex: VehicleType, $options: "i"}
    }
    if(productPrice){
      queryObject.productPrice = { $gte: minValue, $lte: maxValue }
    }
    if(Brand){
      queryObject.Brand = { $regex: Brand, $options: "i" }
    }
    if(productName){
      queryObject.productName = { $regex: productName, $options: "i" }
    }
  
    console.log(queryObject)
    const myData = await productSchema.find(queryObject)
    res.status(200).json({
      success : "success",
      message : "Here are all products related to your search",
      searchedProduct : myData
    })
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};

const productEdit = async (req, res) => {
  try {
    const edit = await productSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: "success",
      message: "Edit product successfully",
      productEdit: edit,
    });
  } catch (err) {
    res.status(400).json({
      success: " failure",
      error: err.message,
    });
  }
};

const productDelete = async (req, res) => {
  await productSchema.findByIdAndDelete(req.params.id);
  try {
    res.status(200).json({
      success: "success",
      message: "Delete product successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};



module.exports = {
  productCreate,
  productDetails,
  productList,
  productFilterByRange,
  productFilterByVehicleType,
  productFilterByName,
  productFilterByBrand,
  productFilterByCity,
  productEdit,
  productDelete,
  productComparison,
  productFilter
};
