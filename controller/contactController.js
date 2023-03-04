const contactModel = require("../model/contactModel");
const userModel = require("../model/userModel");

module.exports.createContact = async function createContact(req, res) {
  try {
    let { name, number, userId } = req.body;
    let contact = await contactModel.create({ name, number });
    const user = await userModel.findByIdAndUpdate(userId, {
      $push: { savedContacts: contact },
    });

    res.json({
      message: "Succesfully Created Contact",
      data: contact,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.getAllContact = async function getAllContact(req, res) {
  try {
    let { userId } = req.body;

    const user = await userModel.findById(userId);

    res.json({
      message: "Succesfully Created Contact",
      data: user.savedContacts,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.deleteContact = async function deleteContact(req, res) {
  try {
    const body = req.body;
    const contactId = body.contactId;
    const userId = body.userId;

    const contact = await contactModel.findById(contactId);

    const user = await userModel.findByIdAndUpdate(userId, {
      $pull: { savedContacts: contact },
    });

    const deleteContact = await contactModel.findByIdAndDelete(contactId);

    res.json({
      message: "Removed Successfully",
      data: user,
      contact: deleteContact,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.modifyContact = async function modifyContact(req, res) {
  try {
    const body = req.body;

    const contactId = body.contactId;
    const userId = body.userId;
    const data = body.data;

    const user = await userModel.findById(userId);
    const contact = await contactModel.findById(contactId);

    await userModel.findByIdAndUpdate(userId, {
      $pull: { savedContacts: contact },
    });

    console.log(user);
    for (let i = 0; i < user.savedContacts.length; i++) {
      if (user.savedContacts[i]._id.toHexString() === contactId) {
        let keys = [];
        for (let key in data) {
          keys.push(key);
        }
        let contact = await contactModel.findById(contactId);
        for (let i = 0; i < keys.length; i++) {
          contact[keys[i]] = data[keys[i]];
        }
        await contact.save();

        await userModel.findByIdAndUpdate(userId, {
          $push: { savedContacts: contact },
        });
        res.json({
          message: "Data updated successfully!",
        });
      } else {
        res.json({
          message: "Please save this contact to modify it!",
        });
      }
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
