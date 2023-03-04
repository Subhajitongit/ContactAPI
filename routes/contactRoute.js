const express = require("express");

const {
  createContact,
  deleteContact,
  modifyContact,
  getAllContact,
} = require("../controller/contactController");

const contactRouter = express.Router();

contactRouter.route("/create").post(createContact); // create a new contact
contactRouter.route("/delete").delete(deleteContact); // delete a contact
contactRouter.route("/update").put(modifyContact); // update a contact
contactRouter.route("/get").post(getAllContact); // get all contact

module.exports = contactRouter;
