const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");
const auth = require("../midlewares/auth");
const validation = require('../validation/user/user_validation')
const { upload } = require("../midlewares/imageStorage");

router.post("/register", upload.single("profilePic"),validation.userRegisterValidation, user.userRegister);
router.post("/signin", validation.userLoginValidation,user.userLogin);
router.get("/list", user.userList);
router.put('/logout',auth.checkUserAuth,user.userLogout)

module.exports = router;
