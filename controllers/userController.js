const userSchema = require("../models/userModelSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  const { userPassword, confirmPassword, userEmail } = req.body;
  try {
    const isEmailExists = await userSchema.findOne({ userEmail: userEmail });
    if (isEmailExists) {
      res.status(409).json({
        success: "failure",
        message: "User with this email is already exists",
      });
    } else {
      if (userPassword === confirmPassword) {
        const userData = await new userSchema(req.body);
        try {
          const salt = await bcrypt.genSalt(10);
          userData.userPassword = await bcrypt.hash(
            req.body.userPassword,
            salt
          );
          const filePath = `/uploads/${req.file.filename}`;
          userData.profilePic = filePath;
          const info = userData.save();
          res.status(201).json({
            success: "success",
            message: "User register successfully",
            userdata: userData,
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

const userLogin = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    if (userEmail && userPassword) {
      const user = await userSchema.findOne({ userEmail: userEmail });
      if (user != null) {
        const isMatch = await bcrypt.compare(userPassword, user.userPassword);
        if (user.userEmail === userEmail && isMatch) {
          const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "10d" }
          );
          await userSchema.findByIdAndUpdate(user._id,{tokens :[{token,signedAt: Date.now().toString()}]})
          res.status(200).json({
            success: "success",
            message: "Successfully login",
            user_details: user,
            token : token
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

const userList = async (req, res) => {
  try {
    const list = await userSchema.find(
      {},
      { userName: 1, userEmail: 1, profilePic: 1 }
    );
    const counted = await userSchema.count();
    res.status(200).json({
      success: "success",
      message: "All user list",
      totalUsers: counted,
      userList: list,
    });
  } catch (err) {
    res.status(400).json({
      success: " failure",
      error: err.message,
    });
  }
};

const userLogout = async (req,res) => {
const authHeader = req.headers["authorization"];
jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
if (logout) {
res.send({msg : 'You have been Logged Out' });
} else {
res.send({msg:'err'});
}
});
}



module.exports = {
  userRegister,
  userLogin,
  userList,
  userLogout,
};
