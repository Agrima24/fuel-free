const vendorSchema = require("../models/vendorModelSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const vendorRegister = async (req, res) => {
  const { vendorPassword, confirmPassword, vendorEmail } = req.body;
  try {
    const isEmailExists = await vendorSchema.findOne({
      vendorEmail: vendorEmail,
    });
    if (isEmailExists) {
      res.status(409).json({
        success: "failure",
        message: "vendor with this email is already exists",
      });
    } else {
      if (vendorPassword === confirmPassword) {
        const vendorData = await new vendorSchema(req.body);
        try {
          const salt = await bcrypt.genSalt(10);
          vendorData.vendorPassword = await bcrypt.hash(
            req.body.vendorPassword,
            salt
          );
          const filePath = `/uploads/${req.file.filename}`;
          vendorData.vendorPic = filePath;
          const info = vendorData.save();
          res.status(201).json({
            success: "success",
            message: "vendor register successfully",
            vendordata: vendorData,
          });
        } catch (err) {
          res.status(400).json({
            success: "failure",
            error: err.message,
          });
        }
      } else {
        res.status(401).json({
          success: "failure",
          message: "Password is not matched",
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};

const vendorLogin = async (req, res) => {
  try {
    const { vendorEmail, vendorPassword } = req.body;
    if (vendorEmail && vendorPassword) {
      const vendor = await vendorSchema.findOne({ vendorEmail: vendorEmail });
      if (vendor != null) {
        const isMatch = await bcrypt.compare(
          vendorPassword,
          vendor.vendorPassword
        );
        if (vendor.vendorEmail === vendorEmail && isMatch) {
          const token = jwt.sign(
            { vendorID: vendor._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "10d" }
          );
          res.status(200).json({
            success: "success",
            message: "Successfully login",
            vendor_details: vendor,
            token: token,
          });
        } else {
          res.status(400).json({
            success: "failure",
            message: "Email or password is not valid",
          });
        }
      } else {
        res.status(400).json({
          success: "failure",
          message: "Invalid credentials",
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};

const vendorList = async (req, res) => {
  try {
    const list = await vendorSchema.find();
    const counted = await vendorSchema.count();
    res.status(200).json({
      success: "success",
      message: "All vendor list",
      totalVendor: counted,
      List: list,
    });
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};

module.exports = {
  vendorRegister,
  vendorLogin,
  vendorList,
};
