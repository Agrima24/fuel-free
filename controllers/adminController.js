const adminSchema = require("../models/adminModelSchema");
const bcrypt = require("bcrypt");

const Admin = async (req, res) => {
  try {
    const data = new adminSchema(req.body);
    if (
      req.body.Email == process.env.Admin_Email &&
      req.body.Password == process.env.Admin_Password
    ) {
      res.status(200).json({
        success: "success",
        message: "you are super Admin",
      });
    } else {
      //   const salt = await bcrypt.genSalt(10);
      //   data.Password = await bcrypt.hash(Password, salt);
      const filePath = `/uploads/${req.file.filename}`;
      data.Pic = filePath;
      const result = await data.save();
      res.status(400).json({
        success: "failure",
        message: "you are now admin",
        data: result,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};

module.exports = {
  Admin,
};
