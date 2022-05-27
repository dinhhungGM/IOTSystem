const express = require("express");
const router = express.Router();
const user = require("../model/user");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const verifyToken = require("../middleware/auth");

router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne(req.userName).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/login", async function login(req, res) {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing user name or password" });
  }
  try {
    const User = await user.findOne({ userName });
    if (!User) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect user name or password" });
    }
    const passwordValid = await argon2.verify(User.password, password);
    if (!passwordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect user name or password" });
    }
    const accessToken = jwt.sign(
      { id: User._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: "User login successfully",
      accessToken,
      UserType: User.Type,
      UserName: User.Name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  const { Name, userName, password } = req.body;
  try {
    const checkUser = await user.findOne({ userName });
    if (checkUser) {
      res.json({ success: false, message: "User name is existed" });
    } else {
      const newPassword = await argon2.hash(password);
      const User = new user({ Name, userName, password: newPassword });
      await User.save();
      const accessToken = jwt.sign(
        { id: User._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({
        success: true,
        accessToken,
        message: "Create user successfully!",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ success: false, message: "Internal error!" });
  }
});

module.exports = router;
