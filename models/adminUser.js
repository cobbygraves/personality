const mongoose = require("mongoose");

const AdminUserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: "Required",
  },
  email: {
    type: String,
    required: "Required",
  },
  password: {
    type: String,
    required: "Required",
  },
});

const AdminUserModel = mongoose.model("admin", AdminUserSchema);

module.exports = AdminUserModel;
