const express = require("express");
require("dotenv").config();
const userRouter = require("./routes/userRoute");
const contactRouter = require("./routes/contactRoute");
var cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get("/", function (req, res) {
  res.json({
    msg: "Hello",
  });
});

app.use("/user", userRouter);
app.use("/contact", contactRouter);

app.listen(8080, () => {
  console.log("Server is up and running");
});
