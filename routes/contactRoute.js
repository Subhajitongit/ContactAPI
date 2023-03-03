const express = require("express");

const {
  createContact,
  deleteContact,
  modifyContact,
} = require("../controller/contactController");

const contactRouter = express.Router();

contactRouter.route("/create").post(createContact); // create a new contact
contactRouter.route("/delete").delete(deleteContact); // delete a contact
contactRouter.route("/update/").put(modifyContact); // update a contact

module.exports = contactRouter;
