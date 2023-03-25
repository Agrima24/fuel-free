const user = require("../user/user_schema");

module.exports = {
  userRegisterValidation: async (req, res, next) => {
    const result = await user.userRegister.validate(req.body, {
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

  userLoginValidation: async (req, res, next) => {
    const result = await user.userLogin.validate(req.body, {
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