const vendor = require("../vendor/vendor_schema");

module.exports = {
  vendorRegisterValidation: async (req, res, next) => {
    const result = await vendor.vendorRegister.validate(req.body, {
      abortEarly: false,
    });
    if (result.error) {
      res.json({
        success: 0,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },

  vendorLoginValidation: async (req, res, next) => {
    const result = await vendor.vendorLogin.validate(req.body, {
      abortEarly: false,
    });
    if (result.error) {
      res.json({
        success: "failure",
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
