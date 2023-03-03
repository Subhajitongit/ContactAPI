const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");
const db_link = process.env.MONGO_URL;

mongoose.set("strictQuery", false);
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("User DB connected");
  })
  .catch(function (err) {
    console.error(err);
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
  },
  savedContacts: {
    type: [],
  },
});

userSchema.post("save", function (doc) {
  console.log("After saving in DB", doc);
});

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
