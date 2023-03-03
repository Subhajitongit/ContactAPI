const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const JWT_KEY = "nfa543gvaf31gae3r";

module.exports.signup = async function signup(req, res) {
  try {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);

    res.json({
      message: "Succesfully Signed Up",
      data: user,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.login = async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        let uid = user._id;
        let token = jwt.sign({ payload: uid }, JWT_KEY);

        res.cookie("logIn", token, {
          httpOnly: true,
        });

        res.json({ message: "Login Success" });
      } else {
        res.json({ message: "Invalid Credentials" });
      }
    } else {
      res.json({ message: "User doesn't exist" });
    }
  } catch (err) {
    console.error(err);
    res.json({ message: email });
  }
};

module.exports.protectedRoute = async function protectedRoute(req, res, next) {
  try {
    let token = req.cookies.logIn;
    if (token) {
      let payload = jwt.verify(token, JWT_KEY);

      if (payload) {
        let user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        next();
      } else {
        return res.json({
          message: "User isn't authenticated",
        });
      }
    } else {
      res.json({
        message: "User is not logged in",
      });
    }
  } catch {
    return res.json({
      message: "Operation not allowed!",
    });
  }
};
