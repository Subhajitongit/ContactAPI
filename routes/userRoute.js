const express = require("express");

const { signup, login } = require("../controller/authController");

const userRouter = express.Router();

userRouter.route("/signup").post(signup); // signup the user
userRouter.route("/login").post(login); // login the user

module.exports = userRouter;
