const AdminModel = require("../models/adminModel");

const adminDataCheck = async (req, res) => {
  const { user, password } = req.body;

  const admin = await AdminModel.findOne({ user });

  if (!admin) {
    return res.status(404).send({ msg: "Invalid Username" });
  }

  if (admin.password !== password) {
    return res.status(401).send({ msg: "Invalid Password" });
  }

  res.status(200).send({ msg: "Login Successful" });
};

module.exports = {
  adminDataCheck
};
