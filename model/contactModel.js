const mongoose = require("mongoose");
const db_link = process.env.MONGO_URL;

mongoose.set("strictQuery", false);
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("Contact DB connected");
  })
  .catch(function (err) {
    console.error(err);
  });

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});

const contactModel = mongoose.model("contactModel", contactSchema);

module.exports = contactModel;
